package com.VYang.flightTrackerAPI.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.VYang.flightTrackerAPI.domain.UserData;
import com.VYang.flightTrackerAPI.dto.CreateUserDto;
import com.VYang.flightTrackerAPI.dto.LoginDto;
import com.VYang.flightTrackerAPI.dto.RouteDto;
import com.VYang.flightTrackerAPI.exception.RouteAlreadyExistsException;
import com.VYang.flightTrackerAPI.exception.UserAlreadyExistsException;
import com.VYang.flightTrackerAPI.exception.UserNotFoundException;
import com.VYang.flightTrackerAPI.exception.WrongPasswordException;
import com.VYang.flightTrackerAPI.service.FlightService;

@RestController
public class FlightController {

    FlightService flightService;

    public FlightController (FlightService flightService) {
        this.flightService = flightService;
    }

    // Retrieving flight data based on username:
    @GetMapping("/api/v1/trackedRoutes")
    @CrossOrigin(origins = "http://localhost:5173")
    public Optional<UserData> getDataOfUser(@RequestParam String username) {
        return flightService.findByUsername(username);
    }

    @PostMapping("/api/v1/trackedRoutes")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> addRoute(@RequestBody RouteDto routeDto) {
        
        try {
            flightService.addRoute(routeDto.getUsername(), routeDto.getDeparture(), routeDto.getArrival(), routeDto.getDepartureDate());
            return ResponseEntity.ok("Route added successfully");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (RouteAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/api/v1/trackedRoutes/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> removeRoute(@RequestBody RouteDto routeDto) {
        //TODO
        return null;
    }

    @PostMapping("/api/v1/auth/signup")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> createUser(@RequestBody CreateUserDto createUserDto) {
        try {
            flightService.createUser(createUserDto);
            return ResponseEntity.ok("User added successfully");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/api/v1/auth/login")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            flightService.login(loginDto);
            return ResponseEntity.ok("User logged in successfully");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (WrongPasswordException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}
