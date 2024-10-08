import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDemandesCount, getBinsCount, getUsersCounts } from "Redux/actions/Statistiques.action";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";
// import React from "react";
// import { Card, CardBody, CardTitle } from "reactstrap";
// import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren, } from 'react-circular-progressbar';
import './HalfCircleProgress.css'; // Make sure to create this CSS file

const LeftStaticCurvCard = ({ title, completed=20, inProgress=50, to,value }) => {
    const total = completed + inProgress;
    var completedPercentage =0
    if (total === 0) {
      console.log("No tasks to calculate percentage");
      completedPercentage = 0; // or handle it however you'd like
    } else {
       completedPercentage = (completed / total) * 100;
      console.log("completedPercentage", completedPercentage);
    }
    // const total = completed + inProgress;
    // const completedPercentage = (completed / total) * 100;

    return (
      <>
        {total || total === 0 ? (
          <Col xs="12" md="4" lg="4" xl="4">
            <Link to={to}>
              <Card className="card-stats mb-4 mb-xl-0"
                style={{
                  boxShadow: "1px 3px 6px 2px rgb(75 98 148 / 20%)",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#F1F4FD",  // Light blue background
                  padding: "20px",
                  textAlign: "center"
                }}
              >
                <CardBody>
                  <Row>
                    <Col xs="9">
                      <CardTitle tag="h6" className="text-uppercase text-muted mb-0" style={{ textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#171A1F",
                       }}>
                        {title}
                      </CardTitle>
                    </Col>
                    <Col xs="3">
                      <div className="three-dots" style={{ float: "right" }}>
                        <i className="fas fa-ellipsis-h"></i>
                      </div>
                    </Col>
                  </Row>
                  <div className="half-circle-container" style={{ width: "100%", margin: "2px auto" }}>
                    <CircularProgressbar
                      value={completedPercentage}
                      styles={buildStyles({
                        rotation: 0.75,
                        trailColor: "#FFFFFF",
                        pathColor: "#6A86EA",
                        strokeLinecap: "butt"
                      })}
                    />
                    <div className="half-circle-mask"></div>
                    <div
                      style={{
                          color: "#000000",
                          fontSize: "50px",
                          fontWeight: "bold",
                          lineHeight: "19px",
                          textAlign: "center",
                        }}
                     className="progress-text">{value}</div>
                  </div>
                  <Row className=" justify-content-center">
                    <div className="text-center" style={{ width: "45%" }}>
                      <strong
                        style={{
                          color: "#565E6C",
                          fontSize: "14px",
                          fontWeight: "bold",
                          lineHeight: "19px",
                          textAlign: "center",
                        }}
                      >Terminé</strong>
                      <div
                        style={{
                          color: "#000000",
                          fontSize: "14px",
                          fontWeight: "bold",
                          lineHeight: "19px",
                          textAlign: "center",
                        }}
                      >{completedPercentage ?
                        completedPercentage.toFixed(0) : 0}%

                      {/* .toFixed(0)}% */}
                      </div>
                    </div>
                    <div className="text-center" style={{ width: "45%" }}>
                      <strong
                        style={{
                          color: "#565E6C",
                          fontSize: "14px",
                          fontWeight: "bold",
                          lineHeight: "19px",
                          textAlign: "center",
                        }}
                      >En cours</strong>
                      <div
                        style={{
                          color: "#000000",
                          fontSize: "14px",
                          fontWeight: "bold",
                          lineHeight: "19px",
                          textAlign: "center",
                        }}
                      >
                      {completedPercentage ?
                      (100 - completedPercentage).toFixed(0) : 0}%

                        {/* (100 - completedPercentage).toFixed(0)}% */}

                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ) : (
          <Col lg="6" xl="6">
            <Skeleton
              className="card-stats mb-4 mb-xl-0 bg-white"
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

  export default LeftStaticCurvCard;