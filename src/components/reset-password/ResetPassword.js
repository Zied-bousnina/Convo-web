
import React, { useEffect, useState } from "react";

import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

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

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "Redux/actions/authActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";



const initialValues = {
  password: '',
    confirmPassword: ''
   }

   const validationSchema = Yup.object().shape({
     password: Yup.string().required('Password is required'),
     confirmPassword:
        Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
  });
  const API_BASE_URL = process.env.API_URL || 'https://convoyage.onrender.com'
function ResetPassword () {

  const dispatch = useDispatch()
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const errors1 = useSelector(state=>state?.error?.errors)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const Location = useLocation()
  console.log(Location.search)
  const [invalidUser, setinvalidUser] = useState('')
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')
  const [Newpassword, setNewpassword] = useState({
    password: '',
    confirmPassword: ''
  })
  const [success, setsuccess] = useState(false)
  const navigate = useHistory ()


  const {token, id}= queryString.parse(Location.search)

  const verifyToken=async ()=> {
    try {
    const {data} = await axios(`${API_BASE_URL}/api/users/verify-token?token=${token}&id=${id}`)
    setBusy(false)

  } catch (error) {
    if(error?.response?.data){
      const {data} = error.response;
      if(!data.success) return setinvalidUser(data.error)
      return console.log(error.response.data)
      setBusy(false)
    }
    console.log(error)

  }



  }
  useEffect(() => {
    verifyToken()

  }, [])
  const handleOnChange =({target})=>{
    setNewpassword({
      ...Newpassword,
      [target.name]: target.value
    })
    console.log(target)

  }

  const handleSubmit = async(values)=> {
    // setError(false)
    // e.preventDefault()

    // const {values?.password, values?.confirmPassword} = Newpassword
    const {password, confirmPassword} = values
    if(password.trim().length <8 || password.trim().length >20 ){
      return setError('Password must be between 8 and 20 characters')
    }
    if(password !== confirmPassword){
      return setError('Passwords do not match')
    }
    if(password.trim().length < 8){
      return setError('Password must be at least 8 characters')
    }

    try {
      setBusy(true)
    const {data} = await axios.post(`${API_BASE_URL}/api/users/reset-password?token=${token}&id=${id}`, {password})
    setBusy(false)
    console.log(data)

    if(data.success) {

      navigate.push('/reset-password')
      setsuccess(true)

    }


    } catch (error) {
      setBusy(false)
      if(error?.response?.data){
        const {data} = error.response;
        if(!data.success) return setError(data.error)
        return console.log(error.response.data)
        }
        console.log(error)



    }
  }

  if(invalidUser) return <div className='max-w-screen-sm m-auto pt-40'>
    <h1 className='text-center text-3xl text-gray-500 mb-3' >
      {invalidUser}
    </h1>
  </div>

if(busy) return <div className='max-w-screen-sm m-auto pt-40'>
  <div className="flex justify-center items-center">
  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
</div>
</div>

if(success) return <div className='max-w-screen-sm m-auto pt-40'>
<h1 className='text-center text-3xl text-gray-500 mb-3' >
  Password Reset Successfully
</h1>
</div>

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // const handleSubmit = (values) => {
  //   dispatch(loginUser(values))

  // };


    return (

        <main >
            <div className="shape shape-style-1 bg-gradient-default" style={{ height: '100vh' }}>
          <section className="section section-shaped section-lg">


            <Container
            fluid
             className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center d-flex justify-content-center align-items-center">
  <img
    alt="Your Image Alt Text"
    style={{ width: "200px", height: "auto" }}
    src={require("../../assets/img/brand/logo.png")}
  />
</div>

                    </CardHeader>
                    <CardBody className="px-lg-2 py-lg-2">
                      <div className="text-center text-muted mb-4">
                        <big> Reset password </big>
                      </div>
                      <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ errors, touched }) => (
    <Form role="form">
    {error &&  <p
              className="text-danger"
              style={{ textAlign: 'center' }}
    >
            {error}
          </p>}

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
      <FormGroup className={`mb-3   ${
              touched.confirmPassword && errors.confirmPassword ? 'has-danger' : ''
            }`}>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-lock-circle-open" />
            </InputGroupText>
          </InputGroupAddon>
          <Field
            name="confirmPassword"
            placeholder="confirm Password"
            // type="password"
            autoComplete="off"
            type={passwordVisible ? 'text' : 'password'}
            className={`form-control ${
              touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''
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
            name="confirmPassword"
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
      className="my-4"
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
        'Reset password'
      )}
    </Button>
      </div>
    </Form>
  )}
</Formik>

                    </CardBody>
                  </Card>


                </Col>
              </Row>
            </Container>
          </section>
            </div>
        </main>

    );

}

export default ResetPassword;
