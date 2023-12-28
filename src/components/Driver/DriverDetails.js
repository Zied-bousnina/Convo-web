
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col
  } from "reactstrap";
  // core components
  import UserHeader from "../../components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect, useState } from "react";
  import axios from "axios";
  import classNames from "classnames";

  import { SET_IS_SECCESS } from "../../Redux/types";
  import {Link} from "react-router-dom"
  import { FetchAllQuote } from "../../Redux/actions/QuoteAction";
  import { FetchAllBinsNotInUse } from "../../Redux/actions/BinAction";
  import { AddPointBin } from "../../Redux/actions/BinAction";
  import { useParams } from "react-router-dom";

  import Select from 'react-select';
  import makeAnimated from 'react-select/animated';
import { CreatePartner } from "Redux/actions/authActions.js";
import { GetPartnerDetailsById } from "Redux/actions/PartnershipAction.js";
import { UpdatePartnerShip } from "Redux/actions/PartnershipAction.js";
import FileInput from "components/FileInput.jsx";
import Skeleton from "react-loading-skeleton";
import { Alert, AlertIcon } from "@chakra-ui/react";

  const animatedComponents = makeAnimated();
  const DriverDetails = () => {

    const error = useSelector(state=>state.error?.errors)


  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    // const ListOfQuote= useSelector(state=>state?.quote?.quote?.quotes)
    const ListOfBinsNotInUse= useSelector(state=>state?.ListOfBinsNotInPointBin?.ListOfBinsNotInPointBin)

    const [governorates, setgovernorates] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Tunis');
    const [selectedMunicipal, setMunicipal] = useState('Tunis');
    const [selectedValues, setSelectedValues] = useState([]);
    const dispatch = useDispatch()

    const PartnerDetails = useSelector(state=>state?.partnerDetails?.partnerDetails?.partner)
  const { id } = useParams();
  useEffect(() => {
    dispatch(GetPartnerDetailsById(id))
  }, [dispatch,PartnerDetails?._id])
//   console.log(PartnerDetails)
    dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })
  // console.log(PartnerDetails)




    const showToastMessage = () => {
      toast.success('Partner Edit  successfully.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }


    useEffect(() => {
        if (isSuccess) {

          showToastMessage()
        }
      }, [isSuccess])



    const [form, setForm] = useState({})

    const onChangeHandler = (e) => {
      const { name, value } = e.target;



        setForm({
          ...form,
          [name]: value,
        });


      console.log(form);
    };






    // console.log("Params:", useParams())
    const onSubmit = (e)=>{

      e.preventDefault();
      // console.log("bins", selectedValues.value)

      console.log(form)

    dispatch(UpdatePartnerShip(id,form))

    // !error?.success ? showErrorToastMessage() : null




        // showToastMessage()
        // setSelectedBins([])
        e.target.reset();


    }







    // Handle onChange event

    // console.log("SelectedValues", selectedValues)
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          {/* <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Make request
                    </h6>
                    <h2 className="mb-0">Directions</h2>
                  </div>
                </Row>
              </CardHeader> */}
            <Col className="order-xl-1" xl="11">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                    <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                    {
      PartnerDetails ?


                    `Driver ID #${id.toString().slice(-5)}`
                    :
      <Col
      md="6"
      >
      <Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
      height={40}
      width={250}
      />
      </Col>
    }
                    </h6>
                    <h2 className="mb-0">Driver Details</h2>
                  </div>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/edit-Driver/${id}`}
                            >

                      <Button
                        // color="primary"

                        size="md"
                        >  Edit
                        <i className=" ml-2 fas fa-arrow-right" />
                      </Button>
                        </Link>
                    </Col>

                  </Row>
                </CardHeader>
                <CardBody>
                <form
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

    <ToastContainer />

<fieldset>
    <legend>Driver Information</legend>


    <Row>
    {
      PartnerDetails ?

    <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Name</label>
        <div className="input-group">

          <input type="text"
          defaultValue={PartnerDetails?.name}
           disabled
            placeholder="Enter the contact person's name"
            name={"name"}
            className={classNames("form-control")}
            // onChange={onChangeHandler}

            />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      :
      <Col
      md="6"
      >

      <Skeleton
        style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
      </Col>
    }
    {
      PartnerDetails ?
      <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">Email: <span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input
          defaultValue={PartnerDetails?.email}
          type="text"
          disabled

              placeholder="Enter the business email address"
              name={"email"} className={classNames("form-control")}


              />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      :
      <Col
      md="6"
      >

      <Skeleton
        style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
      </Col>
    }

      {/* <Col
      md="4"
      >
         <div className=" mb-3">
        <label className="form-label">Job Title</label>
        <div className="input-group">

          <input type="text"  name={"jobTitle"} className={classNames("form-control")} onChange={onChangeHandler}/>

        </div>
      </div>
      </Col> */}
    </Row>
    </fieldset>
    <hr/>
    <Alert status='info'>
    <AlertIcon />
    This is a warning alert — This feature is still in development. Some functionalities may not be available yet</Alert>
    <fieldset>
    <legend>Driving Documents</legend>

    <Row>
    <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Driver's license (Front card)<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

        <FileInput
                  id="permisConduirefrontCard"
                  name="permisConduirefrontCard"
                  // onChange={onChangeHandlerFile}
                  accept="image/png, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Driver's license (Back card)<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

        <FileInput
                  id="permisConduirebackCard"
                  name="permisConduirebackCard"
                  // onChange={onChangeHandlerFile}
                  accept="image/png, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>

      {/* <Col
      md="4"
      >
         <div className=" mb-3">
        <label className="form-label">Job Title</label>
        <div className="input-group">

          <input type="text"  name={"jobTitle"} className={classNames("form-control")} onChange={onChangeHandler}/>

        </div>
      </div>
      </Col> */}
    </Row>
    <Row>
    <Col
      md="12"
      >
         <div className=" mb-">
        <label className="form-label">Insurance certificate<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

        <FileInput
                  id="assurance"
                  name="assurance"
                  // onChange={onChangeHandlerFile}
                  accept="image/png, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>


      {/* <Col
      md="4"
      >
         <div className=" mb-3">
        <label className="form-label">Job Title</label>
        <div className="input-group">

          <input type="text"  name={"jobTitle"} className={classNames("form-control")} onChange={onChangeHandler}/>

        </div>
      </div>
      </Col> */}
    </Row>
    <Row>
    <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Identity document (Front card)<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

        <FileInput
                  id="CinfrontCard"
                  name="CinfrontCard"
                  // onChange={onChangeHandlerFile}
                  accept="image/png, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Identity document (Back card)<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

        <FileInput
                  id="CinbackCard"
                  name="CinbackCard"
                  // onChange={onChangeHandlerFile}
                  accept="image/png, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>

      {/* <Col
      md="4"
      >
         <div className=" mb-3">
        <label className="form-label">Job Title</label>
        <div className="input-group">

          <input type="text"  name={"jobTitle"} className={classNames("form-control")} onChange={onChangeHandler}/>

        </div>
      </div>
      </Col> */}
    </Row>
    <Row>
    <Col
      md="12"
      >
         <div className=" mb-">
        <label className="form-label">Proof of address<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

        <FileInput
                  id="proofOfAddress"
                  name="proofOfAddress"
                  // onChange={onChangeHandlerFile}
                  accept="image/png, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>


      {/* <Col
      md="4"
      >
         <div className=" mb-3">
        <label className="form-label">Job Title</label>
        <div className="input-group">

          <input type="text"  name={"jobTitle"} className={classNames("form-control")} onChange={onChangeHandler}/>

        </div>
      </div>
      </Col> */}

    </Row>
    <Row>
    <Col
    className="col-12"
    style={{
      // height: "60vh",
      // width: "85%",
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }}


    >
    <Link
    to={`/admin/SpecifiqueMission/${id}`}
    // target="_blank"
    // state={{ SingleDemmande : SingleDemande}}
    >
    <Button
    className="btn-icon btn-3"
    color="primary"
    type="button"

    >
    <span className="btn-inner--icon">
    <i className="ni ni-bold-right"></i>
    </span>
    <span className="btn-inner--text">Go Mission</span>
    </Button>
    </Link>

  </Col>
    </Row>

    </fieldset>


    <hr/>










    <Row>
      <Col
      md="4"
      >
         <div className=" mb-3">
         {
        <span style={{color:"red"}}>
  { error?.email?
  error?.email
  : null
  }



            </span>
          }
          <div   >
            {/* {errors}dfds */}
          </div>
      </div>
      </Col>

    </Row>






    {/* <Row>
      <Col>
      <button type="submit" className="btn btn-outline-primary">
      {isLoad ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          'Submit'
        )}

                    <i className="fa-solid fa-floppy-disk"></i>
                  </button></Col>
    </Row> */}
  </form>


                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  export default DriverDetails;
