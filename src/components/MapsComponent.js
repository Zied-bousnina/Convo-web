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

import 'react-toastify/dist/ReactToastify.css';

import { Tooltip } from 'primereact/tooltip';

import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "Redux/actions/userAction";
import { useHistory } from 'react-router-dom';
import { SET_PARTNER_DETAILS } from "Redux/types";
function MapsComponent() {
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
    //       console.log('clicked')
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



    // console.log(AllUsers)

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(GetAllUsers())
      dispatch({
        type: SET_PARTNER_DETAILS,
        payload: {}
    })

    }, [dispatch,AllUsers?.address?.latitude])
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

              <Tooltip target=".export-buttons>button" position="bottom" />
              <MapContainer
         style={{ height: "60vh" }}
               center={
                { lat: currentLocation[0], lng: currentLocation[1] }
               }
                zoom={defaultZoom}
                 scrollWheelZoom={true}
               bounds={bounds}




               >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {AllUsers &&
          AllUsers?.map(e => (
            e?.address?.latitude &&
            <Marker
              key={e._id}
              position={[e?.address?.latitude, e?.address?.longitude]} // Update property names
                icon={myIcon}
                eventHandlers={{

              click: () => {
                // const navigate = useHistory();
                  navigate.push(`/admin/driver-details/${e._id}`);
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
              click: () => alert('A marker has been clicked!')
            }}

          >
            <Popup>Your current location</Popup>
          </Marker>
        )}
        <MapsMarker />
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