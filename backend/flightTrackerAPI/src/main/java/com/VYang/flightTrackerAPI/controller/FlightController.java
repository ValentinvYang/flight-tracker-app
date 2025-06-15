package com.VYang.flightTrackerAPI.controller;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.VYang.flightTrackerAPI.domain.UserData;
import com.VYang.flightTrackerAPI.service.FlightService;

@RestController
public class FlightController {

    FlightService flightService;

    public FlightController (FlightService flightService) {
        this.flightService = flightService;
    }

    // Retrieving flight data based on username:
    @GetMapping("/flights")
    @CrossOrigin(origins = "http://localhost:5173")
    public Optional<UserData> getDataOfUser(@RequestParam String username) {
        return flightService.findByUsername(username);
    }

    @PostMapping("/routes")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> addRoute(
        @RequestParam String username,
        @RequestParam String departure,
        @RequestParam String arrival,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate) {
        
        // TODO: add correct exceptions, maybe testcases?
        try {
            flightService.addRoute(username, departure, arrival, departureDate);
            return ResponseEntity.ok("Route added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } 
    }

}
