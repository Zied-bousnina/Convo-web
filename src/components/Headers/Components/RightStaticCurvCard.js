import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDemandesCount, getBinsCount, getUsersCounts } from "Redux/actions/Statistiques.action";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";
import './HalfCircleProgress.css'; // Make sure to create this CSS file


const RightStaticCurvCard = ({ title, value, percentageIncrease=0, to }) => {
    return (
      <>
        {value || value === 0 ? (
          <Col xs="12" md="8" lg="8" xl="8">
            <Link to={to}>
              <Card className="card-stats mb-4 mb-xl-0"
                style={{
                  boxShadow: "1px 3px 6px 2px rgb(75 98 148 / 20%)",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#F0FCF9",  // Light blue background
                  padding: "20px",
                  textAlign: "center"
                }}
              >
                <CardBody>
                  <CardTitle tag="h6" className="text-uppercase text-muted mb-0" style={{ textAlign: "left" }}>
                    {title}
                  </CardTitle>
                  <Row className="align-items-center">
                    <Col xs="7">
                      <span className="h2 font-weight-bold mb-0">{`${Number(value).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}`}</span>
                      <p className={`${percentageIncrease >= 0 ? "text-success" : "text-danger"} mt-3 mb-0`}>
                        <i className={`fa ${percentageIncrease >= 0 ? "fa-arrow-up" : "fa-arrow-down"}`} /> {percentageIncrease}%
                      </p>
                    </Col>
                    <Col xs="5">
                      <div className="bar-chart">
                        <div className="bar" style={{ height: "75%", backgroundColor: "#3e98c7" }}></div>
                        <div className="bar" style={{ height: "90%", backgroundColor: "#f4d35e" }}></div>
                        <div className="bar" style={{ height: "60%", backgroundColor: "#3e98c7" }}></div>
                        <div className="bar" style={{ height: "30%", backgroundColor: "#f4d35e" }}></div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ) : (
          <Col lg="6" xl="6">
            <Skeleton
              className="card-stats mb-4 mb-xl-0"
              width={`${(6 / 6) * 100}%`} // Set the width based on the Col size (6 columns out of 12)
              height={100}
              baseColor="#FAFAFA"
              highlightColor="#4444"
              count={1}
            />
          </Col>
        )}
      </>
    );
  };

  export default RightStaticCurvCard;