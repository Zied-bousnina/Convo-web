/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "Redux/actions/authActions";
import AppLoader from "assets/Animations/AppLoader";
import { Link } from "react-router-dom";
import { forgotPassword } from "Redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
const initialValues = {
  email: '',

   }

   const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),

  });

function ForgotPassword () {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch()
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const errors1 = useSelector(state=>state?.error?.errors)
  console.log(errors1)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isSuccess = useSelector(state=>state?.success?.success)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const showToastMessage = () => {
    toast.success(`Email has been sent `, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });

  }

  useEffect(() => {
    if (isSuccess) {

      showToastMessage()
    }
  }, [isSuccess])
  const handleSubmit = (values) => {
    // Perform any actions (e.g., API calls) here
    console.log(values);
    // Access form values using "values" object
    dispatch(forgotPassword(values.email))
    setSubmitted(true); // Set the submitted state to true
  };
  // console.log(errors && errors)

  // {touched[name] && errors[name] || errors1&& errors1[name] ? (
  //   <Text style={styles.error}>{errors[name]} {errors1 && errors1[name]} </Text>
  //   ) : null}

    return (
      <>
      {/* <AppLoader/> */}

      <main>
      <div className="top-section">
        <div className="section section-shaped section-lg">
          <Container fluid className="pt-lg-5">
            <Row className="justify-content-center">
              <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Mot de passe oublié</small>
                      </div>


                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Ne vous inquiétez pas ! Cela arrive, veuillez saisir l'adresse associée à votre compte</small>
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
      <ToastContainer />

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
          {touched.email && errors.email || errors1&& errors1.email ? (
            <>
            <br/>
                  <span style={{color:"red"}}> {errors1 && errors1.email} </span>
            </>
                  ) : null}
                  {touched.password && errors.password || errors1&& errors1.password ? (
            <>
            <br/>
                  <span style={{color:"red"}}> {errors1 && errors1.password} </span>
            </>
                  ) : null}
                  { errors1&& errors1.error ? (
            <>
            <br/>
                  <span style={{color:"red"}}> {errors1 && errors1.error} </span>
            </>
                  ) : null}
        {/* </label> */}
      </div>
      <div className="text-center">
      <Button
      className="my-4"
      style={{
      width: 'auto',
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: '#C3C3C3',
      border: 'none',
      borderRadius: '25px',
      color: '#ffff',
      textAlign: 'left',
    }}
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
        'Envoyer le lien'
      )}
    </Button>
      </div>
    </Form>
  )}
</Formik>
 <div className="text-center">
          <small><Link to="/login">Connexion</Link></small>
        </div>
                    </CardBody>
                  </Card>
                {/* <Row className="mt-3">
                  <Col xs="6">
                    <Link className="text-light" to="/forgotpassword-page">
                      <small>Mot de passe oublié ??</small>
                    </Link>
                  </Col>
                </Row> */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="bottom-section"></div>
    </main>
        {/* <SimpleFooter /> */}
      </>
    );

}

export default ForgotPassword;
