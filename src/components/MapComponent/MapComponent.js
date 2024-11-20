// components/MapComponent/MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = ({ startingPoint, destination, onMapClick }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const position = [51.505, -0.09];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
    });
  }, []);

  const MapEvents = () => {
    const map = useMapEvents({
      click: onMapClick,
    });

    useEffect(() => {
      if (currentLocation) {
        map.flyTo(currentLocation, map.getZoom());
      }
    }, [map]);

    return null;
  };

  return (
    <MapContainer style={{ height: "75vh" }} center={currentLocation || position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution={"Google Maps"}
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <MapEvents />
      {startingPoint && (
        <Marker position={[startingPoint.latitude, startingPoint.longitude]}>
          <Popup>{startingPoint.display_name}</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.latitude, destination.longitude]}>
          <Popup>{destination.display_name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;