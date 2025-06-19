package com.VYang.flightTrackerAPI.exception;

public class RouteAlreadyExistsException extends RuntimeException{
    public RouteAlreadyExistsException(String departure, String arrival) {
        super("Route from " + departure + " to " + arrival + " is already being tracked!");
    }
}
