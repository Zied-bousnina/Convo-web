import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import React, { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import classNames from "classnames";
  import { SET_IS_SECCESS } from "Redux/types";
  // import OppositeContentTimeline from './TimeLine.js'


// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// reactstrap components

import { useHistory } from 'react-router-dom';
// core components
import {
  chartOptions,
  parseOptions,
} from "../variables/charts.js";
import { GetAllUsers } from "Redux/actions/userAction.js";
// --------------------------Map
import {Link} from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css';

import { Tooltip } from 'primereact/tooltip';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L from "leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import "./App.css"
import LeafletRoutingMachine from "./LeafletRoutingMachine.js";
import { AddDemande } from "Redux/actions/Demandes.Actions.js";
// import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { FindRequestDemandeById } from "Redux/actions/Demandes.Actions.js";
import { Divider } from "@chakra-ui/react";
import Skeleton from "react-loading-skeleton";
import { SET_SINGLE_DEMANDE } from "Redux/types.js";
import { FindAllCategories } from "Redux/actions/Demandes.Actions.js";

  const RequestDetails = () => {
    const navigate = useHistory();
    const [governorates, setgovernorates] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Tunis');
    const [selectedMunicipal, setMunicipal] = useState('');
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    const SingleDemande = useSelector(state=>state?.Demande?.demandes?.demande)
    const devis = useSelector(state=>state?.Demande?.demandes?.devis)
    const [isStartingPoint, setisStartingPoint] = useState(true)
    const [isDestination, setisDestination] = useState(false)
    const [startingPoint, setstartingPoint] = useState()
    const [destination, setdestination] = useState()
    const isStartingPointRef = useRef(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [destinationSearchQuery, setDestinationSearchQuery] = useState("");
    const [modal, setModal] = useState(false);

    const Categories = useSelector(state=>state?.AllCategories?.categorie?.categorie)
    useEffect(() => {

      dispatch(FindAllCategories())
    }, [ Categories?.length])
    const [loading, setLoading] = useState(true);
   // Replace '...' with the actual image URL

    const handleImageLoad = () => {
      setLoading(false);
    };
    const toggle = () => setModal(!modal);
    const { id } = useParams();

    // console.log(id)
    const dispatch = useDispatch()
    const onMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        // const displayName = `(${lat}, ${lng})`;

        if (isStartingPointRef.current) {
        //   setstartingPoint({ display_name: displayName, latitude: lat, longitude: lng });
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const result = response.data;

            if (result) {
                setstartingPoint({
                display_name: result.display_name,
                latitude: lat,
                longitude: lng,
              });
            }
          } catch (error) {
            // console.error("Error fetching coordinates for the destination from the reverse geocoding service", error);
            // Handle the error, e.g., show a message to the user
          }
        } else {
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const result = response.data;

            if (result) {
              setdestination({
                display_name: result.display_name,
                latitude: lat,
                longitude: lng,
              });
            }
          } catch (error) {
            // console.error("Error fetching coordinates for the destination from the reverse geocoding service", error);
            // Handle the error, e.g., show a message to the user
          }
        }
      };
      useEffect(() => {
        dispatch(FindRequestDemandeById(id))
      }, [SingleDemande])

      // console.log(SingleDemande?._id)
      useEffect(() => {
        dispatch({
          type: SET_SINGLE_DEMANDE,
          payload: {},
        });

      }, [])

// console.log("SingleDemande",SingleDemande)
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
      e.preventDefault();
      setActiveNav(index);
      setChartExample1Data("data" + index);
    };

    dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })
  // alert(devis)



  useEffect(() => {
      axios
        .get(`https://xgenboxv2.onrender.com/api/governorates`)
        .then(res => {
          setgovernorates(res.data[0]);
        })
        .catch(err => {
          // console.log(err)
        });
    }, []);

     const municipales = governorates?.governorates?.filter(
      (item) => item.name === selectedValue,
    );

    const showToastMessage = () => {
      toast.success('Reaquest created successfully.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }






    const [form, setForm] = useState({
    })

    const onChangeHandler = (e) => {
      const { name, value } = e.target;


        setForm({
          ...form,
          [name]: value
        });


    };
    useEffect(() => {
      if (isSuccess) {

        showToastMessage()
      }
    }, [isSuccess])

    const onSubmit = async (e) => {
        e.preventDefault();

        // If the starting point search query is not empty, use a geocoding service to get the coordinates
        if (searchQuery) {
            try {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
              );
              const result = response.data[0];

              if (result) {
                setstartingPoint({
                  display_name: result.display_name,
                  latitude: parseFloat(result.lat),
                  longitude: parseFloat(result.lon),
                });
              }
            } catch (error) {
              // console.error("Error fetching coordinates from the geocoding service", error);
            }
          }

        // If the destination search query is not empty, use a geocoding service to get the coordinates
       // If the destination search query is not empty, use a geocoding service to get the coordinates
  if (destinationSearchQuery) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destinationSearchQuery)}`
      );
      const result = response.data[0];

      if (result) {
        setdestination({
          display_name: result.display_name,
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
        });
      }
    } catch (error) {
      // console.error("Error fetching coordinates for the destination from the geocoding service", error);
    }
  }

  const getDistanceFromLatLonInKm=()=>{
    const lat1 = startingPoint?.latitude;
  const lon1 = startingPoint?.longitude;
  const lat2 = destination?.latitude;
  const lon2 = destination?.longitude;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
   return d
  }
  const deg2rad=(deg)=> {
    return deg * (Math.PI/180)
  }
  const distance = getDistanceFromLatLonInKm()
  const data = {
    // ...form,
    address: startingPoint,
    destination:destination,
    postalAddress:startingPoint?.display_name,
    postalDestination:destination?.display_name,
    distance:distance,
    offer:"",
    comment:""

  }

  // console.log(data)
dispatch(AddDemande(data, navigate))
        // Continue with the rest of your form submission logic

        e.target.reset();
      };
    // --------------------------------Map--------------------------------
    const [currentLocation, setCurrentLocation] = useState(
      SingleDemande?
      [SingleDemande?.address?.latitude, SingleDemande?.address?.longitude]
      :

      [48.709438,2.503570]);
    const position = [51.505, -0.09];
    const defaultZoom = 13;

    let DefaultIcon = L.icon({

      iconUrl: require("../assets/img/brand/Marker-location.png"),
      iconSize: [60, 60],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [50, 64],
      shadowAnchor: [4, 62],
      className: "my-custom-class"
    });

    L.Marker.prototype.options.icon = DefaultIcon;


    const myIcon = L.icon({
        iconUrl: require("../assets/img/brand/marker-courier.png"),
        iconSize: [60, 60],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
        className: "my-custom-class"
        });



    const AllUsers = useSelector(state => state?.users?.users?.users);
    // console.log(AllUsers)

    // const dispatch = useDispatch();

    useEffect(() => {
      dispatch(GetAllUsers())

    }, [dispatch,AllUsers?.length])

// console.log(AllUsers)
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      });
    }, []);

    const MapsMarker = () => {
      const [position1, setPosition] = useState(null);
      const map = useMapEvents({
        click() {
          map.locate();
        },
        locationfound(e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        },
      });
      useEffect(() => {
        if (currentLocation) {
          map.flyTo(
            { lat:
              SingleDemande?.
              address?.latitude
              ? SingleDemande?.address?.latitude
              : currentLocation[0],
               lng: SingleDemande?.address?.longitude
               ? SingleDemande?.address?.longitude
               : currentLocation[1]},

             map.getZoom());
        }
      }, [SingleDemande?.
        address?.latitude]);
      return position1 === null ? null : (
        <Marker position={position1}
        // icon={}
        >
          <Popup>You are here</Popup>
        </Marker>
      );
    };
    // const MapEvents = () => {
    //     const map = useMapEvents({
    //       click: onMapClick,
    //     });

    //     useEffect(() => {
    //       if (currentLocation) {
    //         map.flyTo(currentLocation, map.getZoom());
    //       }
    //     }, [map]);

    //     return null;
    //   };
    // console.log(devis?.length)
    return (
      <>
        <UserHeader />
        {/* <CustomizedTimeline/> */}
        {/* Page content */}
        <Container className="mt--7" fluid>
        <Row>

        <Col xl="4"
          style={{marginBottom:"20px"}}

           >
            <Card className="shadow "
            style={{ height: "120vh", marginBottom:10 }}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <Col
                    xs="8"
                  >
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Mission details

                    </h6>
                    <h2 className="mb-0">Directions</h2>
                  </Col>
                  {
                    SingleDemande?.status =='En attente' || SingleDemande?.status== 'Devis' || SingleDemande?.status== 'in progress' &&


                  <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/edit-mission/${id}`}
                            >

                      <Button
                        // color="primary"

                        size="sm"
                        >  Edit
                        <i className=" ml-2 fas fa-arrow-right" />
                      </Button>
                        </Link>
                    </Col>
                  }

                </Row>
              </CardHeader>
              <CardBody





              >
                {/* Chart */}
                <div className="chart">

      <form onSubmit={onSubmit}
style={
  {
    // padding:"20px",
    // border:"1px solid #ccc",
    borderRadius:"5px",
    justifyContent: 'center',
    alignItems: 'center',
    // margin:20
    // display: 'flex',
  }

}
>
{
  SingleDemande?.demareeMissionImages.length> 0 || SingleDemande?.termineemissionImages?.length>0 ?

<Row>
  <Col md="12">
    <div className=" mb-3">
      {/* <label className="form-label"> Image Demarre :</label> */}
      <div className="input-group">
      <Button color="danger" onClick={toggle}>
      Images de la voiture
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen={
        true
      }
      >
        <ModalHeader toggle={toggle}>Début de la mission</ModalHeader>

        <ModalBody>
        {
          SingleDemande?.demareeMissionImages.map(e=> {
            return(
              <div>
      {loading && (
        <div className="loading-image-placeholder">
          Chargement...
        </div>
      )}
              <img
              style={{
          width: "150px",
          height: "150px",
          filter: loading ? 'blur(8px)' : 'none', // Apply blur when loading
        }}
        alt="Your Image"
        onLoad={handleImageLoad}
        onClick={() => window.open(e, '_blank')}
              src={e}
              />
               </div>
            )
          })
        }
        </ModalBody>
        {
          SingleDemande?.termineemissionImages?.length>0 &&
          (
            <>

        <ModalHeader >Fin de la mission</ModalHeader>

        <ModalBody>
        {
          SingleDemande?.termineemissionImages.map(e=> {
            return(
              <div>
      {loading && (
        <div className="loading-image-placeholder">
          Chargement...
        </div>
      )}
              <img
              style={{
          width: "150px",
          height: "150px",
          filter: loading ? 'blur(8px)' : 'none', // Apply blur when loading
        }}
        onClick={() => window.open(e, '_blank')}
        alt="Your Image"
        onLoad={handleImageLoad}
              src={e}
              />
               </div>
            )
          })
        }
        </ModalBody>
        </>
          )

        }
        <ModalFooter>

          <Button color="secondary" onClick={toggle}>
          Annuler
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}
{
  SingleDemande ?

<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Starting point</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="Choose starting point, or click on the map"
          value={SingleDemande?.address?.display_name}
          name={"start"}
          className={classNames("form-control")}
          disabled

        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}
 {
  SingleDemande ?

<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Destination</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="Choose destination, or click on the map"
          value={SingleDemande?.destination?.display_name}
          name={"destination"}
          className={classNames("form-control")}
          disabled
        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
 }

  {/* <ToastContainer /> */}







<Row

>


</Row>
{
  SingleDemande ?


<Row
className="mb-3"
>

<Col>
        {/* Switch button for automatic or manual choice */}
{
  true &&
  <>


  <label className="form-label">Mission Status :
  <span style={{
    color: SingleDemande?.status === "in progress" ? "orange" :
      SingleDemande?.status === "Accepted" ? "green" :
        SingleDemande?.status === "rejected" ? "red" :
          // SingleDemande?.status === "in progress" ? "blue" :
            SingleDemande?.status === "Completed" ? "green" :
              SingleDemande?.status === "canceled" ? "red" : ""
  }}>
    {SingleDemande?.status === "in progress" ? "Pending" :
      SingleDemande?.status === "Accepted" ? "Accepted" :
        SingleDemande?.status === "rejected" ? "rejected" :

            SingleDemande?.status === "Completed" ? "Done" :
              SingleDemande?.status === "canceled" ? "Canceled" : ""}
  </span>
</label>

{/* <Select required

   className="react-select primary"
   onChange={handleSelectChange}
      isLoading={colourOptions.length==0 ?  true: false}
      isDisabled={selectedValues.length >3 ?true: false}

    options={colourOptions} /> */}
  </>

}
{/* <OppositeContentTimeline/> */}




      </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}
{
  SingleDemande?.missionType?
<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">mission Type
</label>
      <div className="input-group">
        <input
          type="text"
          // placeholder="Choose starting point, or click on the map"
          value={ SingleDemande?.missionType}
          name={"start"}
          className={classNames("form-control")}
          disabled

        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}

{
  SingleDemande?.vehicleType?
<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">
vehicle Type

</label>
      <div className="input-group">
        <input
          type="text"
          // placeholder="Choose starting point, or click on the map"
          value={ SingleDemande?.vehicleType
}
          name={"start"}
          className={classNames("form-control")}
          disabled

        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}
{
  SingleDemande ?
<Row>


<Col>
<label className="form-label">date Depart </label>
<div className="input-group">
  <input
    type="text"
    placeholder="Choose date of departure"
    value={SingleDemande?.dateDepart&& new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }
                ).format(new Date(SingleDemande?.dateDepart))}
    name={"dateDepart"}
    className={classNames("form-control")}
    disabled
  />
</div>
</Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}
{
  SingleDemande ?


  SingleDemande?.driver  &&
  <React.Fragment>
  <Divider
  style={{
    marginTop:"20px",
    marginBottom:"20px"
  }}
  />

  <label className="form-label">Driver details <Link
  to={`/admin/driver-details/${SingleDemande?.driver?._id}`}
  // target="_blank"


   style={{color:"#5e72e4"}}>( check more details)</Link></label>



<Row>

<Col>
<label className="form-label">Driver Name </label>
<div className="input-group">
  <input
    type="text"
    placeholder="Choose date of arrival"
    value={ SingleDemande?.driver?.name}
    name={"dateArrive"}
    className={classNames("form-control")}
    disabled
  />
</div>
</Col>
</Row>

  </React.Fragment>


:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}



{

  SingleDemande ?

<Row>
<Col>
<label className="form-label">Distance (Km) ~</label>
<div className="input-group">
  <input
    type="text"
    placeholder="Choose distance of mission"
    value={ `~${Math.floor(SingleDemande?.distance)} km`}
    name={"distance"}
    className={classNames("form-control")}
    disabled
  />
</div>
</Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}



{/*
</Col>
</Row> */}

{
  SingleDemande || SingleDemande?.comment ?


  SingleDemande?.comment &&

<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Comment</label>
      <div className="input-group">
        <input
          type="text"
          // required



          className={classNames("form-control")}
          disabled
          value={
            SingleDemande?.comment
          }


        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}

{
  SingleDemande ?

  <Row>

    <Col
    className="col-12"
    style={{
      height: "60vh",
      width: "85%",
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }}


    >
    {
      !devis?.length ?


    <Link
    to={`/admin/createDevis/${SingleDemande?._id}`}
    // target="_blank"
    state={{ SingleDemmande : SingleDemande}}
    >
    <Button
    className="btn-icon btn-3"
    color="primary"
    type="button"

    >
    <span className="btn-inner--icon">
    <i className="ni ni-bold-right"></i>
    </span>
    <span className="btn-inner--text">Devis </span>
    </Button>
    </Link>
    :

    SingleDemande?.status =='En attente'  || SingleDemande?.status== 'in progress' &&
      (

    <Link
    to={`/admin/editdevis/${SingleDemande?._id}`}
    // target="_blank"
    state={{ SingleDemmande : SingleDemande}}
    >
    <Button
    className="btn-icon btn-3"
    color="primary"
    type="button"

    >
    <span className="btn-inner--icon">
    <i className="ni ni-bold-right"></i>
    </span>
    <span className="btn-inner--text">Edit devis </span>
    </Button>
    </Link>
      )
    }

  </Col>
  </Row>
  :
  <Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={150}
height={50}

/>
}

</form>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className=" mb-xl-0" xl="8">
            <Card className=" shadow ">

              <CardBody>
                {/* Chart */}
                {/* <div className="chart"> */}
                <Tooltip target=".export-buttons>button" position="bottom" />
              <MapContainer
              style={{ height: "60vh" }}
              center={
                { lat: currentLocation[0], lng: currentLocation[1] }
               }
                zoom={defaultZoom}
                 scrollWheelZoom={true}
              //  bounds={bounds}
>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            (SingleDemande?.address &&SingleDemande?.destination) &&
<LeafletRoutingMachine
            startingPoint={{
              latitude: SingleDemande?.address?.latitude,
              longitude: SingleDemande?.address?.longitude,
            }}
            destination={{
              latitude: SingleDemande?.destination?.latitude,
              longitude: SingleDemande?.destination?.longitude,
            }}

/>
        }
        {/* <MapEvents /> */}

            <Marker
            position={SingleDemande?.destination?.latitude && SingleDemande?.destination?.longitude ? [SingleDemande?.destination.latitude, SingleDemande?.destination.longitude] : [0, 0]} // Update property names
                icon={myIcon}
            //     eventHandlers={{
            //   click: () => alert('A marker has been clicked!')
            // }}
            >
<Popup>{SingleDemande?.destination?.display_name}</Popup>
            </Marker>

        {SingleDemande?.address && (
          <Marker
           position={SingleDemande?.address?.latitude && SingleDemande?.address?.longitude ? [SingleDemande?.address.latitude, SingleDemande?.address.longitude] : [36.8019592, 10.9403163]}
        //   position={
        //     [startingPoint.latitude, startingPoint.longitude]

        //   }
            // icon={}
            // icon={}
            // eventHandlers={{
            //   click: () => alert('A marker has been clicked!')
            // }}

          >
            <Popup>{SingleDemande?.address?.display_name}</Popup>
          </Marker>
        )}
        <MapsMarker />
      </MapContainer>
                {/* </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>

      </>
    );
  };

  export default RequestDetails;
