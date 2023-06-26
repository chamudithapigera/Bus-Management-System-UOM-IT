package com.example.demo.repository;

import com.example.demo.model.DepoAdmin;
import com.example.demo.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepoAdminRepository extends MongoRepository<DepoAdmin, ObjectId> {


    DepoAdmin findByEmail(String email);

    @Query("{email: ?0}")
    List<DepoAdmin> getUserByEmail(String email);

    // check telephone already exists
    @Query("{telephone: ?0}")
    List<DepoAdmin> getUserByTelephone(String telephone);

    // check for users with given email and password
    @Query("{email: ?0, password: ?1}")
    List<DepoAdmin> getUserByEmailPassword(String email, String password);


}