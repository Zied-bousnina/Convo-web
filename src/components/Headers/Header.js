
import { getDemandesCount } from "Redux/actions/Statistiques.action";
import { getUsersCounts } from "Redux/actions/Statistiques.action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import StatisticCard from "./Components/StatisticCard";
import { getPartnerCounts } from "Redux/actions/Statistiques.action";
// import backgroundImage from "../../../assets/514f2ec3798090c6df00dad1592c8166.svg";
import { FindRequestDemandeByPartner } from "Redux/actions/Demandes.Actions";
import { getMissionByPartnerCounts } from "Redux/actions/Statistiques.action";
// import LeftStaticCurvCard from "./Components/LeftStaticCurvCard";
// import RightStaticCurvCard from "./Components/RightStaticCurvCard";
import { findDemandsstatisticsByPartner } from "Redux/actions/Demandes.Actions";
import { findAmmountStatis } from "Redux/actions/Demandes.Actions";
import LeftStaticCurvCard from "./Components/LeftStaticCurvCard";
import RightStaticCurvCard from "./Components/RightStaticCurvCard";
import { findDemandsstatisticsadmin } from "Redux/actions/Demandes.Actions";


const Header = () => {
  const dispatch = useDispatch();
  const userStatistiques = useSelector((state) => state?.userStatistiques?.statistiques);
  const DemandesStatistiques = useSelector((state) => state?.demandestatistiques?.statistiques?.total);
  const PartnerStatistiques = useSelector((state) => state?.partnerStats?.statistiques?.total);
  const requestsByPartner = useSelector(state=>state?.MissionsStatistiqueByPartner?.statistiques?.missionCount)
  const stats = useSelector(state=>state?.statistiquesPartnerMission?.statistiq?.statistics  )
  const Ammount = useSelector(state=>state?.Ammount?.statistiq  )
  useEffect(() => {
    dispatch(getUsersCounts());
    dispatch(getDemandesCount());
    dispatch(getMissionByPartnerCounts())
    dispatch(findDemandsstatisticsadmin())
    dispatch(getPartnerCounts());
    dispatch(findAmmountStatis());
  }, []);




  const allUser = userStatistiques?.total;
  console.log("stats",stats)

  return (
    <div className="header bg-gradient-reverse-primary pb-8 pt-2 pt-md-7" style={{ minHeight: "300px", backgroundColor: "white", backgroundSize: "cover", backgroundPosition: "center top" }}>
      <Container fluid>
        <div className="header-body">
          <Row>
            <LeftStaticCurvCard key={1} percent={true} to="/admin/DriverList" title="Total Missions" completed={stats?.completed} inProgress={stats?.inProgress} value={stats?.total} />
            <LeftStaticCurvCard key={2} to="/admin/List-demandes" title="Missions en Cours" completed={stats?.inProgress} inProgress={0} value={stats?.inProgress} />
            <LeftStaticCurvCard key={3} to="/admin/List-demandes" title="Missions en Attente" completed={0} inProgress={stats?.pending} value={stats?.pending} />
            <RightStaticCurvCard key={4} to="/admin/List-demandes" title="Total Paiements effectués" value={Ammount?.totalAmount} />
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Header;
