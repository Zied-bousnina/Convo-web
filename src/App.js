
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";

import SmartBox from "components/products/SmartBox";
import FleetManagmentPlatform from "components/products/FleetManagmentPlatform";
import QuoteRequest from "components/contact/QuoteRequest";
import SmartCities from "components/market/SmartCities";
import CommercialEstablishment from "components/market/CommercialEstablishment";
import PrivateOrganization from "components/market/PrivateOrganization";
import WasteCollector from "components/market/WasteCollectors";
import AboutCompany from "components/Company/AoutCompany";
import Partnership from "components/Company/Partnership";
import ContactDetail from "components/contact/ContactDetail";
import TechnicalAssistance from "components/contact/TechnicalAssistance";
import AdminLayout from "./layouts/Admin.js";
import PartnerLayout from "./layouts/Partner.js";
import PrivateRouter from "components/PrivateRouter.js";
import ForceRedirect from "components/ForceRedirect.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import NoAccess from "components/NoAccess.js";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { LogOut } from "Redux/actions/authActions.js";
import { SetAuthToken } from "utils/SetAuthToken.js";
import { GetProfile } from "Redux/actions/profile.actions.js";
import { setCurrentUser } from "Redux/actions/authActions.js";
import UserDetails from "components/UserDetails.js";
import { io } from "socket.io-client"

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css'
import { FetchAllPartnership } from "Redux/actions/PartnershipAction.js";
import { FindRequestDemande } from "Redux/actions/Demandes.Actions.js";
import axios from "axios";
import ForgotPassword from "views/examples/ForgotPassword.js";
import { SET_SINGLE_DEMANDE } from "Redux/types.js";
// import 'primeflex/primeflex.css';
import { socket } from './socket';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { addUnseenmsg } from "Redux/actions/Notification.action.js";
import { SET_ALL_BINS_ } from "Redux/types.js";
import { SET_ALL_CATEGORIES } from "Redux/types.js";
import { SET_ALL_POINT_BINS } from "Redux/types.js";
import { SET_USERS } from "Redux/types.js";
import { SET_USER } from "Redux/types.js";
import { SET_CATEGORIE_DETAILS } from "Redux/types.js";
import { SET_DEMANDES } from "Redux/types.js";
import { SET_DEMANDE_STATISTIQUES } from "Redux/types.js";
import { SET_DEVIS_BY_PARTNER } from "Redux/types.js";
import { SET_ALL_DRIVER } from "Redux/types.js";
import { SET_DEMANDES_BY_PARTNERS_V2 } from "Redux/types.js";
import { SET_MISSION_BY_PARTNER_STATISTIQUES } from "Redux/types.js";
import { SET_DEMANDES_BY_PARTNERS } from "Redux/types.js";
import { SET_IS_LOADING_TABLE_MISSION } from "Redux/types.js";
import { SET_PARTNER_DETAILS } from "Redux/types.js";
import { SET_PARTNER_STATISTIQUES } from "Redux/types.js";
import { SET_PARTNERSHIP_LIST } from "Redux/types.js";
import { SET_PROFILES } from "Redux/types.js";
import { SET_USERS_DETAILS } from "Redux/types.js";
import { SET_STATISTIQUES } from "Redux/types.js";
import { GetCurrentUser } from "Redux/actions/userAction.js";
import { removeSeenMsg } from "Redux/actions/Notification.action.js";

function App() {
  // const userId = useSelector(state=>state?.auth?.user?._id)

  const  sendMessage=()=> {
    console.log("Button clicked");
    socket.emit("send_message", { message: "Hello from client" });
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);


  const user = useSelector(state=>state.auth)
  const profile = useSelector(state=>state?.profile?.profile)
  const currentUser = useSelector(state=>state?.currentUser?.users?.user?.Newsocket)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(GetCurrentUser())
  //   dispatch(removeSeenMsg([]))
  //   dispatch(addUnseenmsg(currentUser?.Newsocket))

  // }, [dispatch,currentUser?.length])
  // console.log("current user ", currentUser)

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      try {
        const decodedToken = jwt_decode(jwtToken);
        const activeExpires = new Date(decodedToken.exp * 1000); // Convert seconds to milliseconds
        const currentDate = new Date();

        if (currentDate > activeExpires) {
          // Token has expired
          localStorage.removeItem('jwtToken');
          dispatch(LogOut());
          dispatch(setCurrentUser({}));
        } else {
          // Token is still valid, check with the server
          axios.get(`${process.env.REACT_APP_API_URL}/api/users/checkTokenValidity`) // Replace with your backend endpoint
            .then(response => {
              // Request was successful, token is valid
              // console.log('Token is valid');
            })
            .catch(error => {
              // Request failed, likely due to invalid token
              // console.error('Token validation failed:', error);
              localStorage.removeItem('jwtToken');
              dispatch(setCurrentUser({}));
              dispatch(LogOut());
            });
        }
      } catch (error) {
        // Token decoding failed
        // console.error('Token decoding failed:', error);
        localStorage.removeItem('jwtToken');
        dispatch(setCurrentUser({}));
        dispatch(LogOut());
      }
    }
  }, [dispatch,user]);
  useEffect(() => {
    const value = localStorage.getItem('jwtToken')

        if (value) {
          const decode = jwt_decode(value);
          // console.log("ligne 107:******************************************",value)
          // console.log(decode);
          dispatch(setCurrentUser(decode));
          dispatch(GetProfile());
          dispatch(GetProfile());
          // dispatch(GetRequest());
          SetAuthToken(value); // Corrected typo here
        }


    const activeExpires = new Date(user?.user?.iat);
    const currentDate = new Date();
    // console.log(`activeExpires-----------------------------------------------------------------------------------`,
    //  activeExpires < currentDate);
    if (currentDate > activeExpires) {
      localStorage.removeItem('jwtToken');
      dispatch(LogOut())
      // dispatch(setCurrentUser({}));
    }
  }, []);

  useEffect(() => {
    dispatch(GetProfile())

  }, [profile])
  useEffect(() => {
    dispatch({
      type: SET_SINGLE_DEMANDE,
      payload: {},
    });

  }, [])

  const user2 = useSelector(state=>state?.auth?.user)
  useEffect(() => {

    socket.on("add-user", (newMessage) => {
      console.log("------------------------------------------------------------------------------")
      console.log("New message received",newMessage);
      // alert("partner",newMessage?.partner)
      // alert("userId",user?._id)
      // console.log("test",newMessage?.partner ==user?._id, newMessage?.partner, user?.user?._id)
      // console.log("test", newMessage?.partner, user?.user?._id)
      // console.log("user",user)
      // console.log("test",newMessage?.partner ==userId, newMessage?.partner, userId)
      // alert(newMessage?.partner ==user?.user?._id )

      // if(newMessage?.partner ==user2?.id ){

      //   handleNotyfy(newMessage);
      // }

    });

  const handleNotyfy = (newMessage) => {
    dispatch(addUnseenmsg(newMessage));
  };
}, [])




  return (
    <BrowserRouter>
     {/* <input placeholder="Message" />
      <button onClick={sendMessage}>Send message</button> */}

    <Switch>
           <Route  path="/admin"   render={(props) =>
           <PrivateRouter user={user}>
            <AdminLayout {...props} />
           </PrivateRouter>
          } />
          <Route  path="/partner"   render={(props) =>
           <PrivateRouter user={user}>
            <PartnerLayout {...props} />
           {/* <Route path="/profile-page" exact render={(props) => <Profile {...props} />}/> */}

           </PrivateRouter>
          } />

<Route path="/" exact render={(props) => <AdminLayout {...props} />} />
<Route path="/" exact render={(props) => <PartnerLayout {...props} />} />

           <Route path="/login" render={(props) =>
           <ForceRedirect user={user}>
           {/* <Login /> */}
           <Login {...props} />
         </ForceRedirect>

           } />

           {/* <Route path="/profile-page" exact render={(props) => <Profile {...props} />}/>
           <Route path="/register-page" exact render={(props) => <Register {...props} />}/> */}
           <Route path="/forgotpassword-page" exact render={(props) => <ForgotPassword {...props} />}/>

           <ForceRedirect user={user}>
           {/* <Login /> */}
           <NoAccess  />
         </ForceRedirect>
           {/* <Route path="/noaccess" exact render={(props) => <NoAccess {...props} />}/> */}
           {/* <FooterComponent/> */}
           <Redirect  to="/login" />
    </Switch>
  </BrowserRouter>
  );
}

export default App;