package com.example.demo.controller;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Driver;
import com.example.demo.repository.DriverRepository;
import com.example.demo.service.DriverService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @Autowired
    private DriverRepository driverRepository;

   /* @PostMapping("/addDriver")
    public ResponseEntity<Driver> createDriver(@RequestBody Map<String, String> payload){


        return new ResponseEntity<Driver>(driverService.createDriverBy(payload.get("driverID"),payload.get("driverName"),payload.get("licenseNo"),payload.get("busID")), HttpStatus.CREATED);
    }*/

    /*@PostMapping("/addDriver")
    public ResponseEntity<Driver> createDriver(@RequestBody Map<String, String> payload, Driver driver) throws Exception{
        int emailExist = checkEmailExists(driver.getEmail());
        if(emailExist > 0){
            throw new Exception("email does not valid");
        } else {
            driver.setUserRole("driver");

            String hashPassword = doHashing(driver.getPassword());
            driver.setPassword(hashPassword);


        }

        return new ResponseEntity<Driver>(driverService.createDriverBy(payload.get("driverId"), payload.get("firstName"), payload.get("lastName"), payload.get("email"), payload.get("password"), payload.get("telephone"), payload.get("userRole"), payload.get("busID")), HttpStatus.CREATED);
    }*/

    @PostMapping("/addDriver")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> payload) throws Exception{
        String userType = (String) payload.get("driver");

        if (userType.equalsIgnoreCase("driver")) {
            String email = (String) payload.get("email");
            int emailExist = checkEmailExists(email);
            if (emailExist > 0) {
                throw new Exception("email does not valid");
            }

            Driver driver = new Driver();
            driver.setEmail(email);
            driver.setUserRole("driver");
            String hashPassword = doHashing((String) payload.get("password"));
            driver.setPassword(hashPassword);

            // Additional driver-specific fields
            String driverId = (String) payload.get("driverId");
            String  firstName= (String) payload.get("firstName");
            String lastName = (String) payload.get("lastName");

            String password = (String) payload.get("password");
            String telephone = (String) payload.get("telephone");
            String userRole = (String) payload.get("userRole");
            String busID = (String) payload.get("busID");

            // Call service method to create a new driver user
            Driver driverUser = driverService.createDriverBy(driverId,  firstName,  lastName,  email,  password,  telephone,  userRole,  busID);

            return ResponseEntity.ok(driverUser.toString());
        }

        // Handle other user types if needed

        return ResponseEntity.badRequest().body("Invalid user type.");
    }



    @GetMapping("/viewDriver")
    public List<Driver> findAllDriversWithDetails() {
        return driverService.findAll();
    }

    @GetMapping("/{id}")
    Driver getDriverById(@PathVariable ObjectId id){
        return driverRepository.findById(id)
                .orElseThrow(()->new NotFoundException(("Driver not found with id: " + id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable("id") ObjectId id, @RequestBody Driver driver) {
        Driver updatedDriver = driverService.updateDriver(id, driver);
        return ResponseEntity.ok(updatedDriver);
    }

    @DeleteMapping("/deleteDriver/{id}")
    String deleteDriver(@PathVariable ObjectId id){
        if (!driverRepository.existsById(id)){
            throw new NotFoundException(("Driver not found with id: " + id));
        }
        driverRepository.deleteById(id);
        return "Driver with id " +id+ "has been deleted";

    }

    public int checkEmailExists(String email){
        List<Driver> driverList = driverService.getDriverByEmail(email);
        return driverList.size();
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