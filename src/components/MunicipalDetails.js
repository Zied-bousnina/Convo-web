
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,

  Container,
  Row,
  Col,
  CardTitle,

  Modal
} from "reactstrap";
// core components

import { useDispatch, useSelector } from "react-redux";

import UserDetailsHeader from "./Headers/UserDetailsHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { GetPMunicipalDetailsById } from "Redux/actions/MunicipalRequest.Action";
import { UpadeteRequest } from "Redux/actions/MunicipalRequest.Action";


const MunicipalDetails = () => {

  const userDetails = useSelector(state=>state?.UsersDetails?.UsersDetails)

  const MunicipalDetails = useSelector(state=>state?.MunicipalDetails?.MunicipalDetails)

  const [notificationModal, setnotificationModal] = useState(false)
  const { id } = useParams();
  // console.log(MunicipalDetails)

  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const isSuccess = useSelector(state=>state?.success?.success)
  const dispatch = useDispatch()

  const showToastMessage = () => {
    toast.success('Request sent successfully.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
  }
  useEffect(() => {
   dispatch(GetPMunicipalDetailsById(id))
  }, [MunicipalDetails])
  useEffect(() => {
    if (isSuccess) {

      showToastMessage()
    }
  }, [isSuccess])



  const handleRequest = async (status)=> {
    dispatch(UpadeteRequest({status, id}))
  }
  return (
    <>
    <UserDetailsHeader />
    {/* Page content */}
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile shadow">
            <Row className="justify-content-center">

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
                <h4>

                {/* Company Name :{QuoteDetails?.companyName} */}
                </h4>
            </CardHeader>
            <CardBody className="pt-0 pt-md-4">

              <div className="text-center mt-md-5">
                <h3>
                {/* {PartnerDetails?.partnership?.name} */}
                  {/* <span className="font-weight-light">, 27</span> */}
                </h3>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  {/* {QuoteDetails?.country}, {QuoteDetails?.city} */}
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
                  {/* {userDetails?.profile?.[0]?.Bio} */}
                </p>
                <Row>

      <div style={{ width: "18rem" }}>
        <Card className="card-stats mb-4 mb-lg-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle className="text-uppercase text-muted mb-0">
                  Telephone number
                </CardTitle>
                <span className="h2 font-weight-bold mb-0"> {MunicipalDetails?.tel}</span>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <i className="fas fa-chart-bar" />
                </div>
              </Col>
            </Row>
            <ToastContainer />
            <Modal
            className="modal-dialog-centered modal-danger"
            contentClassName="bg-gradient-danger"
            isOpen={notificationModal}
            // toggle={() => this.toggleModal("notificationModal")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-notification">
                Your attention is required
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => setnotificationModal(false)}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="py-3 text-center">
                <i className="ni ni-bell-55 ni-3x" />
                <h4 className="heading mt-4">You should read this!</h4>
                <p>
                  When you click on "Ok , Got it" <big className="text-title">{userDetails?.users?.name}</big> will be deleted
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <Button className="btn-white" color="default" type="button"
              // onClick={()=>PutRequest("denied", request?._id)}
              >
                Ok, Got it
              </Button>
              <Button
                className="text-white ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={() => setnotificationModal(false)}
              >
                Close
              </Button>
            </div>
          </Modal>

          </CardBody>
        </Card>
      </div>

      </Row>
      <Row>
      <div style={{ width: "18rem" }}>
        <Card className="card-stats mb-4 mb-lg-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle className="text-uppercase text-muted mb-0">
                  Location
                </CardTitle>
                <span className="h2 font-weight-bold mb-0"> {MunicipalDetails?.governorat} / {MunicipalDetails?.municipal} </span>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <i className="fas fa-chart-bar" />
                </div>
              </Col>
            </Row>

          </CardBody>
        </Card>
      </div>

      </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Municipal Details</h3>
                </Col>
                <Col className="text-right" xs="4">
                  {
                    MunicipalDetails?.status !=='valid' && (


                  <Button
                    color={`success`}
                    // href="#pablo"
                    onClick={(e) => handleRequest("valid") }
                    size="sm"
                  >
                    {isLoad ? (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden"></span>
      </div>
    ) : (

      "Accept"
    )}
                  </Button>
  )
}
{
    MunicipalDetails?.status !=='denied' && (


                  <Button
                    color={ "danger"}
                    // href="#pablo"
                    onClick={(e) =>  handleRequest("denied") }
                    size="sm"
                  >
                    {isLoad ? (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden"></span>
      </div>
    ) : (

      "deny"
    )}
                  </Button>
                     )
                    }
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  Municipal information
                </h6>
                <div className="pl-lg-4">
                  <Row>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Email address
                        </label>
                        {/* <Input
                        // readOnly
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="jesse@example.com"
                          defaultValue={userDetails?.users?.email}
                          type="email"
                        /> */}
                        <div>

                        <small>{MunicipalDetails?.user?.email}</small>
                        </div>

                      </FormGroup>
                    </Col>
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
                        // readOnly
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
                        // readOnly
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
                   {/* information */}
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Postal code
                        </label>
                        {/* <Input
                        // readOnly
                          className="form-control-alternative"
                          defaultValue={userDetails?.profile?.[0]?.address}
                          id="input-address"
                          placeholder="Home Address"
                          type="text"
                        /> */}
                        <div>
                          <small>{MunicipalDetails?.postalCode}</small>
                        </div>
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
                          Description
                        </label>
                        {/* <Input
                        // readOnly
                          className="form-control-alternative"
                          defaultValue={userDetails?.profile?.[0]?.city}
                          id="input-city"
                          placeholder="City"
                          type="text"
                        /> */}
                        <div>
                          <small>{MunicipalDetails?.description}</small>
                        </div>
                      </FormGroup>
                    </Col>

                  </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                {/* <h6 className="heading-small text-muted mb-4">
                  Contact information
                </h6> */}

                <hr className="my-4" />

                {/* Description */}
                {/* <h6 className="heading-small text-muted mb-4">About me</h6>
                <div className="pl-lg-4">
                  <FormGroup>
                    <label>About Me</label>
                    <Input
                    // readOnly
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
    </Container>
  </>
  );
};

export default MunicipalDetails;
