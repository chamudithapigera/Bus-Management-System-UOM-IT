package com.travo.travo.repository;

import com.travo.travo.model.BusBreakdown;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusBreakdownRepository extends CrudRepository<BusBreakdown, Long> {
    
}
