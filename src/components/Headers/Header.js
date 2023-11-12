/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { getDemandesCount } from "Redux/actions/Statistiques.action";
import { getBinsCount } from "Redux/actions/Statistiques.action";
import { getUsersCounts } from "Redux/actions/Statistiques.action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import StatisticCard from "./Components/StatisticCard";



const Header = () => {
  const dispatch = useDispatch();
  const userStatistiques = useSelector((state) => state?.userStatistiques?.statistiques);
  const BinStatistiques = useSelector((state) => state?.binStatistiques?.statistiques);
  const DemandesStatistiques = useSelector((state) => state?.demandestatistiques?.statistiques?.total);


  useEffect(() => {
    dispatch(getUsersCounts());
    // dispatch(getBinsCount())
    dispatch(getDemandesCount());
  }, [userStatistiques, DemandesStatistiques, dispatch]);



// console.log(userStatistiques)
  const allUser = userStatistiques?.total;

  return (
    <div className="header bg-gradient-green pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          <Row>
            {/* Uncomment the following lines when needed */}
            {/* <StatisticCard title="Bins Count" iconClass="bg-green" value={BinStatistiques?.totalCount} percentageIncrease={BinStatistiques?.percentageIncrease} /> */}
            <StatisticCard key={1} icon={"fas fa-users"} title="Users Count" iconClass="bg-warning" value={allUser?.totalCount} percentageIncrease={allUser?.percentageIncrease} />
            <StatisticCard key={2} icon={"fas fa-truck"} title="Driver requests" iconClass="bg-yellow" value={DemandesStatistiques?.totalCount} percentageIncrease={DemandesStatistiques?.percentageIncrease} />
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Header;
