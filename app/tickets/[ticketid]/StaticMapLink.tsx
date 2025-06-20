import React, { useEffect, useState } from "react";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZGhhcmFuZXNoIiwiYSI6ImNtYnU1ejlhOTA1MXUyanF3dHk1cXhzcm8ifQ.Z2Y5hm3HXRpC5aRsX5yaGQ";

const StaticMapLink = ({ location }) => {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (!location) return;

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            location
          )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lon, lat] = data.features[0].center;
          const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lon},${lat},14,0,0/700x400?access_token=${MAPBOX_ACCESS_TOKEN}`;
          setMapUrl(staticMapUrl);
        } else {
          console.error("No coordinates found for location:", location);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
    console.log("map url :",mapUrl);
  }, [location]);

  return mapUrl ? (
    <>
    <img src={mapUrl} alt="map" />
    </>
  ) : (
    <p>Loading map link...</p>
  );
};

export default StaticMapLink;
