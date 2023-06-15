package com.example.demo.controller;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/passenger")
@CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }

    @GetMapping("/users/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return service.getUserByEmailTest(email);
    }

    @PostMapping("/users")
    public String creatNewUser(@RequestBody User user){
        int emailExist = checkEmailExists(user.getEmail());
        if(emailExist > 0){
            return "Email already exists.";
        } else {
            String hashPassword = doHashing(user.getPassword());
            user.setPassword(hashPassword);

            user = service.createNewUser(user);
            return user.toString();


        }
    }

    @PutMapping("/{email}")
    public ResponseEntity<User> updateUserDetails(@PathVariable("email") String email, @RequestBody User updatedUser) {
        User user = service.updateUserDetailsByEmail(email, updatedUser);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/register")
    public String registerUser(@RequestBody User user){
        int emailExist = checkEmailExists(user.getEmail());
        if(emailExist > 0){
            return "Email already exists.";
        } else {
            user.setUserRole("passenger");

            String hashPassword = doHashing(user.getPassword());
            user.setPassword(hashPassword);

            user = service.createNewUser(user);
            return user.toString();
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){
        String hashPassword = doHashing(user.getPassword());    // to get hashed password
        List<User> userList =  service.getUserByEmailPassword(user.getEmail(), hashPassword);
        if(userList.size() != 0){
            return userList.get(0).getUserRole();
        } else {
            return "Invalid email and password";
        }
    }

    public int checkEmailExists(String email){
        List<User> userList = service.getUserByEmail(email);
        return userList.size();
    }

    public int checkTelephoneExists(String telephone){
        List<User> userList = service.getUserByTelephone(telephone);
        return userList.size();
    }

    public static String doHashing (String password) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");

            messageDigest.update(password.getBytes());

            byte[] resultByteArray = messageDigest.digest();

            StringBuilder sb = new StringBuilder();

            for (byte b : resultByteArray) {
                sb.append(String.format("%02x", b));
            }

            return sb.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return null;
    }




}