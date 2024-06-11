import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "Redux/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Logo from "components/Logo/logo";
import "../../index.css";

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const dispatch = useDispatch();
  const isLoad = useSelector(state => state?.isLoading?.isLoading);
  const errors1 = useSelector(state => state?.error?.errors);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    // Your useEffect logic here
  }, []);

  const navigate = useHistory();
  const fetchUser = async () => {
    // Your fetchUser logic here
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main>
      <div className="top-section">
        <div className="section section-shaped section-lg">
          <Container fluid className="pt-lg-5">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-white shadow border-0" style={{ maxWidth: '400px', margin: 'auto' }}>
      <CardBody className="px-lg-4 py-lg-4">
      <div className="text-muted mb-4" style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold', color: '#333333' }}>
  <big>Se connecter</big>
</div>



        <Button
  className="btn-neutral btn-icon mb-3"
  color="default"
  href="#pablo"
  onClick={e => e.preventDefault()}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '40px',
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#fff',
  }}
>
  <span className="btn-inner--icon" style={{ marginRight: '10px' }}>
    <img
      alt="Google icon"
      src={require("assets/img/icons/common/google.svg").default}
      style={{ width: '20px', height: '20px' }}
    />
  </span>
  <span className="btn-inner--text"  style={{ color: '#808080' }}>Continuer avec Google</span>
</Button>

<div className="text-center text-muted mb-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#ccc', margin: '0 10px' }}></div>
  <small>OU</small>
  <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#ccc', margin: '0 10px' }}></div>
</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form role="form">
              <FormGroup className={`mb-3 ${touched.email && errors.email ? 'has-danger' : ''}`}>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Field
                    name="email"
                    placeholder="Adresse Email"
                    type="email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className={`mb-3 ${touched.password && errors.password ? 'has-danger' : ''}`}>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Field
                    name="password"
                    placeholder="Mot de passe"
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete="off"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
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
              <div className="text-right mb-3">
                <Link className="text-muted" to="/forgotpassword-page">
                  <small>Mot de passe oublié</small>
                </Link>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
    type="submit"
    disabled={isLoad}
  >
    {isLoad ? (
      <div className="spinner-border text-black" role="status">
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
        <div className="text-center">
          <small>Vous n'avez pas de compte ? <Link to="/login">S'inscrire</Link></small>
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
  );
}

export default Login;
