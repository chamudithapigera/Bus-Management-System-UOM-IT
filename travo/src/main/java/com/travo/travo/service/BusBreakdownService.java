package com.travo.travo.service;

import com.travo.travo.model.BusBreakdown;
import com.travo.travo.repository.BusBreakdownRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusBreakdownService {

    @Autowired
    private BusBreakdownRepository busBreakdownRepository;

    public void handleBreakdown(String driverID, String breakdownType) {
        if(breakdownType.equals("big")) {
            // Handle big damage breakdown -- TO BE IMPLEMENTED
        } else if(breakdownType.equals("small")) {
            // Handle small delay breakdown -- TO BE IMPLEMENTED AT THE END OF MERGE
        }

        // Store in the database
        BusBreakdown breakdown = new BusBreakdown(driverID, breakdownType);
        busBreakdownRepository.save(breakdown);
    }
}
