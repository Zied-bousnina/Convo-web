import React from 'react';
import './Summary.css';

const Summary = ({ vehicle, transport, journey, distance, totalCost }) => {
  return (
    <div className="summary">
      <h2 className="summary-title">Récapitulatif de la demande</h2>
      <div className="summary-detail">
        <p><strong>Véhicule :</strong> {vehicle}</p>
        <p><strong>Transport :</strong> {transport}</p>
        <p><strong>Trajet :</strong> {journey}</p>
        <p><strong>Distance :</strong> {distance.toFixed(2)} km</p>
      </div>
      <div className="summary-total">
        <p><strong>Total :</strong>
        {
          (Number(totalCost)

).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})
        }
        </p>
      </div>
    </div>
  );
};

export default Summary;
