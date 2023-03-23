package com.example.demo.DemoApplication.repositary;

import java.util.List;

import com.example.demo.DemoApplication.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String>{
    // check email already exists
    @Query("{email: ?0}")
    List<User> getUserByEmail(String email);

    // check telephone already exists
    @Query("{telephone: ?0}")
    List<User> getUserByTelephone(String telephone);

    // check for users with given email and password
    @Query("{email: ?0, password: ?1}")
    List<User> getUserByEmailPassword(String email, String password);
}

