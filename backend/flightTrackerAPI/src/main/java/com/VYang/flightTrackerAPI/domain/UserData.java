package com.VYang.flightTrackerAPI.domain;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "flight-data")
public class UserData {
    
    @Id
    private String id;

    private String username;
    private String email;
    private String password;
    private List<Route> routes;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Route {
        private String departure; 
        private String arrival;
        private LocalDate departureDate;
        private List<TrackedFlight> trackedFlights;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TrackedFlight {

        private LocalDate departureDate;
        private List<Flight> offers;
        private Instant trackedAt; 

    }

}
