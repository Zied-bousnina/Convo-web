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
    FormGroup,
    Input,
  } from "reactstrap";
  // core components
  import "./style.css"
  import UserHeader from "components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import classNames from "classnames";
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
import { AddDemandePartner } from "Redux/actions/Demandes.Actions.js";
import { Switch } from "@chakra-ui/react";
import SelectDriver from "../PartnerDashboard/Headers/Components/SelectDriver.js";
// import { ToastContainer, toast } from 'react-toastify';
import ReactDatetime from "react-datetime";
import Datetime from 'react-datetime';
import { FetchAllDrivers } from "Redux/actions/Driver.actions.js";
// import { TimeIcon } from './../../node_modules/@mui/x-date-pickers/icons/index';
import Select from 'react-select'
import { ProgressB } from "./Headers/Components/progressBar/ProgressB.js";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Summary from "./validation-devis/Summary/Summary.js";
import ServiceOptions from "./validation-devis/ServicesOptions/ServiceOptions.js";
import Documents from "./validation-devis/Documents/Documents.js";
import { createDemandeNewVersion } from "Redux/actions/Demandes.Actions.js";
import { set } from "react-hook-form";

  const CreateMission = () => {
    // const [destination, setDestination] = useState(null);
    const [startingPointSuggestions, setStartingPointSuggestions] = useState([]);
const [destinationSuggestions, setDestinationSuggestions] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const fetchSuggestions = async (query, isStartingPoint) => {
  if (!query) {
    if (isStartingPoint) {
      setStartingPointSuggestions([]);
    } else {
      setDestinationSuggestions([]);
    }
    return;
  }

  setIsLoading(true); // Start loading

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=fr`);

    if (isStartingPoint) {
      setStartingPointSuggestions(response.data);
    } else {
      setDestinationSuggestions(response.data);
    }
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
  } finally {
    setIsLoading(false); // End loading
  }
};

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
    const [phone, setphone] = useState()
const [selectedMissionType, setSelectedMissionType] = useState(null);
const [screen, setscreen] = useState("create") // professionel //create
const [selectedServices, setSelectedServices] = useState({});
const [transType, setTransType] = useState('convoyeur professionnel');
const [Vehicule, setVehicule] = useState('');
const [imaatChecked, setimaatChecked] = useState(false);
const [data, setdata] = useState({});
const [cost, setcost] = useState(0)
const [costdriver, setcostdriver] = useState(0)
const [price, setPrice] = useState(0);
// function calculatePrice(distance, type) {
//   // Base acceptance fee for a 'convoyeur'
//   const baseFeeConvoyeur = 20;

//   // Price per distance bracket for a 'convoyeur'
//   const pricesConvoyeur = [
//     { maxDist: 0.10, price: 1 },
//     { maxDist: 0.20, price: 0.97 },
//     { maxDist: 0.30, price: 0.95 },
//     { maxDist: 0.40, price: 0.93 },
//     { maxDist: 0.50, price: 0.90 },
//     { maxDist: 1.00, price: 0.875 },
//     { maxDist: 1.50, price: 0.85 },
//     { maxDist: 2.00, price: 0.825 },
//     { maxDist: 2.50, price: 0.80 },
//     { maxDist: 3.00, price: 0.775 },
//     { maxDist: 3.50, price: 0.75 },
//     { maxDist: 4.00, price: 0.725 },
//     { maxDist: 4.50, price: 0.70 },
//     { maxDist: 5.00, price: 0.65 }
//   ];

//   let price = 0;

//   // Find the price bracket based on the distance and calculate the price
//   for (const bracket of pricesConvoyeur) {
//     if (distance <= bracket.maxDist) {
//       price = bracket.price;
//       break;
//     }
//   }

//   if (type === 'convoyeur professionnel') {
//     // If no matching bracket was found, use the last bracket's price
//     if (price === 0) {
//       console.log(pricesConvoyeur[pricesConvoyeur.length - 1].price, "pricesConvoyeur[pricesConvoyeur.length - 1].price")
//       price = pricesConvoyeur[pricesConvoyeur.length - 1].price;
//     }

//     console.log(
//       (baseFeeConvoyeur + price) * 1.6,
//       "baseFeeConvoyeur + price * 1.6"
//     )

//     // Add base fee and apply multiplier for a 'convoyeur'
//     return (baseFeeConvoyeur + price) * 1.6;
//   } else if (type === 'plateau porteur') {
//     // Calculate price as a 'convoyeur' first, then apply the plateau multiplier
//     const convoyeurPrice = calculatePrice(distance, 'convoyeur professionnel');
//     return convoyeurPrice * 2.6;
//   } else {
//     throw new Error('Invalid driver type');
//   }
// }
function calculatePrice(distance, type) {
  const fraisAcceptation = 20;
  let prixKm = 0;
  let tarif = 0;

  if (distance <= 10) {
      prixKm = 1;
  } else if (distance <= 20) {
      prixKm = 0.97;
  } else if (distance <= 30) {
      prixKm = 0.95;
  } else if (distance <= 40) {
      prixKm = 0.93;
  } else if (distance <= 50) {
      prixKm = 0.90;
  } else if (distance <= 100) {
      prixKm = 0.875;
  } else if (distance <= 150) {
      prixKm = 0.85;
  } else if (distance <= 200) {
      prixKm = 0.825;
  } else if (distance <= 250) {
      prixKm = 0.8;
  } else if (distance <= 300) {
      prixKm = 0.775;
  } else if (distance <= 350) {
      prixKm = 0.75;
  } else if (distance <= 400) {
      prixKm = 0.725;
  } else if (distance <= 450) {
      prixKm = 0.7;
  } else if (distance <= 500) {
      prixKm = 0.65;
  }

  tarif = (distance * prixKm) + fraisAcceptation;

  // Add additional charges for distances over 50km
  if (distance > 50) {
      const additionalCharge = Math.floor((distance - 50) / 50) + 1;
      tarif += additionalCharge;
  }

  // Adjust the tariff based on the user type
  if (type === "convoyeur professionnel") {
      tarif *= 1.6;
  } else if (type === "plateau porteur") {
      tarif *= 2.6;
  }

  return tarif;
}

function calculatePriceConvo(distance) {
  // Base acceptance fee for a 'convoyeur'
  const fraisAcceptation = 20;
  let prixKm = 0;
  let tarif = 0;

  if (distance <= 10) {
      prixKm = 1;
  } else if (distance <= 20) {
      prixKm = 0.97;
  } else if (distance <= 30) {
      prixKm = 0.95;
  } else if (distance <= 40) {
      prixKm = 0.93;
  } else if (distance <= 50) {
      prixKm = 0.90;
  } else if (distance <= 100) {
      prixKm = 0.875;
  } else if (distance <= 150) {
      prixKm = 0.85;
  } else if (distance <= 200) {
      prixKm = 0.825;
  } else if (distance <= 250) {
      prixKm = 0.8;
  } else if (distance <= 300) {
      prixKm = 0.775;
  } else if (distance <= 350) {
      prixKm = 0.75;
  } else if (distance <= 400) {
      prixKm = 0.725;
  } else if (distance <= 450) {
      prixKm = 0.7;
  } else if (distance <= 500) {
      prixKm = 0.65;
  }

  tarif = (distance * prixKm) + fraisAcceptation;

  // Add additional charges for distances over 50km
  if (distance > 50) {
      const additionalCharge = Math.floor((distance - 50) / 50) + 1;
      tarif += additionalCharge;
  }

  // Return the sum of the base fee and the price determined by the distance
  return tarif;
}

  const [uploadedDocuments, setUploadedDocuments] = useState({

  });
   // Dummy data for vehicle, transport, journey, and distance
   const [vehicleDetails, setVehicleDetails] = useState({
    vehicle: '',
    transport: '',
    journey: '',
    distance: ''
  });


  // Handle document upload confirmation
  const handleDocumentUpload = (documentName, file) => {
    setUploadedDocuments({
      ...uploadedDocuments,
      [documentName]: file
    });
    setdata({
      ...data,
      [documentName]: file

    })
  };


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
  const calculateAndSetPrice = () => {
    try {
      const calculatedPrice = calculatePrice(distance, transType);
      setPrice(calculatedPrice);
      setcost(calculatedPrice)
      setcostdriver(calculatePriceConvo(distance))
    } catch (error) {
      console.error(error.message);
    }
  };
  calculateAndSetPrice()
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
    time: correctTime ? correctTime : Math.round(distance / 60),
    transport:transType,
    // vehicule: vehicule
    vehicule: Vehicule,

    phone:phone,






  }

  setdata(data)
  console.log("data",data);
  setstartingPoint()
  setdestination()
  console.log("data",data);
  // console.log("data",selectedServices);
  // console.log("data",uploadedDocuments);
  setTimeout(() => {
    if(data.transport==="convoyeur professionnel"){
      setscreen("professionel")
    }else{
      setscreen("plateau")
    }

    console.log()
    setVehicleDetails({
      ...vehicleDetails, // Keep existing vehicleDetails properties
      vehicle: data.vehicule , // Update with actual vehicle name if you have it in state
      transport: data.transport=="convoyeur professionnel" ? "Convoyeur partenaires CarVoy" : "Plateau porteur" , // Update with actual transport type if you have it in state
      journey: `${data.postalAddress} > ${data.postalDestination}`,
      distance: data.distance, // Update with actual distance if you have it calculated
      address: startingPoint,
      destination:destination,
    });

  }, 1000);

        // Continue with the rest of your form submission logic

        e.target.reset();
      };
      const handleTotalUpdate = (total) => {
        setcost(
         price+ total

        );
      }
    const onSubmit2 = async (e) => {




      await setdata({
        ...data,
        price:cost*1.2,
        selectedServices:selectedServices,
        uploadedDocuments,
        remunerationAmount: costdriver
      })

console.log("oihmoiugùo", {
  ...data,
  price:cost*1.2,
  selectedServices:selectedServices,
  uploadedDocuments,
  remunerationAmount: costdriver
},cost )
setstartingPoint()
  setdestination()
  setstartingPoint()
  setdestination()
  setTimeout(() => {


    dispatch(createDemandeNewVersion({
      ...data,
      price:cost,
      selectedServices:selectedServices,
      uploadedDocuments,
      remunerationAmount: costdriver
    }, navigate))
    setstartingPoint()
    setdestination()
  }, 1500);

        // e.target.reset();
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



      const handleServicesUpdate = (services) => {
        setSelectedServices(
          {
            ...services
          }

        );
        console.log("services",services);
        console.log(selectedServices);
      }
      useEffect(() => {
        console.log("selectedServices after update:", selectedServices);
        setdata({
          ...data,
          selectedServices:selectedServices,

        })
      }, [selectedServices]);

    return (
      <>
        <UserHeader />
        {/* Page content */}
        {screen === "create"  ?
        <Container className="mt--7 " fluid>
        <Row>

          <Col xl="12"
          style={{marginBottom:"20px"}}

           >
            <Card className="shadow "
            style={{
              // height: "55vh",

              marginBottom:10 }}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">

                    <h2 className="mb-0">


                    </h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody

style={{    paddingBottom:120, }}



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
  <Col md="4">
    <div className=" mb-3">
      <label className="form-label">Starting point<span style={{color:"red"}}>*</span></label>
      <div className="input-group">
  <input
    type="text"
    placeholder="Choose starting point"
    className="form-control"
    value={startingPoint?.display_name || searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      fetchSuggestions(e.target.value, true);
    }}
    onClick={() => {
      isStartingPointRef.current = true;
      setisStartingPoint(true);
      setisDestination(false);
    }}
  />
  {isLoading && (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  )}
  {startingPoint?.display_name && (
    <button
      type="button"
      className="btn-clear"
      onClick={() => setstartingPoint(null)}
    >
      &times;
    </button>
  )}
  {startingPointSuggestions.length > 0 && (
    <ul className="suggestions-list">
      {startingPointSuggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => {
            setstartingPoint({
              display_name: suggestion.display_name,
              latitude: suggestion.lat,
              longitude: suggestion.lon,
            });
            setStartingPointSuggestions([]);
          }}
        >
          {suggestion.display_name}
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  </Col>
  <Col md="4">
        <div className="mb-3">
          <label className="form-label">Destination<span style={{color:"red"}}>*</span></label>
          <div className="input-group">
            <input
              type="text"
              required
              placeholder="Choose destination, or click on the map"
              value={destination ? destination.display_name : destinationSearchQuery}
              className="form-control"
              onClick={() => {
                isStartingPointRef.current = false;
                setdestination(null); // Clear current destination on input click
              }}
              onChange={(e) => {
                setDestinationSearchQuery(e.target.value);
                fetchSuggestions(e.target.value, false); // Fetch destination suggestions
              }}
            />
            {/* Destination Suggestions */}
            {destinationSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {destinationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setdestination({
                        display_name: suggestion.display_name,
                        latitude: suggestion.lat,
                        longitude: suggestion.lon,
                      });
                      setDestinationSearchQuery(suggestion.display_name);
                      setDestinationSuggestions([]);
                    }}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Col>
  <Col md="4">
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



  {/* <ToastContainer /> */}





{/* <Row>
    <Col md="4">
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
    <Col md="4">
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
</Row> */}





<FormGroup tag="fieldset">
      <Row>
        <Col md="4">
          <legend>Type de Transports</legend>
        </Col>
        <Col md="4">
          <FormGroup check>
            <Input
              name="transportType"
              type="radio"
              value="convoyeur professionnel"
              onChange={(e) => setTransType(e.target.value)}
              checked={transType === 'convoyeur professionnel'}
            />
            {' '}
            <Label check>
              Convoyeur professionnel
            </Label>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup check>
            <Input
              name="transportType"
              type="radio"
              value="plateau porteur"
              onChange={(e) => setTransType(e.target.value)}
              checked={transType === 'plateau porteur'}
            />
            {' '}
            <Label check>
              Plateau porteur
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </FormGroup>


<Row>
  <Col md="4">
    <div className=" mb-3">
      <label className="form-label">Plaque d'immatriculation :</label>
      <div className="input-group">
      {
        !imaatChecked &&
        <input
          type="text"
          // required
          placeholder="immatriculation"

          name={"immatriculation"}
          className={classNames("form-control")}

          onChange={(e) => {
            onChangeHandler(e)

          }}
          required
        />
      }

      </div>
      <FormGroup check>
            <Input
              name="imma"
              type="checkbox"
              // value="convoyeur professionnel"
              onChange={(e) => setimaatChecked(
                e.target.checked
              )}
              checked={imaatChecked}
            />
            {' '}
            <Label check>
              je despose pas de plaque d'immat
            </Label>
          </FormGroup>
    </div>
  </Col>
  <Col md="4">
    <div className=" mb-3">
      <label className="form-label"> Numero du contact: </label>


        <PhoneInput
  country={'fr'}
  value={
    phone
  }
  onChange={
    (e)=>{
      setphone(e)

      }

  }

  enableSearch

/>

    </div>
  </Col>
  <Col md="4">
    <div className=" mb-3">
      <label className="form-label">Mail du contact:</label>
      <div className="input-group">
        <input
          type="text"
          // required
          placeholder="Mail du contact"

          name={"mail"}
          className={classNames("form-control")}

          onChange={(e) => {
            onChangeHandler(e)

          }}
          required
        />
      </div>
    </div>
  </Col>
</Row>
<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Véhicule :</label>
      <div className="input-group">

        <input
          type="text"
          // required
          placeholder="BMW, Mercedes, etc."

          name={"vehicle"}
          className={classNames("form-control")}

          onChange={(e) => {
            onChangeHandler(e)
            setVehicule(e.target.value)

          }}
          required
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
    <button type="Mon Devis" className="btn m-1 ml-3 btn-outline-success">
    {isLoad ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      ) : (
        'Mon devis'
      )}

                  <i className="fa-solid fa-floppy-disk"></i>
                </button></Col>
  </Row>

</form>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className=" mb-xl-0" xl="12">
            <Card className=" shadow ">

              <CardBody
               style={{ overflowY: 'auto' }}
              >
                {/* Chart */}
                {/* <div className="chart"> */}
                <Tooltip target=".export-buttons>button" position="bottom" />
              <MapContainer
              style={{ height: "75vh" }}
               center={currentLocation || position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={"Google Maps"}
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
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
      :
      <Container className="mt--7 " fluid>
        <Row>

          <Col xl="6"
          style={{marginBottom:"20px"}}

           >
            <Card className="shadow "
            style={{
              height: "200vh",
               marginBottom:10 }}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">

                    <h2 className="mb-0">
                    {
                      screen == "professionel" ?
                      "Par un convoyeur professionel":"Par un transport plateau"
                    }
                  </h2>

                  </div>
                </Row>
              </CardHeader>
              <CardBody

style={{ overflowY: 'auto' }}



              >
                {/* Chart */}
                <div className="chart">

                <Summary
        vehicle={vehicleDetails.vehicle}
        transport={vehicleDetails.transport}
        journey={vehicleDetails.journey}
        distance={vehicleDetails.distance}
        totalCost={cost}
        screen={screen}

      />
      {/* <MapView
        origin={origin}
        destination={destination}
      /> */}
      <ServiceOptions
      onUpdateTotal={handleTotalUpdate}
      onUpdateSelectedService={handleServicesUpdate}
      screen={screen}

      />
      <Documents
        onDocumentUpload={handleDocumentUpload}
        // screen={screen}
        validerCommande={onSubmit2}
      />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className=" mb-xl-0" xl="6">
            <Card className=" shadow ">

              <CardBody>
                {/* Chart */}
                {/* <div className="chart"> */}
                <Tooltip target=".export-buttons>button" position="bottom" />
              <MapContainer
              style={{ height: "75vh" }}
               center={currentLocation || position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={"Google Maps"}
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
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

        }


      </>
    );
  };

  export default CreateMission;
