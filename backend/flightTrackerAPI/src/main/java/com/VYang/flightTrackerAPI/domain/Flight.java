package com.VYang.flightTrackerAPI.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flight {

    private String type;
    private String source;
    private boolean instantTicketingRequired;
    private boolean nonHomogeneous;
    private boolean oneWay;
    private boolean isUpsellOffer;
    private String lastTicketingDate;
    private String lastTicketingDateTime;
    private int numberOfBookableSeats;
    private List<Itinerary> itineraries;
    private Price price;
    private PricingOptions pricingOptions;
    private List<String> validatingAirlineCodes;
    private List<TravelerPricing> travelerPricings;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Itinerary {
        private String duration;
        private List<Segment> segments;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Segment {
        private Departure departure;
        private Arrival arrival;
        private String carrierCode;
        private String number;
        private Aircraft aircraft;
        private Operating operating;
        private String duration;
        private String id;
        private int numberOfStops;
        private boolean blacklistedInEU;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Departure {
        private String iataCode;
        private String at;  // ISO date-time string
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Arrival {
        private String iataCode;
        private String at;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Aircraft {
        private String code;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Operating {
        private String carrierCode;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Price {
        private String currency;
        private String total;
        private String base;
        private List<Fee> fees;
        private String grandTotal;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Fee {
        private String amount;
        private String type;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PricingOptions {
        private List<String> fareType;
        private boolean includedCheckedBagsOnly;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TravelerPricing {
        private String travelerId;
        private String fareOption;
        private String travelerType;
        private Price price;
        private List<FareDetailsBySegment> fareDetailsBySegment;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FareDetailsBySegment {
        private String segmentId;
        private String cabin;
        private String fareBasis;
        private String clazz;  // renamed from 'class' since it's a reserved word
        private IncludedCheckedBags includedCheckedBags;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class IncludedCheckedBags {
        private int quantity;
    }
    
}

