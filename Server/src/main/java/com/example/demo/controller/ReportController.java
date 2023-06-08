package com.example.demo.controller;

import com.example.demo.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

 /*   @Autowired
    private ReportService reportService;

    @GetMapping
    public ResponseEntity<Map<String, Long>> generateMonthlyReport(
            @RequestParam("month") int month,
            @RequestParam("year") int year
    ) {
        // Call the reportService to generate the monthly report based on the provided month and year
        Map<String, Long> report = reportService.generateMonthlyReport(month, year);

        return ResponseEntity.ok(report);
    }*/
}
