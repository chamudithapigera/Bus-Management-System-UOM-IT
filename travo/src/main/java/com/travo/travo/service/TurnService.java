package com.travo.travo.service;

import com.travo.travo.model.Turn;
import com.travo.travo.repository.TurnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurnService {

    private final TurnRepository turnRepository;

    @Autowired
    public TurnService(TurnRepository turnRepository) {
        this.turnRepository = turnRepository;
    }

    public List<Turn> getTurnsByDriverId(String driverId) {
        return turnRepository.findByDriverId(driverId);
    }

    public Optional<Turn> getTurnById(String id) {
        return turnRepository.findById(id);
    }

    public Turn startTurn(String id) {
        Turn turn = turnRepository.findById(id).orElseGet(() -> new Turn(id));
        turn.setStarted(true);
        turnRepository.save(turn);
        return turn;
    }

    public Turn endTurn(String id) {
        Turn turn = turnRepository.findById(id).orElseGet(() -> new Turn(id));
        turn.setEnded(true);
        turnRepository.save(turn);
        return turn;
    }

    public Turn setStartPoint(String id, String startPoint) {
        Turn turn = turnRepository.findById(id).orElseGet(() -> new Turn(id));
        turn.setStartPoint(startPoint);
        turnRepository.save(turn);
        return turn;
    }
    
    public Turn setEndPoint(String id, String endPoint) {
        Turn turn = turnRepository.findById(id).orElseGet(() -> new Turn(id));
        turn.setEndPoint(endPoint);
        turnRepository.save(turn);
        return turn;
    }
    
    public String getStartPoint(String id) {
        Turn turn = turnRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid turn ID: " + id));
        return turn.getStartPoint();
    }
    
    public String getEndPoint(String id) {
        Turn turn = turnRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid turn ID: " + id));
        return turn.getEndPoint();
    }
}
