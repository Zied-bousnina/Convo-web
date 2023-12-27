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
import { getPartnerCounts } from "Redux/actions/Statistiques.action";
import backgroundImage from "../../assets/514f2ec3798090c6df00dad1592c8166.svg";


const Header = () => {
  const dispatch = useDispatch();
  const userStatistiques = useSelector((state) => state?.userStatistiques?.statistiques);
  const BinStatistiques = useSelector((state) => state?.binStatistiques?.statistiques);
  const DemandesStatistiques = useSelector((state) => state?.demandestatistiques?.statistiques?.total);
  const PartnerStatistiques = useSelector((state) => state?.partnerStats?.statistiques?.total);

console.log(PartnerStatistiques)
  useEffect(() => {
    dispatch(getUsersCounts());
    // dispatch(getBinsCount())
    dispatch(getDemandesCount());
    dispatch(getPartnerCounts());
  }, [userStatistiques, DemandesStatistiques,PartnerStatistiques, dispatch]);



// console.log(userStatistiques)
  const allUser = userStatistiques?.total;

  return (
    <div className="header bg-gradient-reverse-primary pb-8 pt-2 pt-md-7 "
        style={{
    minHeight: "300px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center top"
  }}>
      <Container fluid>
        <div className="header-body">
          <Row>
            {/* Uncomment the following lines when needed */}
            {/* <StatisticCard title="Bins Count" iconClass="bg-green" value={BinStatistiques?.totalCount} percentageIncrease={BinStatistiques?.percentageIncrease} /> */}
            <StatisticCard  to="/admin/DriverList" key={1} icon={"fas fa-users"} title=" conducteurs" iconClass="bg-warning" value={allUser?.totalCount} percentageIncrease={allUser?.percentageIncrease} />
            <StatisticCard  to="/admin/PartnerList" key={2} icon={"fas fa-handshake"} title="Partenaires" iconClass="bg-yellow" value={PartnerStatistiques?.totalCount} percentageIncrease={PartnerStatistiques?.percentageIncrease} />
            <StatisticCard  to="/admin/List-demandes" key={2} icon={"fas fa-truck"} title="missions" iconClass="bg-info" value={DemandesStatistiques?.totalCount} percentageIncrease={DemandesStatistiques?.percentageIncrease} />
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Header;
