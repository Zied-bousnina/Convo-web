import React from 'react';
import { Col, Card, CardBody } from 'reactstrap';
const cardStyle = {
    backgroundColor: '#f8f9fa', // Light gray background, you'll need to adjust the color code
    color: '#343a40', // Dark gray text, adjust as needed
  };
const TermsComponent = () => {
  return (
    <Col xl="12" className="mb-xl-0">
      <Card className="shadow" style={cardStyle}>
        <CardBody>
          <h5>Conditions particulières</h5>

          <strong>Transport par camion :</strong>
          <p>CarVoy s'engage à vous mettre en relation avec un transporteur camion pour réaliser le transport de votre véhicule entre deux adresses de votre choix.</p>

          <strong>Compris dans le prix :</strong>
          <p>Assurance tout risque (voir les détail de l'assurance), péages, carburant. Conditions d'annulation:</p>
          <ul>
            <li>Si votre véhicule n'est pas encore affecté à un transporteur camion :</li>
            <ul>
              <li>Plus de 48h (hors dimanche et jours fériés) avant la date limite de livraison : Annulation gratuite</li>
              <li>Entre 24 et 48h avant la date limite de livraison : Remboursement de 50% du prix de la commande</li>
              <li>Moins de 24h avant la date limite de livraison : Aucun remboursement</li>
            </ul>
            <li>Si votre véhicule est déjà affecté à un transporteur camion :</li>
            <ul>
              <li>Plus de 48h (hors dimanche et jours fériés) avant la date de l'enlèvement : Annulation gratuite</li>
              <li>Entre 24 et 48h avant la date d'enlèvement : Remboursement de 50% du prix de la commande</li>
              <li>Moins de 24h avant la date d'enlèvement : Aucun remboursement</li>
            </ul>
          </ul>

          <strong>Conditions de transport :</strong>
          <p>Vous vous engagez à mettre à disposition un véhicule assuré et dans l'état de fonctionnement mentionné. Veillez noter qu'un véhicule "en panne" doit néanmoins posséder ses 4 roues, une direction et des freins en état de marche. Dans le cas contraire, il s'agit d'un véhicule "accidenté" et tous deux devraient être préparés pour modifier l'état du véhicule. Un état des lieux du véhicule à l'arrivée sera effectué. Pour des raisons de sécurité et car le véhicule ne sera pas vérouillé, veuillez ne rien stocker dans le véhicule.</p>

          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="acceptTerms" />
            <label className="form-check-label" htmlFor="acceptTerms">J'accepte les conditions</label>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TermsComponent;
