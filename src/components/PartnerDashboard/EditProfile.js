
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Spinner,
    Alert
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
import FileInput from "components/FileInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditProfile_Web } from "Redux/actions/profile.actions";
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from "formik";
import { SET_ERRORS } from "Redux/types";
import { EditProfile_WebPartner } from "Redux/actions/profile.actions";

  const EditProfilePartner = () => {
    const profile = useSelector(state=>state?.profile?.profile)
    const user = useSelector(state=>state.auth?.user)
    const [form, setForm] = useState({})
    const dispatch  = useDispatch()
    const navigation=  useHistory()
    const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const error = useSelector(state=>state.error?.errors)
    useEffect(() => {
        dispatch({
            type: SET_ERRORS,
            payload: {}
        })
    }, [])

    const onChangeHandlerFile = (e) => {
        const { name, files } = e.target;

        setForm({
          ...form,
          [name]: files[0],
          // kbis: e.target.files[0]
        });

      };
      const onChangeHandler = (e) => {
        const { name, value } = e.target;



          setForm({
            ...form,
            [name]: value,
          });



      };
      const showToastMessage1 = () => {
        toast.error('Please add all Document', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
      }
      const onSubmit = (e)=>{

        e.preventDefault();


        const data = {
           "email":
              form.email ? form.email : user?.email,
              "name":
                form.name ? form.name : user?.name,
                "address":
                form.address ? form.address : profile?.address,
                "city":
                form.city ? form.city : profile?.city,
                "country":
                form.country ? form.country : profile?.country,
                "postalCode":
                form.postalCode ? form.postalCode : profile?.postalCode,
                "avatar":
                form.profile ? form.profile : profile?.avatar,
                "tel":
                form.tel ? form.tel : profile?.tel,




        }

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


      dispatch(EditProfile_WebPartner(formdata,navigation))

      // !error?.success ? showErrorToastMessage() : null




          // showToastMessage()
          // setSelectedBins([])
          e.target.reset();


      }


    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
        <form onSubmit={onSubmit}
  style={
    {
      padding:"20px",
      // border:"1px solid #ccc",
      borderRadius:"5px",
      justifyContent: 'center',
      alignItems: 'center',
      margin:20
      // display: 'flex',
    }

  }
  >
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      {/* <a href="#pablo" onClick={(e) => e.preventDefault()}> */}
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={profile?.avatar ?
                        profile?.avatar :
                        form.profile ?
                        URL.createObjectURL(form.profile) :
                       'https://www.gravatar.com/avatar/05b6d7cc7c662bf81e01b39254f88a49?d=identicon'}
                        />
                      {/* </a> */}
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  {/* <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div> */}
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">

                  <div className="text-center mt-md-5">
                    <h3>
                    {user?.name}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {profile?.address},
                       {profile?.city},
                        {profile?.country}
                    </div>
                    {/* <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div> */}
                    {/* <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                    <hr className="my-4" />
                    <p>
                      {profile?.Bio}
                    </p>
                    <FileInput
                  id="profile"
                  name="profile"
                  onChange={onChangeHandlerFile}
                  accept="image/png, image/jpeg"


                ></FileInput>
                  </div>

                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Mon compte</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Button
                    type={"submit"}
                      color="primary"

                      onClick={(e) => {
                        // e.preventDefault();
                        // navigate.push('/admin/edit-profile')
                      }}
                      size="sm"
                      loading
                    >
                    {
                        isLoad ?
                        <Spinner size="sm">
    Loading...
  </Spinner>
  :
'Valider'
                    }

                    </Button>
                  </Col>

                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                    Informations sur l'utilisateur
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Nom d'utilisateur
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={user?.name}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              onChange={onChangeHandler}
                              name="name"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Adresse e-mail
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="jesse@example.com"
                              defaultValue={user?.email}
                              type="email"
                              onChange={onChangeHandler}
                              name={"email"}
                            />
                            {
                                error?.error =="Email already exists" ||  error?.response?.data?.error =="Email already exists"&&

                          <Alert color="danger">

                             {
                                error?.error =="Email already exists"?
                                "L'adresse e-mail existe déjà":
                                ""


                           }
                           {
                                error?.response?.data?.error =="Email already exists"?
                                "L'adresse e-mail existe déjà":
                                ""
                           }
                        </Alert>
                            }
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tel"
                            >
                              Tel
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={profile?.tel}
                              id="input-tel"
                              placeholder="tel"
                              type="tel"
                              onChange={onChangeHandler}
                              name="tel"
                            />

                          </FormGroup>
                        </Col>
                            {/* {error.error} */}
                            { error?.error =="Tel already exists"  ||  error?.response?.data?.error =="Tel already exists"&&
                        <Alert color="danger">
                           {
                                error?.error =="Tel already exists"?
                                "Le numéro de téléphone existe déjà":
                                ""


                           }
                           {
                                error?.response?.data?.error =="Tel already exists"?
                                "Le numéro de téléphone existe déjà":
                                ""
                           }
                        </Alert>
                            }

                      </Row>
                      {/* <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Lucky"
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Jesse"
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row> */}
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                    Coordonnées
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={profile?.address}
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              onChange={onChangeHandler}
                              name="address"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Ville
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={profile?.city}
                              id="input-city"
                              placeholder="City"
                              type="text"
                              onChange={onChangeHandler}
                              name="city"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Pays
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={profile?.country}
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              onChange={onChangeHandler}
                              name="country"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                             Code postal
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              defaultValue={profile?.postalCode}
                              type="number"
                              onChange={onChangeHandler}
                              name="postalCode"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    {/* <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div> */}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </form>
        </Container>
      </>
    );
  };

  export default EditProfilePartner;
