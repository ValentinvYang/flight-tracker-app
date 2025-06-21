package com.VYang.flightTrackerAPI.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.VYang.flightTrackerAPI.domain.UserData;
import com.VYang.flightTrackerAPI.dto.CreateUserDto;
import com.VYang.flightTrackerAPI.dto.LoginDto;
import com.VYang.flightTrackerAPI.exception.RouteAlreadyExistsException;
import com.VYang.flightTrackerAPI.exception.UserAlreadyExistsException;
import com.VYang.flightTrackerAPI.exception.UserNotFoundException;
import com.VYang.flightTrackerAPI.exception.WrongPasswordException;
import com.VYang.flightTrackerAPI.repository.UserRepository;

@Service
public class FlightService {

    // TODO: Security implementation
    private final UserRepository userRepository;
    // private final PasswordEncoder passwordEncoder;

    @Autowired
    public FlightService(UserRepository userRepository) {
        this.userRepository = userRepository;
        // this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserData> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<UserData> findByEmail(String email) {
        return userRepository.findByEmail(email);
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

    public void createUser(CreateUserDto createUserDto) {        
        // Check if user already exists
        String username = createUserDto.getUsername();
        // String hashed = passwordEncoder.encode(createUserDto.getPassword());

        if (findByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException();
        }

        // Create new user
        UserData newUser = UserData.builder()
                            .username(username)
                            .email(createUserDto.getEmail())
                            .password(createUserDto.getPassword())
                            .routes(new ArrayList<>())
                            .build();

        // Save user to MongoDB
        userRepository.save(newUser);
    }

    public void login(LoginDto loginDto) {
        String username = loginDto.getUsername();
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();

        Optional<UserData> userDataOptional;

        if (username != null && !username.isEmpty()) {
            userDataOptional = findByUsername(username);
        } else if (email != null && !email.isEmpty()) {
            userDataOptional = findByEmail(email);
        } else {
            throw new IllegalArgumentException("Username or email must be provided.");
        }

        if (!userDataOptional.isPresent()) throw new UserNotFoundException();

        UserData userData = userDataOptional.get();
        if (userData.getPassword().equals(password)) {
            return;
        } else {
            throw new WrongPasswordException();
        }
    }

}
