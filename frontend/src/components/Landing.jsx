import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function landing({ setView }) {
  const [flightData, setFlightData] = useState(null);

  const fetchFlightData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/flights");
      setFlightData(response);
    } catch (err) {
      console.error("Failed to fetch flight: ", err);
    }
  };

  return (
    <div className="p-4">
      <button onClick={fetchFlightData}>Load Flight</button>

      {flightData && (
        <div className="mt-4">
          <p>
            <strong>ID:</strong> {flightData.data.id}
          </p>
          <p>
            <strong>Departure:</strong>{" "}
            {flightData.data.itineraries[0].segments[0].departure.iataCode}
          </p>
          <p>
            <strong>Arrival:</strong>{" "}
            {flightData.data.itineraries[0].segments[0].arrival.iataCode}
          </p>
          <p>
            <strong>price.</strong> {flightData.data.price.grandTotal}
          </p>
        </div>
      )}
    </div>
  );
}
