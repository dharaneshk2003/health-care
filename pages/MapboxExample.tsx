"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const MapboxExample = ({location,height,width}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [city, setCity] = useState(location);

  // 🧠 Function to get coordinates from city name
  const getCoordinates = async (cityName: string) => {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        cityName
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await res.json();
    const coordinates = data.features?.[0]?.center;
    return coordinates; // [lng, lat]
  };

  // 📍 Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.1025, 28.7041], // default to Delhi
      zoom: 9,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // 🔁 Update Map Center on City Change
  useEffect(() => {
    const updateMap = async () => {
      const coords = await getCoordinates(city);
      if (coords && mapRef.current) {
        mapRef.current.flyTo({
          center: coords,
          zoom: 10,
        });
      }
    };
    updateMap();
  }, [city]);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={mapContainerRef}
        style={{ height: height, width: width }}
        className="rounded shadow"
      />
    </div>
  );
};

export default MapboxExample;
