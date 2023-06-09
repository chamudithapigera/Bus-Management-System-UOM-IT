package com.example.demo.repository;

import java.util.List;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String>{


   User findByEmail(String email);

   @Query("{email: ?0}")
   List<User> getUserByEmail(String email);

   // check telephone already exists
   @Query("{telephone: ?0}")
   List<User> getUserByTelephone(String telephone);

   // check for users with given email and password
   @Query("{email: ?0, password: ?1}")
   List<User> getUserByEmailPassword(String email, String password);


}