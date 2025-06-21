package com.VYang.flightTrackerAPI.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteDto {
    private String username;
    private String departure;
    private String arrival;
    private @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate;
}
