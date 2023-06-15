package com.travo.travo.controller;

import com.travo.travo.model.BusBreakdown;
import com.travo.travo.service.BusBreakdownService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/breakdown")
public class BusBreakdownController {

    @Autowired
    private BusBreakdownService busBreakdownService;
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/notify")
    public ResponseEntity<String> notifyBreakdown(@RequestBody BusBreakdown breakdown) {
        busBreakdownService.handleBreakdown(breakdown.getDriverID(), breakdown.getBreakdownType());
        return new ResponseEntity<>("Breakdown reported successfully.", HttpStatus.CREATED);
    }
}
