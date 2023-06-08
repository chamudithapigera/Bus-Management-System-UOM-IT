package com.example.demo.service;

import com.example.demo.model.Report;
import com.example.demo.repository.DriverAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

   /* @Autowired
    private MongoTemplate mongoTemplate;
    private final DriverAttendanceRepository driverAttendanceRepository;

    public ReportService(DriverAttendanceRepository driverAttendanceRepository) {
        this.driverAttendanceRepository = driverAttendanceRepository;
    }

    public Map<String, Long> generateMonthlyReport(int month, int year) {
        // Calculate the start and end dates of the month
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month - 1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        Date startDate = calendar.getTime();
        calendar.add(Calendar.MONTH, 1);
        calendar.add(Calendar.DATE, -1);
        Date endDate = calendar.getTime();

        // Query for documents within the specified month and with "status" as "present"
        Criteria criteria = new Criteria().andOperator(
                Criteria.where("date").gte(startDate).lte(endDate),
                Criteria.where("status").is("present")
        );
        Query query = new Query(criteria);

        // Group the documents by "driverID" and count the occurrences of "status" as "present"
        GroupOperation group = Aggregation.group("driverID").count().as("count");

        // Perform the aggregation
        Aggregation aggregation = Aggregation.newAggregation((AggregationOperation) query, group);
        AggregationResults<Report> result = mongoTemplate.aggregate(
                aggregation, "driverAttendance", Report.class
        );

        Get the monthly report as a map of driverID to the count of "status" as "present"
        Map<String, Long> report = new HashMap<>();
        result.getMappedResults().forEach(r -> report.put(r.getDriverID(), r.getCount()));
        return report;
    }*/
}
