package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Bus;
import com.example.demo.model.BusRoute;
import com.example.demo.model.Driver;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/drivers")
public class UserController {

    @Autowired
    UserService service;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user){

        int emailExist = checkEmailExists(user.getEmail());
        if(emailExist > 0){
            return "Email already exists.";
        } else {
            user.setUserRole("driver");

            String hashPassword = doHashing(user.getPassword());
            user.setPassword(hashPassword);

            user = service.createNewUser(user);
            return user.toString();
        }
    }

    //get all documents in collection
    @GetMapping("/viewDrivers")
    public List<User> findAllBusRoutesWithDetails() {
        return service.findAll();
    }


    @GetMapping("viewone/{id}")
    User getDriverById(@PathVariable String id){
        return userRepository.findById(id)
                .orElseThrow(()->new NotFoundException(("Driver not found with id: " + id)));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<User> updateDriver(@PathVariable("id") String id, @RequestBody User user) {
        User updatedDriver = service.updateDriver(id, user);
        return ResponseEntity.ok(updatedDriver);
    }

    @DeleteMapping("/deleteDriver/{id}")
    String deleteDriver(@PathVariable String id){
        if (!userRepository.existsById(id)){
            throw new NotFoundException(("Driver not found with id: " + id));
        }
        userRepository.deleteById(id);
        return "Driver with id " +id+ "has been deleted";

    }

    //get count of drivers
    @GetMapping("/count")
    public long getDriverCount() {
        return service.getDriverCount();
    }

    ///////


    @GetMapping("/users/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return service.getUserByEmailTest(email);
    }


    @PatchMapping("/update/{id}")
    public String updateUser(@PathVariable ObjectId id, @RequestBody User user){
        user = service.updateUser(user);
        return user.toString();
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