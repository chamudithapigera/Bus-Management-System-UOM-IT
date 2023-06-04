package com.example.demo.controller;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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
        return service.getUserByEmail(email);
    }




}