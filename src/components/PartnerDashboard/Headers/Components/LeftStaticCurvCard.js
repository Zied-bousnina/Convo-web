import React from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LeftStaticCurvCard = ({ title, completed = 20, inProgress = 50, to, value,percent=false }) => {
  const total = completed + inProgress;
  const completedPercentage = total === 0 ? 0 : (completed / total) * 100;

  return (
    <>
      {total || total === 0 ? (
        <Col xs="12" md="6" lg="3" xl="3">
          <Link to={to}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <CardTitle className="card-title">{title}</CardTitle>
                <div className="card-value">{value ? value : 0}</div>
                <Row className="justify-content-center mt-4">
                  {percent && ( <>

                  <Col xs="6" className="text-center">
                    <strong>Terminé</strong>
                    <div>{completedPercentage.toFixed(0)}%</div>
                  </Col>
                  <Col xs="6" className="text-center">
                    <strong>En cours</strong>
                    <div>{(100 - completedPercentage).toFixed(0)}%</div>
                  </Col>
                  </>
                  )}
                </Row>
              </CardBody>
            </Card>
          </Link>
        </Col>
      ) : (
        <Col lg="3" xl="3">
          <Skeleton className="card-stats mb-4 mb-xl-0 bg-white" width="100%" height={120} baseColor="#FAFAFA" highlightColor="#4444" count={1} />
        </Col>
      )}
    </>
  );
};

export default LeftStaticCurvCard;