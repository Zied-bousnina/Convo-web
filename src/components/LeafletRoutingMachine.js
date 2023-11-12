import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ( startingPoint,destination) => {
  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });
 useEffect(() => {
   L.Routing.control({
        waypoints: [
        L.latLng(startingPoint?.latitude, startingPoint?.longitude),
        L.latLng(destination?.latitude, destination?.longitude),
        ],
        routeWhileDragging: true,
        autoRoute: true,
        // show: false,
        createMarker: function () {
          return null;
        },
        lineOptions: {
          styles: [{ color: "green", opacity: 1, weight: 5 }],
        },

   }).addTo(map)

 }, [])

  return null;
};

export default LeafletRoutingMachine;