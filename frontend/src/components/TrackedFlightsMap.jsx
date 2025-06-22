import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";
import { useEffect, useState } from "react";
import { feature } from "topojson-client";

// TopoJSON world map (served from public/maps/)
const geoUrl = "/maps/world-topo.json";

// Neon color palette
const colors = ["#00f0ff", "#ff2bd7"];

// Tracked routes
const rawRoutes = [
  { from: [-74.006, 40.7128], to: [2.3522, 48.8566] }, // NYC → Paris
  { from: [-0.1278, 51.5074], to: [139.6503, 35.6762] }, // London → Tokyo
  { from: [-122.4194, 37.7749], to: [77.209, 28.6139] }, // SF → New Delhi
  { from: [13.405, 52.52], to: [-118.2437, 34.0522] }, // Berlin → LA
];

export default function TrackedFlightsMap() {
  const [geographies, setGeographies] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((topo) => {
        const world = feature(topo, topo.objects.countries);
        setGeographies(world.features);
      });

    setRoutes(rawRoutes);
  }, []);

  return (
    <div className="hidden lg:block w-full h-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 250,
          center: [0, 10],
        }}
        style={{ width: "100%", height: "600px" }}
      >
        {geographies.length > 0 && (
          <Geographies geography={{ features: geographies }}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  pointerEvents={"none"}
                  style={{
                    default: {
                      fill: "#111827",
                      stroke: "#1f2937",
                      strokeWidth: 0.4,
                    },
                  }}
                />
              ))
            }
          </Geographies>
        )}

        {/* Arcs and markers */}
        {routes.map((route, i) => {
          const color = colors[i % colors.length];
          return (
            <g key={i}>
              <Line
                from={route.from}
                to={route.to}
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeOpacity={0.8}
                style={{
                  filter: `drop-shadow(0px 0px 3px ${color})`,
                }}
              />
              {/* Endpoint circles */}
              <Marker coordinates={route.from}>
                <circle
                  r={3.5}
                  fill={color}
                  style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                />
              </Marker>
              <Marker coordinates={route.to}>
                <circle
                  r={3.5}
                  fill={color}
                  style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                />
              </Marker>
            </g>
          );
        })}
      </ComposableMap>
    </div>
  );
}
