import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import '../Css/login.scss'
import image from '../Css/img_avatar2.png'
import { UserContext } from '../Components/UserContext';



function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  async function login(event) {
    event.preventDefault();

    // Check if any field is empty
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/v1/passenger/login", {
        email: email,
        password: password,
      });

      if (res.data == "passenger") {
        alert("Login Successfully !");

        // Fetch the user's name after login
        const userRes = await axios.get(`http://localhost:8080/api/v1/passenger/users/${email}`);
console.log(userRes.data);
        const userName1 = userRes.data.firstName;
        const userName2 = userRes.data.lastName;
        const phone = userRes.data.telephone;

        setUserData({
          userName1,
          userName2,
          email,
          phone,
        
        });

        navigate('/searchbus', { state: { userName1, userName2} });
      }
      else if(res.data == "driver"){
        alert("Login Successfully !");
        navigate('/driver');
      }
      else if(res.data == "depo admin"){
        alert("Login Successfully !");
        navigate('/depoadmin');
      }
      else {
        alert("Incorrect Email and Password not match");
      }


    }

    catch (err) {
      alert(err);
    }

  }


  return (
    <div className="logincontainer">
      <div className="form">
        <form>
          <div className="imgcontainer">

            <img src={image} alt="Avatar" class="avatar" />
          </div>

          <div className="container">

            <label for="uname"><b className="h">Username</b>Need an account?
              <Link to="/register" style={{ textDecoration: "none" }}>
                <b className="y">Sign Up</b>
              </Link>
            </label>
            <input type="text" placeholder="Enter Username" id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }} required />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" id="psw" value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required />

            <button type="submit" onClick={login}>LOGIN</button>


            <label>
              <input type="checkbox" checked="checked" name="remember" /> Remember me
            </label>

          </div>
          <div className="container" >
            <Link to="/" style={{ textDecoration: "none" }}>
              <button type="button" class="cancelbtn">Cancel</button>
            </Link>
            <span class="psw"><a href="#"><u>Forgot password?</u></a></span>
          </div>

        </form>

      </div>
    </div>

  )
}

export default Login