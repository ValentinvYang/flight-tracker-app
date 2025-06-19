package com.VYang.flightTrackerAPI.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.VYang.flightTrackerAPI.domain.UserData;
import com.VYang.flightTrackerAPI.exception.RouteAlreadyExistsException;
import com.VYang.flightTrackerAPI.exception.UserAlreadyExistsException;
import com.VYang.flightTrackerAPI.exception.UserNotFoundException;
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
            
            boolean routeExists = false;
            for (UserData.Route r : routes) {
                if (
                    r.getDeparture().equals(departure) &&
                    r.getArrival().equals(arrival) &&
                    r.getDepartureDate().equals(departureDate)
                ) {
                    routeExists = true;
                    break;
                }
            }

            if (!routeExists) {
                routes.add(newRoute);
                userRepository.save(userData);
            } else {
                throw new RouteAlreadyExistsException(departure, arrival);
            }
        } else {
            throw new UserNotFoundException();
        }
    }

    public void createUser(String username) {        
        // Check if user already exists
        if (findByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException();
        }

        // Create new user
        UserData newUser = UserData.builder()
                            .username(username)
                            .routes(new ArrayList<>())
                            .build();

        // Save user to MongoDB
        userRepository.save(newUser);
    }

}
