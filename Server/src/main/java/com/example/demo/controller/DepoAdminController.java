package com.example.demo.controller;

import com.example.demo.model.DepoAdmin;
import com.example.demo.service.DepoAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/depoadmin")
@CrossOrigin(origins = "http://localhost:3000") // replace with your frontend URL
public class DepoAdminController {

    @Autowired
    DepoAdminService depoAdminService;

    @GetMapping("/admins")
    public List<DepoAdmin> getAllUsers(){
        return depoAdminService.getAllUsers();
    }

    @GetMapping("/admins/{email}")
    public DepoAdmin getUserByEmail(@PathVariable String email) {
        return depoAdminService.getUserByEmailTest(email);
    }

    @PostMapping("/admin")
    public String creatNewUser(@RequestBody DepoAdmin depoAdmin){
        int emailExist = checkEmailExists(depoAdmin.getEmail());
        if(emailExist > 0){
            return "Email already exists.";
        } else {
            String hashPassword = doHashing(depoAdmin.getPassword());
            depoAdmin.setPassword(hashPassword);

            depoAdmin = depoAdminService.createNewUser(depoAdmin);
            return depoAdmin.toString();


        }
    }

    @PutMapping("/{email}")
    public ResponseEntity<DepoAdmin> updateUserDetails(@PathVariable("email") String email, @RequestBody DepoAdmin updatedUser) {
        DepoAdmin depoAdmin = depoAdminService.updateUserDetailsByEmail(email, updatedUser);
        if (depoAdmin != null) {
            return new ResponseEntity<>(depoAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/register")
    public String registerUser(@RequestBody DepoAdmin depoAdmin){
        int emailExist = checkEmailExists(depoAdmin.getEmail());
        if(emailExist > 0){
            return "Email already exists.";
        } else {
            depoAdmin.setUserRole("depo admin");

            String hashPassword = doHashing(depoAdmin.getPassword());
            depoAdmin.setPassword(hashPassword);

            depoAdmin = depoAdminService.createNewUser(depoAdmin);
            return depoAdmin.toString();
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody DepoAdmin depoAdmin){
        String hashPassword = doHashing(depoAdmin.getPassword());    // to get hashed password
        List<DepoAdmin> userList =  depoAdminService.getUserByEmailPassword(depoAdmin.getEmail(), hashPassword);
        if(userList.size() != 0){
            return userList.get(0).getUserRole();
        } else {
            return "Invalid email and password";
        }
    }

    public int checkEmailExists(String email){
        List<DepoAdmin> userList = depoAdminService.getUserByEmail(email);
        return userList.size();
    }

    public int checkTelephoneExists(String telephone){
        List<DepoAdmin> userList = depoAdminService.getUserByTelephone(telephone);
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