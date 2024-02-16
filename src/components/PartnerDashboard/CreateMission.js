import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
    Label,
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import classNames from "classnames";
  import { AddBin } from "Redux/actions/BinAction";
  import { SET_IS_SECCESS } from "Redux/types";
  import {DatePicker} from 'reactstrap-date-picker'


import classnames from "classnames";
import Chart from "chart.js";
import { useHistory } from 'react-router-dom';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts.js";
import { GetAllUsers } from "Redux/actions/userAction.js";
// --------------------------Map
import {Link} from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css';

import { Tooltip } from 'primereact/tooltip';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L from "leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import "../App.css"
// import LeafletRoutingMachine from "./LeafletRoutingMachine.js";
import { AddDemande } from "Redux/actions/Demandes.Actions.js";
import { Switch } from "@chakra-ui/react";
import SelectDriver from "../PartnerDashboard/Headers/Components/SelectDriver.js";
// import { ToastContainer, toast } from 'react-toastify';
import ReactDatetime from "react-datetime";
import Datetime from 'react-datetime';
import { FetchAllDrivers } from "Redux/actions/Driver.actions.js";
// import { TimeIcon } from './../../node_modules/@mui/x-date-pickers/icons/index';
import Select from 'react-select'
import { ProgressB } from "./Headers/Components/progressBar/ProgressB.js";


  const CreateMission = () => {
    const navigate = useHistory();
    const error = useSelector(state=>state.error?.errors)
    const [governorates, setgovernorates] = useState([]);

    const [selectedMunicipal, setMunicipal] = useState('');
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    const [isStartingPoint, setisStartingPoint] = useState(true)
    const [isDestination, setisDestination] = useState(false)
    const [startingPoint, setstartingPoint] = useState()
    const [destination, setdestination] = useState()
    const isStartingPointRef = useRef(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [destinationSearchQuery, setDestinationSearchQuery] = useState("");
    const [checked, setChecked] = useState(false);
    const [value, setValue]= useState(new Date().toISOString())
    const [fmtValue, setFmtValue]= useState(undefined)
    const driverList = useSelector(state=>state?.drivers?.driver_list?.driver)
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    const [correctDistance, setcorrectDistance] = useState(0)
    const [correctTime, setcorrectTime] = useState(0)
const [selectedMissionType, setSelectedMissionType] = useState(null);
const vehicleTypeOptions = [
  { value: 'citadine ', label: 'Citadine ' },
  { value: 'berline ', label: 'Berline ' },
  { value: 'monoespace -van ', label: 'monoespace -van' },
  { value: 'sportive ~ luxe  ', label: 'Sportive ~ luxe  ' },
  { value: 'véhicules utilitaires 3-6m3', label: 'véhicules utilitaires 3-6m3' },
  { value: 'véhicules utilitaires 10~14m3', label: 'véhicules utilitaires 10~14m3' },
  { value: 'camions -3T5 (Permis B )', label: ' camions -3T5 (Permis B )' },
  { value: 'camions +3T5', label: 'camions +3T5' },
  // Add more options as needed
];

const missionTypeOptions = [
  { value: 'transport véhicule 0km par porte voiture', label: 'transport véhicule 0km par porte voiture' },
  { value: 'transport véhicule par un convoyeur', label: 'transport véhicule par un convoyeur' },
  // Add more options as needed
];
    useEffect(() => {
      dispatch(FetchAllDrivers())

    }, [ driverList?.length])
    const colourOptions = []

    const handleSelectChange = (selectedOptions) => {


      setSelectedValues(selectedOptions);
    };
    driverList?.map(e=>{
      colourOptions.push({value:e._id, label:`${e.name}|[${e.email}]`})

    })

    useEffect(( )=> {

    }, [fmtValue])
    const handleChange = (event) => {
      setChecked(event.target.checked);

    };
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



  useEffect(() => {
      axios
        .get(`https://xgenboxv2.onrender.com/api/governorates`)
        .then(res => {
          setgovernorates(res.data[0]);
        })
        .catch(err => {});
    }, []);



    const showToastMessage = () => {
      toast.success('Reaquest created successfully.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }






    const [form, setForm] = useState({
    })

    const onChangeHandler = (e) => {
      const { name, checked, value } = e.target;



        setForm({
          ...form,
          [name]: value,
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
  const distance = correctDistance ? correctDistance : getDistanceFromLatLonInKm()
  const data = {
    ...form,
    address: startingPoint,
    destination:destination,
    postalAddress:startingPoint?.display_name,
    postalDestination:destination?.display_name,
    distance:distance,
    driverIsAuto:!checked,
    dateDepart:value?._d,
    driver:selectedValues?.value,
    vehicleType: selectedVehicleType?.value,
    missionType: selectedMissionType?.value,
    status:"En attente",
    time: correctTime ? correctTime : Math.round(distance / 60)






  }
  setstartingPoint()
  setdestination()
  setTimeout(() => {


    dispatch(AddDemande(data, navigate))
  }, 1000);

        // Continue with the rest of your form submission logic
        // dispatch(AddBin({ ...form, governorate: selectedValue, municipale: selectedMunicipal }));

        e.target.reset();
      };
    // --------------------------------Map--------------------------------
    const [currentLocation, setCurrentLocation] = useState(null);
    const position = [51.505, -0.09];

    let DefaultIcon = L.icon({

      iconUrl: require("../../assets/img/brand/Marker-location.png"),
      iconSize: [60, 60],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [50, 64],
      shadowAnchor: [4, 62],
      className: "my-custom-class"
    });

    L.Marker.prototype.options.icon = DefaultIcon;


    const myIcon = L.icon({
        iconUrl: require("../../assets/img/brand/marker-courier.png"),
        iconSize: [60, 60],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
        className: "my-custom-class"
        });



    const AllUsers = useSelector(state => state?.users?.users?.users);


    // const dispatch = useDispatch();

    useEffect(() => {
      dispatch(GetAllUsers())

    }, [dispatch,AllUsers?.length])


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
      if( startingPoint?.latitude && destination?.latitude){

        const routerControl = L.Routing.control({
          waypoints: [
            L.latLng(startingPoint.latitude, startingPoint.longitude),
            L.latLng(destination.latitude, destination.longitude),
          ],
        }).addTo(map);
        routerControl.on('routesfound', function(e) {
     var routes = e.routes;
     var summary = routes[0].summary;
     // alert distance and time in km and minutes
     setcorrectDistance(summary.totalDistance / 1000)
     setcorrectTime(Math.round(summary.totalTime % 3600 / 60))
    //  alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
  });
        }
      useEffect(() => {
        if (currentLocation) {
          map.flyTo(currentLocation, map.getZoom());
        }
      }, [ map]);
      return position1 === null ? null : (
        <Marker position={position1}
        // icon={}
        >
          <Popup>You are here</Popup>
        </Marker>
      );
    };
    const MapEvents = () => {
        const map = useMapEvents({
          click: onMapClick,
        });

        useEffect(() => {
          if (currentLocation) {
            map.flyTo(currentLocation, map.getZoom());
          }
        }, [map]);

        return null;
      };
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7 " fluid>
        <Row>

          <Col xl="4"
          style={{marginBottom:"20px"}}

           >
            <Card className="shadow "
            style={{ height: "120vh", marginBottom:10 }}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                    create a mission
                    </h6>
                    <h2 className="mb-0">Directions</h2>
                  </div>
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
<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Starting point<span style={{color:"red"}}>*</span></label>
      <div className="input-group">
        <input
          type="text"
          required
          placeholder="Choose starting point, or click on the map"
          value={startingPoint ? startingPoint.display_name : searchQuery}
          name={"start"}
          className={classNames("form-control")}
          onClick={() => {
            isStartingPointRef.current = true;
            setisStartingPoint(true);
            setisDestination(false);
          }}
          onChange={(e) => {
            setstartingPoint(null);
            setSearchQuery(e.target.value);
            // onChangeHandler(e)
          }}
        />
      </div>
    </div>
  </Col>
</Row>

<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Destination<span style={{color:"red"}}>*</span></label>
      <div className="input-group">
        <input
          type="text"
          required
          placeholder="Choose destination, or click on the map"
          value={destination ? destination.display_name : destinationSearchQuery}
          name={"destination"}
          className={classNames("form-control")}
          onClick={() => {
            isStartingPointRef.current = false;
            setisStartingPoint(false);
            setisDestination(true);
          }}
          onChange={(e) => {
            setdestination(null);
            setDestinationSearchQuery(e.target.value);
            // onChangeHandler(e)
          }}
        />
      </div>
    </div>
  </Col>
</Row>

  {/* <ToastContainer /> */}





<Row>
    <Col>
    <button
    type="button"
  onClick={() => {
    isStartingPointRef.current = true;
    setisStartingPoint(true);
    setisDestination(false);
  }}
  className={classnames("btn m-1 ", { "btn-primary": isStartingPoint },{"btn-outline-primary": !isStartingPoint})}
>
  Set Starting Point
</button>


    </Col>
    <Col>
    <button
    type="button"
  onClick={() => {
    isStartingPointRef.current = false;
    setisStartingPoint(false);
    setisDestination(true);
  }}
  className={classnames("btn m-1  ", { "btn-primary": isDestination  }, {"btn-outline-primary": !isDestination})}
>
  Set Destination
</button>

    </Col>
</Row>



<Row>

<Col>
<label className="form-label">date Depart<span style={{color:"red"}}>*</span></label>
<Datetime

onChange={(e)=>setValue(e)}
value={value}
// timeFormat={false}
inputProps={{
  placeholder: "Date Picker Here",
  name: "dateDepart"
}}



 />
</Col>
</Row>
<Row>
  <Col>
    <label className="form-label">Type de véhicule<span style={{color:"red"}}>*</span></label>
    <Select
      className="react-select primary"
      onChange={(selectedOption) => setSelectedVehicleType(selectedOption)}
      options={vehicleTypeOptions}
      value={selectedVehicleType}
      required
    />
  </Col>
</Row>
<Row>
  <Col>
    <label className="form-label">Nature de mission<span style={{color:"red"}}>*</span></label>
    <Select
      className="react-select primary"
      onChange={(selectedOption) => setSelectedMissionType(selectedOption)}
      options={missionTypeOptions}
      value={selectedMissionType}
      required
    />
  </Col>
</Row>
<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Comment</label>
      <div className="input-group">
        <input
          type="text"
          // required
          placeholder="Comment"

          name={"comment"}
          className={classNames("form-control")}

          onChange={(e) => {
            onChangeHandler(e)

          }}
        />
      </div>
    </div>
  </Col>
</Row>


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
    <button type="submit" className="btn m-1 ml-3 btn-outline-success">
    {isLoad ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      ) : (
        'Submit'
      )}

                  <i className="fa-solid fa-floppy-disk"></i>
                </button></Col>
  </Row>

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
              style={{ height: "75vh" }}
               center={currentLocation || position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {
            (startingPoint &&destination) &&
<LeafletRoutingMachine
            startingPoint={startingPoint}
            destination={destination}

/>
        } */}
        <MapEvents />

            <Marker
            //   key={pointBin._id}
            position={destination?.latitude && destination?.longitude ? [destination.latitude, destination.longitude] : [0, 0]} // Update property names
                icon={myIcon}
            //     eventHandlers={{
            //   click: () => alert('A marker has been clicked!')
            // }}
            >
<Popup>{destination?.display_name}</Popup>
            </Marker>

        {startingPoint && (
          <Marker
           position={startingPoint?.latitude && startingPoint?.longitude ? [startingPoint.latitude, startingPoint.longitude] : [36.8019592, 10.9403163]}
        //   position={
        //     [startingPoint.latitude, startingPoint.longitude]

        //   }
            // icon={}
            // icon={}
            // eventHandlers={{
            //   click: () => alert('A marker has been clicked!')
            // }}

          >
            <Popup>{startingPoint?.display_name}</Popup>
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

  export default CreateMission;
