import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDemandesCount, getBinsCount, getUsersCounts } from "Redux/actions/Statistiques.action";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";

const StatisticCard = ({ title, iconClass, value, percentageIncrease, icon, to }) => (
  <>
    {value ? (
      <Col xs="12" md="6" lg="4" xl="4">
        <Link to={to}>
          <Card className="card-stats mb-4 mb-xl-0 bg-white "
            style={{
              boxShadow: "1px 3px 6px 2px rgb(75 98 148 /20%)",
              borderRadius: "10px",
              border: "none"
            }}
          >
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle tag="h6" className="text-uppercase text-muted mb-0">
                    {title}
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{value}</span>
                </div>
                <Col className="col-auto">
                  <div className={`icon icon-shape ${iconClass} text-white rounded-circle shadow`}>
                    <i className={icon} />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Link>
      </Col>
    ) : (
        <Col lg="4" xl="4">
          <Skeleton
            width={`${(4 / 4) * 100}%`}
            height={100}
            baseColor="#FAFAFA"
            highlightColor="#4444"
            count={1}
          />
        </Col>
      )}
  </>
);



export default StatisticCard ;
