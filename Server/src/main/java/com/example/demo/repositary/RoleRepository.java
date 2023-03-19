package com.example.demo.repositary;

import java.util.Optional;

import com.example.demo.model.ERole;
import com.example.demo.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}