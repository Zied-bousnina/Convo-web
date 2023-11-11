import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDemandesCount, getBinsCount, getUsersCounts } from "Redux/actions/Statistiques.action";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const StatisticCard = ({ title, iconClass, value, percentageIncrease }) => (
  <Col lg="6" xl="6">
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              {title}
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">{value}</span>
          </div>
          <Col className="col-auto">
            <div className={`icon icon-shape ${iconClass} text-white rounded-circle shadow`}>
              <i className={iconClass} />
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          <span className={`${percentageIncrease >= 0 ? "text-success" : "text-danger"} mr-2`}>
            {percentageIncrease >= 0 ? <i className="fa fa-arrow-up" /> : <i className="fas fa-arrow-down" />} {percentageIncrease}%
          </span>{" "}
          <span className="text-nowrap">Since yesterday</span>
        </p>
      </CardBody>
    </Card>
  </Col>
);


export default StatisticCard ;
