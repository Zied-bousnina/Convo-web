// components/SummaryComponent/SummaryComponent.js
import React from 'react';

const SummaryComponent = ({ vehicle, transport, journey, distance, totalCost, screen }) => (
  <div>
    <h3>Summary</h3>
    <p>Vehicle: {vehicle}</p>
    <p>Transport: {transport}</p>
    <p>Journey: {journey}</p>
    <p>Distance: {distance} km</p>
    <p>Total Cost: {totalCost} €</p>
  </div>
);

export default SummaryComponent;