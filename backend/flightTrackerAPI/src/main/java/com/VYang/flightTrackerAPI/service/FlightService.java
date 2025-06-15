package com.VYang.flightTrackerAPI.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.VYang.flightTrackerAPI.domain.UserData;
import com.VYang.flightTrackerAPI.repository.UserRepository;

@Service
public class FlightService {

    private final UserRepository userRepository;

    @Autowired
    public FlightService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<UserData> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void addRoute(String username, String departure, String arrival, LocalDate departureDate) {
        Optional<UserData> optionalUserData = userRepository.findByUsername(username);
        
        if (optionalUserData.isPresent()) {
            UserData userData = optionalUserData.get();

            // Create new Route object
            UserData.Route newRoute = UserData.Route.builder()
                .departure(departure)
                .arrival(arrival)
                .departureDate(departureDate) 
                .trackedFlights(new ArrayList<>())  
                .build();

            // Add new route to user's routes list
            List<UserData.Route> routes = userData.getRoutes();
            if (routes == null) {
                routes = new ArrayList<>();
                userData.setRoutes(routes);
            }
            
            // Optional: check if route already exists to avoid duplicates
            boolean routeExists = routes.stream().anyMatch(r ->
                r.getDeparture().equals(departure) &&
                r.getArrival().equals(arrival) &&
                r.getDepartureDate().equals(departureDate)
            );

            if (!routeExists) {
                routes.add(newRoute);
                userRepository.save(userData);
            } else {
                // maybe throw an exception or ignore
            }
        } else {
            // Handle case user not found (throw exception or return error)
        }
    }

}
