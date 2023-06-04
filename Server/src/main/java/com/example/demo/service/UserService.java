package com.example.demo.service;

import java.util.List;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public List<User> getAllUsers(){
        return repository.findAll();
    }

    public User getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

}
