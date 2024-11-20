import React from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RightStaticCurvCard = ({ title, value, percentageIncrease = 0, to }) => {
  return (
    <>
      {value || value === 0 ? (
        <Col xs="12" md="6" lg="3" xl="3">
          <Link to={to}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <CardTitle className="card-title">{title}</CardTitle>
                <div className="card-value">{`${Number(value).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`}</div>
                <p className={`card-percentage ${percentageIncrease < 0 ? 'negative' : ''}`}>
                  <i className={`fa ${percentageIncrease >= 0 ? "fa-arrow-up" : "fa-arrow-down"}`} /> {percentageIncrease}%
                </p>
              </CardBody>
            </Card>
          </Link>
        </Col>
      ) : (
        <Col lg="3" xl="3">
          <Skeleton className="card-stats mb-4 mb-xl-0" width="100%" height={120} baseColor="#FAFAFA" highlightColor="#4444" count={1} />
        </Col>
      )}
    </>
  );
};

export default RightStaticCurvCard;