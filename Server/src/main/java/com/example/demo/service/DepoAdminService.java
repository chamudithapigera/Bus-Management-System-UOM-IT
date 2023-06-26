package com.example.demo.service;

import com.example.demo.model.DepoAdmin;
import com.example.demo.model.User;
import com.example.demo.repository.DepoAdminRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepoAdminService {
    @Autowired
    DepoAdminRepository depoAdminRepository;

    public List<DepoAdmin> getAllUsers(){
        return depoAdminRepository.findAll();
    }

    public DepoAdmin getUserByEmailTest(String email) {
        return depoAdminRepository.findByEmail(email);
    }

    public List<DepoAdmin> getUserByEmail(String email){
        return depoAdminRepository.getUserByEmail(email);
    }

    public List<DepoAdmin> getUserByTelephone(String telephone){
        return depoAdminRepository.getUserByEmail(telephone);
    }

    public List<DepoAdmin> getUserByEmailPassword(String email, String password){
        return depoAdminRepository.getUserByEmailPassword(email, password);
    }

    public DepoAdmin createNewUser(DepoAdmin depoAdmin){
        return depoAdminRepository.save(depoAdmin);
    }

    public DepoAdmin updateUserDetailsByEmail(String email, DepoAdmin updatedUser) {
        DepoAdmin depoAdmin = depoAdminRepository.findByEmail(email);

        if (updatedUser.getFirstName() != null) {
            depoAdmin.setFirstName(updatedUser.getFirstName());
        }
        if (updatedUser.getLastName() != null) {
            depoAdmin.setLastName(updatedUser.getLastName());
        }
        if (updatedUser.getEmail() != null) {
            depoAdmin.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getTelephone() != null) {
            depoAdmin.setTelephone(updatedUser.getTelephone());
        }
        return depoAdminRepository.save(depoAdmin);

    }

}
