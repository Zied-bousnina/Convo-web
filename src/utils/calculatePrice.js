// utils/calculatePrice.js
export const calculatePrice = (distance, type) => {
    const fraisAcceptation = 20;
    let prixKm = 0;
    let tarif = 0;

    if (distance <= 10) {
      prixKm = 1;
    } else if (distance <= 20) {
      prixKm = 0.97;
    } else if (distance <= 30) {
      prixKm = 0.95;
    } else if (distance <= 40) {
      prixKm = 0.93;
    } else if (distance <= 50) {
      prixKm = 0.90;
    } else if (distance <= 100) {
      prixKm = 0.875;
    } else if (distance <= 150) {
      prixKm = 0.85;
    } else if (distance <= 200) {
      prixKm = 0.825;
    } else if (distance <= 250) {
      prixKm = 0.8;
    } else if (distance <= 300) {
      prixKm = 0.775;
    } else if (distance <= 350) {
      prixKm = 0.75;
    } else if (distance <= 400) {
      prixKm = 0.725;
    } else if (distance <= 450) {
      prixKm = 0.7;
    } else if (distance <= 500) {
      prixKm = 0.65;
    }

    tarif = (distance * prixKm) + fraisAcceptation;

    if (distance > 50) {
      const additionalCharge = Math.floor((distance - 50) / 50) + 1;
      tarif += additionalCharge;
    }

    if (type === "convoyeur professionnel") {
      tarif *= 1.6;
    } else if (type === "plateau porteur") {
      tarif *= 2.6;
    }

    return tarif;
  };