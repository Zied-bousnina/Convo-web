import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L from "leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import "./App.css"
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardFooter,
  Button,
} from "reactstrap";
import Header from './Headers/Header';
import {Link} from "react-router-dom"
import { socket } from "../socket.js";
import 'react-toastify/dist/ReactToastify.css';

import { Tooltip } from 'primereact/tooltip';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "Redux/actions/userAction";
import { useHistory } from 'react-router-dom';
import { SET_PARTNER_DETAILS } from "Redux/types";
import { GetCurrentUser } from "Redux/actions/userAction";
import { SET_ALL_DRIVER } from "Redux/types";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";
import { setCurrentUser } from "Redux/actions/authActions";
import { SetAuthToken } from "utils/SetAuthToken";
import { LogOut } from "Redux/actions/authActions";
function MapsComponent() {
  useEffect(() => {
    console.log("test")
   socket.emit('getOnlineUserss',("test"))
  }
  , [])
  const dispatch = useDispatch();
  const currentUser = useSelector(state=>state?.currentUser?.users?.user?.Newsocket)
  useEffect(() => {
    dispatch(GetCurrentUser())


  }, [dispatch,currentUser?.length])
  // const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([48.709438,2.503570]);
    const position = [51.505, -0.09];
    const AllUsers = useSelector(state => state?.users?.users?.users);
    const defaultCenter = currentLocation || position;
    const defaultZoom = 13;
    const navigate = useHistory();
    const bounds = AllUsers?.reduce(
      (acc, pointBin) => {
        const [lat, lon] = [
          pointBin?.address?.latitude,
          pointBin?.address?.longitude
        ];

        if (lat && lon) {
          acc.extend([lat, lon]);
        }

        return acc;
      },
      L.latLngBounds(defaultCenter, defaultCenter)
    );
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
    // const mapRef = useMapEvents({
    //   click(){
    //
    //   }
    // })
    const myIcon = L.icon({
        iconUrl: require("../assets/img/brand/marker-courier.png"),
        iconSize: [60, 60],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
        className: "my-custom-class"
        });
        const EnRoute = L.icon({
          iconUrl: require("../assets/img/brand/EnRoute.png"),
          iconSize: [60, 60],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [50, 64],
          shadowAnchor: [4, 62],
          className: "my-custom-class"
          });






    useEffect(() => {
      dispatch(GetAllUsers())
      dispatch({
        type: SET_PARTNER_DETAILS,
        payload: {}
    })

    }, [dispatch,AllUsers?.address?.latitude])




    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      });
    }, []);

    useEffect(() => {
      dispatch({
        type: SET_ALL_DRIVER,
        payload:{}
    })
    }, [])

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
      // useEffect(() => {
      //   if (currentLocation) {
      //     map.flyTo(currentLocation, map.getZoom());
      //   }
      // }, [ map]);

      return position1 === null ? null : (
        <Marker position={position1}
        // icon={}
        >
          <Popup>You are here</Popup>
        </Marker>
      );
    };
    const [onlineUsers, setOnlineUsers] = useState(new Map());

    useEffect(() => {
      socket.on('connect', () => {

      });
      socket.on('offline', (userid) => {

        handleOffline(userid)

      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      socket.on('newLocation', (location) => {

        handleLocationUpdate(location);

        setOnlineUsers((prevOnlineUsers) => {
          const newOnlineUsers = new Map(prevOnlineUsers);
          newOnlineUsers.set(location.userId, { location });

          return newOnlineUsers;
        });
      });
      socket.on('userEnRoute', userOnroute=> {

        handleLocationUpdate(userOnroute);
      })

    }, [socket]);
    const [userArray, setUserArray] = useState([]);

    const handleLocationUpdate = (newUserObject) => {

      setUserArray(prevArray => {
        const existingUserIndex = prevArray.findIndex(user => user.userId === newUserObject.userId);

        if (existingUserIndex !== -1) {
          // Update the location of the existing user
          const updatedArray = [...prevArray];

          if (newUserObject.hasOwnProperty('enRoute')) {
            // alert("gggg")
            updatedArray[existingUserIndex] = { ...prevArray[existingUserIndex], enRoute:newUserObject.enRoute  };

          }else {

            updatedArray[existingUserIndex] = { ...prevArray[existingUserIndex], location: newUserObject.location };
          }
          return updatedArray;
        } else {
          // Add a new user object to the array
          return [...prevArray, newUserObject];
        }
      });
    };

    const handleOffline = (offlineUserId) => {
      setUserArray(prevArray => prevArray.filter(user => user.userId !== offlineUserId));
    };

    useEffect(() => {

    }, [onlineUsers]);

    const fetchUser = async ()=>  {
      const user = await localStorage.getItem('jwtToken');
      if (user) {
        const decode = jwt_decode(user);
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/checkTokenValidity`)
        .then(res => {

        dispatch(setCurrentUser(decode));
        SetAuthToken(user);
        if (decode?.role === "ADMIN") {
          navigate.push("/admin/index"); // Use navigate function to redirect
        } else if (decode?.role === "PARTNER") {
          navigate.push("/partner/index");
        }

        })
        .catch(err => {
          dispatch(LogOut())

        })
       // Corrected typo here
      }else {
        dispatch(LogOut())

      }
    }

  useEffect(() => {

    fetchUser()


  }, [])

  return (
    <>
    <Header />
    {/* Page content */}
    <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col
                  // lg="6"
                    md="10"
                  >
                <h3 className="mb-0">Map </h3>

                  </Col>
                  <Col
                  // lg="6"
                    md="2"
                  >
                     <Link
                          to={`/admin/AddRequest`}
                          >
                            <Button
                            className="float-right"
                            // color="primary"
                            >


Créer une mission
                <i className=" ml-2 fas fa-arrow-right" />
                            </Button>
                          </Link>
                  </Col>
                </Row>
              </CardHeader>



            <div className="card ">

              <Tooltip target=".export-buttons>button" position="bottom"


              />
              <MapContainer
                style={{ height: "80vh", width: "100%" }}
                center={{ lat: currentLocation[0], lng: currentLocation[1] }}
                zoom={defaultZoom}
                scrollWheelZoom={true}
                bounds={bounds}
               >
        <TileLayer
         attribution={"Google Maps"}
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
         <MarkerClusterGroup chunkedLoading>




        {userArray &&
          userArray?.map(e => (
            (e?.location?.latitude && e?.location?.longitude )&&
            <Marker
              key={e?._id}
              position={[e?.location?.latitude, e?.location?.longitude]} // Update property names
                icon={e?.enRoute  ? EnRoute:myIcon }
                eventHandlers={{

              click: () => {
                // const navigate = useHistory();
                  navigate.push(`/admin/driver-details/${e.userId}`);
                // alert('A marker has been clicked!')
                }
            }}
            >


            </Marker>
          ))}

        {currentLocation && (
          <Marker position={currentLocation}
            // icon={}
            eventHandlers={{
              click: () => {}
            }}

          >
            <Popup>Your current location</Popup>
          </Marker>
        )}
        <MapsMarker />
        </MarkerClusterGroup>
      </MapContainer>

                </div>
              <CardFooter className="py-4">

              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}

      </Container>
  </>
  )
}

export default MapsComponent