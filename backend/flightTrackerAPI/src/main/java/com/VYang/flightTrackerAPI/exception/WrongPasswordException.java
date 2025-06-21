package com.VYang.flightTrackerAPI.exception;

public class WrongPasswordException extends RuntimeException {
    public WrongPasswordException() {
        super("Wrong password!");
    }
}
