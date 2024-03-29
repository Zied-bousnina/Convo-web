
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  // Form,

  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "Redux/actions/authActions";
import { SET_ALL_BINS_ } from "Redux/types";
import { SET_ALL_CATEGORIES } from "Redux/types";
import { SET_ALL_POINT_BINS } from "Redux/types";
import { SET_USERS } from "Redux/types";
import { SET_CATEGORIE_DETAILS } from "Redux/types";
import { SET_DEMANDES } from "Redux/types";
import { SET_DEMANDE_STATISTIQUES } from "Redux/types";
import { SET_DEVIS_BY_PARTNER } from "Redux/types";
import { SET_ALL_DRIVER } from "Redux/types";
import { SET_DEMANDES_BY_PARTNERS_V2 } from "Redux/types";
import { SET_MISSION_BY_PARTNER_STATISTIQUES } from "Redux/types";
import { SET_DEMANDES_BY_PARTNERS } from "Redux/types";
import { SET_IS_LOADING_TABLE_MISSION } from "Redux/types";
import { SET_PARTNER_DETAILS } from "Redux/types";
import { SET_PARTNER_STATISTIQUES } from "Redux/types";
import { SET_PARTNERSHIP_LIST } from "Redux/types";
import { SET_PROFILES } from "Redux/types";
import { SET_SINGLE_DEMANDE } from "Redux/types";
import { SET_USERS_DETAILS } from "Redux/types";
import { SET_STATISTIQUES } from "Redux/types";
import { SET_CURRENT_USER } from "Redux/types";
import { ADD_UNSEEN_MSG } from "Redux/types";
import { removeSeenMsg } from "Redux/actions/Notification.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { SET_SPECIFIQUE_DEVIS_BY_PARTNER } from "Redux/types";
import { SET_NEW_NOTI } from "Redux/types";
import Logo from "components/Logo/logo";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import { setCurrentUser } from "Redux/actions/authActions";
import { SetAuthToken } from "utils/SetAuthToken";
import { LogOut } from "Redux/actions/authActions";
import "../../index.css"
const initialValues = {
  email: '',
   password: ''
   }

   const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

function Login () {

  const dispatch = useDispatch()
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const errors1 = useSelector(state=>state?.error?.errors)
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = (values) => {
    // Perform any actions (e.g., API calls) here
    // console.log(values);
    // Access form values using "values" object
    dispatch(loginUser(values))
  // Set the submitted state to true
  };
  // console.log(errors && errors)

  // {touched[name] && errors[name] || errors1&& errors1[name] ? (
  //   <Text style={styles.error}>{errors[name]} {errors1 && errors1[name]} </Text>
  //   ) : null}
  useEffect(() => {
    dispatch({type: SET_ALL_BINS_,payload: [],})
    dispatch({type: SET_ALL_CATEGORIES,payload: [],})
    dispatch({type: SET_ALL_POINT_BINS,payload: [],})
    dispatch({type: SET_USERS,payload: [],})
    dispatch({type: SET_CATEGORIE_DETAILS,payload: {},})
    dispatch({type: SET_DEMANDES,payload: [],})
    dispatch({type: SET_DEMANDE_STATISTIQUES,payload: [],})
    dispatch({type: SET_DEVIS_BY_PARTNER,payload: [],})
    dispatch({type: SET_ALL_DRIVER,payload: [],})
    dispatch({type: SET_DEMANDES_BY_PARTNERS_V2,payload: [],})
    dispatch({type: SET_MISSION_BY_PARTNER_STATISTIQUES,payload: [],})
    dispatch({type: SET_DEMANDES_BY_PARTNERS,payload: [],})
    dispatch({type: SET_IS_LOADING_TABLE_MISSION,payload: [],})
    dispatch({type: SET_PARTNER_DETAILS,payload: [],})
    dispatch({type: SET_PARTNER_STATISTIQUES,payload: [],})
    dispatch({type: SET_PARTNERSHIP_LIST,payload: {},})
    dispatch({type: SET_PROFILES,payload: {},})
    dispatch({type: SET_SINGLE_DEMANDE,payload: {},})
    dispatch({type: SET_USERS_DETAILS,payload: [],})
    dispatch({type: SET_STATISTIQUES,payload: {},})
    dispatch({type: SET_CURRENT_USER,payload: {},})
    dispatch({type: ADD_UNSEEN_MSG,payload: [],})
    dispatch(removeSeenMsg([]))
    dispatch({type: SET_CURRENT_USER, payload: {}})
    dispatch({type: SET_SPECIFIQUE_DEVIS_BY_PARTNER,payload: []});
    dispatch({type: SET_NEW_NOTI,payload: []});

  }, [])
  const navigate = useHistory();
  const fetchUser = async ()=>  {
    const user = await localStorage.getItem('jwtToken');
    if (user) {
      const decode = jwt_decode(user);
      axios.get(`https://convoyage.onrender.com/api/users/checkTokenValidity`)
      .then(res => {

      dispatch(setCurrentUser(decode));
      SetAuthToken(user);
      if (decode?.role == "ADMIN") {
        navigate.push("/admin"); // Use navigate function to redirect
      } else if (decode?.role == "PARTNER") {
        navigate.push("/partner");
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

      <main style={{
        height: '100vh',
        background: `url(
          ${bgImage}
        ) no-repeat center center`,
        backgroundSize: 'cover',
    }}>
        <div className="section section-shaped section-lg">
            <Container fluid className="pt-lg-5">
                <Row className="justify-content-center">
                    <Col lg="5">
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-white">
                                <div className="text-muted text-center d-flex justify-content-center align-items-center">
                                    <Logo width="150px" height="auto" />
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-2 py-lg-2">
                            <div className="text-center text-muted mb-2">
                        <big> Connexion </big>
                      </div>
                      <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ errors, touched }) => (
    <Form role="form">
      <FormGroup className={`mb-3   ${
              touched.email && errors.email ? 'has-danger' : ''
            }`}>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Field
            name="email"
            placeholder="Email"
            type="email"
            className={`form-control ${
              touched.email && errors.email ? 'is-invalid' : ''
            }`}
            // className={`form-control ${errors && errors.email ? 'is-invalid' : ''}`}
          />
          <ErrorMessage
            name="email"
            component="div"
            className="invalid-feedback"

          />


        </InputGroup>
      </FormGroup>
      <FormGroup className={`mb-3   ${
              touched.password && errors.password ? 'has-danger' : ''
            }`}>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-lock-circle-open" />
            </InputGroupText>
          </InputGroupAddon>
          <Field
            name="password"
            placeholder="Password"
            // type="password"
            autoComplete="off"
            type={passwordVisible ? 'text' : 'password'}
            className={`form-control ${
              touched.password && errors.password ? 'is-invalid' : ''
            }`}

          />
          <Button
      type="button"
      className="btn-icon"
      onClick={togglePasswordVisibility}
      style={{ marginLeft: '0px' }}
    >
      {passwordVisible ? (
        <FontAwesomeIcon icon={faEye} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} />
      )}
    </Button>
          <ErrorMessage
            name="password"
            component="div"
            className="invalid-feedback"
          />
        </InputGroup>
      </FormGroup>
      <div className="  ">
        {/* <Field
          type="checkbox"
          id="customCheckLogin"
          name="rememberMe"
          className="custom-control-input"
        /> */}
        {/* <label
          className="custom-control-label"
          htmlFor="customCheckLogin"
        > */}
          {(touched.email && errors.email) || (errors1&& errors1.email) ? (
            <>
            <br/>
                  <span style={{color:"red"}}> {errors1 && errors1.email} </span>
            </>
                  ) : null}
                  {(touched.password && errors.password) || (errors1&& errors1.password) ? (
            <>
            <br/>
                  <span style={{color:"red"}}> {errors1 && errors1.password} </span>
            </>
                  ) : null}
        {/* </label> */}
      </div>
      <div className="text-center">
      <Button
      className="mb-2"
      color="primary"
      type="submit"
      disabled={isLoad}
      // onClick={handleSignIn}
    >
      {isLoad ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      ) : (
        'Se connecter'
      )}
    </Button>
      </div>
    </Form>
  )}
</Formik>
                            </CardBody>
                        </Card>
                        <Row className="mt-3">
                            <Col xs="6">
                                <Link className="text-light" to="/forgotpassword-page">
                                    <small>Mot de passe oublié ??</small>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    </main>

    );

}

export default Login;
