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
  import { useParams } from "react-router-dom";
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
import TermsComponent from "./TermsComponent.js";
import BillingForm from "./components/BillingForm.js";
import StripeContainer from "components/Payment/partner/StripeContainer.js";
import { getUserInformationById } from "Redux/actions/Demandes.Actions.js";

  const Devis = () => {
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
const [screen, setscreen] = useState("create") // professionel //create
const [selectedServices, setSelectedServices] = useState({});
const [transType, setTransType] = useState('convoyeur professionnel');
const [data, setdata] = useState({});
const [cost, setcost] = useState(0)
const [price, setPrice] = useState(0);
function calculatePrice(distance, type) {
  // Base acceptance fee for a 'convoyeur'
  const baseFeeConvoyeur = 20;

  // Price per distance bracket for a 'convoyeur'
  const pricesConvoyeur = [
    { maxDist: 0.10, price: 1 },
    { maxDist: 0.20, price: 0.97 },
    { maxDist: 0.30, price: 0.95 },
    { maxDist: 0.40, price: 0.93 },
    { maxDist: 0.50, price: 0.90 },
    { maxDist: 1.00, price: 0.875 },
    { maxDist: 1.50, price: 0.85 },
    { maxDist: 2.00, price: 0.825 },
    { maxDist: 2.50, price: 0.80 },
    { maxDist: 3.00, price: 0.775 },
    { maxDist: 3.50, price: 0.75 },
    { maxDist: 4.00, price: 0.725 },
    { maxDist: 4.50, price: 0.70 },
    { maxDist: 5.00, price: 0.65 }
  ];

  let price = 0;

  // Find the price bracket based on the distance and calculate the price
  for (const bracket of pricesConvoyeur) {
    if (distance <= bracket.maxDist) {
      price = bracket.price;
      break;
    }
  }

  if (type === 'convoyeur professionnel') {
    // If no matching bracket was found, use the last bracket's price
    if (price === 0) {
      price = pricesConvoyeur[pricesConvoyeur.length - 1].price;
    }

    // Add base fee and apply multiplier for a 'convoyeur'
    return (baseFeeConvoyeur + price) * 1.6;
  } else if (type === 'plateau porteur') {
    // Calculate price as a 'convoyeur' first, then apply the plateau multiplier
    const convoyeurPrice = calculatePrice(distance, 'convoyeur professionnel');
    return convoyeurPrice * 2.6;
  } else {
    throw new Error('Invalid driver type');
  }
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
    transporttype:transType,
    price:cost,






  }

  setdata(data)
  console.log("data",data);
  setstartingPoint()
  setdestination()
  console.log("data",data);
  // console.log("data",selectedServices);
  // console.log("data",uploadedDocuments);
  setTimeout(() => {
    if(data.transporttype==="convoyeur professionnel"){
      setscreen("professionel")
    }else{
      setscreen("plateau")
    }

    setVehicleDetails({
      ...vehicleDetails, // Keep existing vehicleDetails properties
      vehicle: 'LAND ROVER FREELAND', // Update with actual vehicle name if you have it in state
      transport: data.transporttype==="convoyeur professionnel" ? "Convoyeur partenaires Daycar" : "Plateau porteur" , // Update with actual transport type if you have it in state
      journey: `${data.postalAddress} > ${data.postalDestination}`,
      distance: data.distance, // Update with actual distance if you have it calculated
      address: startingPoint,
      destination:destination,
    });
    // dispatch(AddDemandePartner(data, navigate))
  }, 1000);

        // Continue with the rest of your form submission logic
        // dispatch(AddBin({ ...form, governorate: selectedValue, municipale: selectedMunicipal }));

        e.target.reset();
      };
    const onSubmit2 = async (e) => {




      await setdata({
        ...data,
        selectedServices:selectedServices,
        uploadedDocuments
      })
  const formdata = new FormData();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((value) => {
        formdata.append(key, value);
      });
    } else {
      formdata.append(key, data[key]);
    }
  });
console.log("oihmoiugùo",formdata, data)

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


      const handleTotalUpdate = (total) => {
        setcost(
         price+ total

        );
      }
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
      const { id } = useParams();
      const [userInformation, setuserInformation] = useState({})
      const [isloadBillingInformation, setisloadBillingInformation] = useState(false)
      const getUserInformation = () => {
        setisloadBillingInformation(true)
        dispatch(getUserInformationById(id))
        .then(data => {
          // Handle the successful response here
          console.log("data",data);
         setuserInformation(data
         )
         setisloadBillingInformation(false)

        })
        .catch(error => {
          // Handle the error here
          setisloadBillingInformation(false)
        });
      }
      useEffect(() => {
        getUserInformation()
      }, [])


    return (
      <>
        <UserHeader />
        <Container className="mt--7 " fluid>
        <Row>
        <Col className=" mb-xl-0" xl="6">
            <Card className=" shadow ">

              <CardBody>
              <TermsComponent/>


              </CardBody>
            </Card>
          </Col>
          <Col xl="6"
          style={{marginBottom:"20px"}}

           >
            <Card className="shadow "
            style={{ marginBottom:10 }}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">

                    <h2 className="mb-0">

<BillingForm id={id}  />
<StripeContainer />
                    </h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody





              >
                {/* Chart */}
                <div className="chart">


                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
        <ToastContainer />
      </Container>


      </>
    );
  };

  export default Devis;
