import React from 'react'
import ProductDetails from './components/ProductDetails'
import DemoNavbar from 'components/Navbars/DemoNavbar'
import { Container, Row } from 'reactstrap'
import Features from './components/Features'
import FooterComponent from 'components/FooterComponents'
import Carateristique from './components/Carecteristiques'
import MoreFeatures from './components/MoreFeatures'
import ElectronicBrochure from './components/ElectronicBrochure'
import PlatformAppView from './components/PlatformAppView'
import FeaturesFeetManagmentPlatform from './components/FeaturesFeetManagmentPlatform'
import FaQFeet from './components/FaQFeet'
import AppDownload from './components/AppDownload'
import TopButton from 'components/TopButton/TopButton'

function FleetManagmentPlatform() {
  return (
    <>
     <DemoNavbar />
     <main>
     <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-300 ">
            <div className="shape shape-style-1 shape-default mb--100 " style={{backgroundImage: "url('https://xgenbox.com/wp-content/uploads/2023/04/volvo-fh-heavy-truck-inside-view-interior-front-panel-besthqwallpapers.com-2560x1440-2-.jpg')", height: "50vh",  backgroundSize: "cover", filter: "brightness(70%) "}}>
  
</div>

  <Container className="py-lg-md d-flex justify-content-center">
    <div className="col px-0">
      {/* <Row className="justify-content-center">
        <div className="d-flex justify-content-center align-items-center  img-fluid  circle rounded rounded-circle" style={{backgroundColor: "white", width: "220px", height: "220px"}}>
          <img
            alt="..."
            className="rounded-circle img-fluid  "
            src="https://xgenbox.com/wp-content/uploads/2023/03/logo.svg"
            width={200}
            
            style={{zIndex: "1"}}
            onMouseOver={e => e.currentTarget.parentNode.style.backgroundColor = "#3C976E"}
      onMouseOut={e => e.currentTarget.parentNode.style.backgroundColor = "white"}
          />
        </div>
      </Row> */}
    </div>
  </Container>
  {/* SVG separator */}
  <div className="separator separator-bottom separator-skew pb-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0"
    >
      <polygon
        className="fill-white"
        points="2560 0 2560 100 0 100"
      />
    </svg>
  </div>
</section>
            {/* 1st Hero Variation */}
          </div>
          <section
      className="section section-lg pt-lg-0 "  
      style={{ marginTop:20}}
          >

    <PlatformAppView/>
          </section>
          <section className="section section-lg pt-lg-0 mt--200" style={{ backgroundColor: "#3C976E", marginTop: 20, marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
  <FeaturesFeetManagmentPlatform />
</section>
<section className="section ">
          <div
  className="shape shape-style-1 shape-default flex align-items-sm-center"
  style={
   { textAlign: "center", fontSize: 28, fontWeight: '400', color:'#434955', marginBottom:20}
  }
>
Frequently asked questions
</div>
            <Container>
<FaQFeet/>
            </Container>
          </section>

<section className="section section-lg pt-lg-0" style={{ backgroundColor: "#3C976E", marginTop: 20, marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
  
    <MoreFeatures/>
  </section>
  <section
      style={{
        backgroundColor: "#F8F9FE",
        marginTop: 90,
      }}
>
<div
  className="shape shape-style-1 shape-default flex align-items-sm-center"
  style={
   { textAlign: "center", fontSize: 40, fontWeight: '400', color:'#434955', marginBottom:20}
  }
>
Downloads
</div>
  <AppDownload/>
  
  {/* <ElectronicBrochure/> */}
</section>
<TopButton/>
     </main>
     
     <FooterComponent/>
    </>
  )
}

export default FleetManagmentPlatform