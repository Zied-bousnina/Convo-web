
import React, { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
// import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";

import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardFooter,
  Button,
  Modal,
} from "reactstrap";
import routes from "routes.js";
import Partnersidebar from "components/Sidebar/Partnersidebar";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "Redux/actions/authActions";


const Partner = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [notificationModal, setnotificationModal] = useState(false)
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const [selectedItem, setselectedItem] = useState(null)
  const isSuccess = useSelector(state=>state?.success?.success)
  const user = useSelector(state=>state.auth)
  const [isSuccessModal, setisSuccessModal] = useState(user?.isFirstTime)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch()

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/partner" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "";
  };

  const handleSubmit = e =>{
    e.preventDefault()
    if(newPassword !== confirmPassword){
      alert("Password not match")
      return
    }
    dispatch(updatePassword({
      newPassword:newPassword,
      confirm:confirmPassword

    }))
    setisSuccessModal(false)
  }
  const handleClose = () =>{
    setisSuccessModal(false)
  }


  return (
    <>
  <Modal
  className="modal-dialog-centered modal-success"
  contentClassName="bg-gradient-success"
  isOpen={user?.isFirstTime}
  // isOpen={true}
>
  <form onSubmit={(e) => {
    handleSubmit(e)
    }}>
    <div className="modal-header">
      <h6 className="modal-title" id="modal-title-notification">

      </h6>
      {/* <button
        aria-label="Close"
        className="close"
        data-dismiss="modal"
        type="button"
        onClick={() => setnotificationModal(false)}
      >
        <span aria-hidden={true}>×</span>
      </button> */}
    </div>
    <div className="modal-body">
      <div className="py-3 text-center">
        <i className="ni ni-bell-55 ni-3x" />
        <h4 className="heading mt-4">Create New Password</h4>

        {/* New Password Input */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter new password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          className="form-control"
          placeholder="Confirm new password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
    <div className="modal-footer">
      <Button
        className="btn-white"
        color="default"
        type="submit"
      >
        {isLoad ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          "Ok, Got it"
        )}
      </Button>
      {/* <Button
        className="text-white ml-auto"
        color="link"
        data-dismiss="modal"
        type="button"
        onClick={() => setnotificationModal(false)}
      >
        Close
      </Button> */}
    </div>
  </form>
</Modal>


      <Partnersidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "...",

        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/partner/index" />
        </Switch>
        <Container fluid>
          {/* <AdminFooter /> */}
        </Container>
      </div>
    </>
  );
};

export default Partner;
