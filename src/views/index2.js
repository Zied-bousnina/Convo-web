
import Chart from "chart.js";

import {

  Container,

} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,

} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>


      </Container>
    </>
  );
};

export default Index;
