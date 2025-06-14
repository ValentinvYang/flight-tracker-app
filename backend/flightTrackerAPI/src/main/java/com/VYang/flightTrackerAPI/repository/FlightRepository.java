package com.VYang.flightTrackerAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.VYang.flightTrackerAPI.domain.Flight;

public interface FlightRepository extends MongoRepository<Flight, String> {
    
}
