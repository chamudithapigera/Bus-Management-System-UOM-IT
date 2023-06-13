package com.example.demo.controller;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return service.getAllUsers();
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

    @PatchMapping("/update/{id}")
    public String updateUser(@PathVariable ObjectId id, @RequestBody User user){
        user = service.updateUser(user);
        return user.toString();
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

