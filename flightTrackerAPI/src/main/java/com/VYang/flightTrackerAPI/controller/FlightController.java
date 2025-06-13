package com.VYang.flightTrackerAPI.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.VYang.flightTrackerAPI.domain.Flight;
import com.VYang.flightTrackerAPI.service.FlightService;

@RestController
public class FlightController {

    FlightService flightService;

    public FlightController (FlightService flightService) {
        this.flightService = flightService;
    }

    @PostMapping("/flights")
    public Flight postFlights(@RequestBody Flight flight) {
        return flight;
    }

    @GetMapping("/flights")
    public Optional<Flight> getFlight() {
        return flightService.findFlight("684c300745543f7cf10461e8");
    }

}
