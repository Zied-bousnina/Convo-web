import FooterComponent from 'components/FooterComponents'
import DemoNavbar from 'components/Navbars/DemoNavbar'
import React from 'react'

import { Container } from 'reactstrap'
import WhereToInstallaPrivateOrganization from './components/WhereToInstallPrivateOrganization'
import TopButton from 'components/TopButton/TopButton'


function PrivateOrganization() {
  return (
    <>
     <DemoNavbar />
     <main>
     <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-300 ">
            <div className="shape shape-style-1 shape-default mb--100 " style={{
              backgroundImage: "url('https://xgenbox.com/wp-content/uploads/2023/04/3973825.jpg')", height: "500px",  backgroundSize: "cover",
            backgroundPosition: " bottom ",
            // backgroundRepeat: "no-repeat",
            filter: "brightness(90%) "}}>

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
      style={{
        // backgroundColor: "#F8F9FE",
        marginTop: 90,
        marginBottom:50
      }}
>
{/* <section className="section bg-secondary"> */}
            <div
  className="shape shape-style-1 shape-default flex align-items-sm-center"
  style={
   { textAlign: "center", fontSize: 28, fontWeight: '400', color:'#434955', marginTop:-20}
  }
>
Private Applications
</div>
  {/* <Carateristique/> */}
  <div
   style={{
    textAlign: "center",
    fontSize: 18,
    fontWeight: '400',
    color:'#434955',
    marginTop:20,
    marginBottom:20,
    margin:20
  }}
  >

  <p
    style={{
      textAlign: "center",
      fontSize: 18,
      fontWeight: '400',
      color:'#434955',
      marginTop:20,
      marginBottom:20,
      margin:20
    }}


  >Whether it’s a college campus, theme park, hospital, or zoo, we provide custom deployments to customers who had a myriad of different needs. The cost benefits and environmental benefits seen in large-scale municipal or commercial deployments are replicated equally well on a smaller scale.</p>


  </div>
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
   { textAlign: "center", fontSize: 28, fontWeight: '400', color:'#434955', marginTop:-20}
  }
>
Where to Install
</div>
<WhereToInstallaPrivateOrganization/>
</section>



<TopButton/>
     </main>

     <FooterComponent/>
    </>
  )
}

export default PrivateOrganization