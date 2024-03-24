
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
  import { useParams } from "react-router-dom";

  import Select from 'react-select';
  import makeAnimated from 'react-select/animated';
import { CreatePartner } from "Redux/actions/authActions.js";
import { GetPartnerDetailsById } from "Redux/actions/PartnershipAction.js";
import { UpdatePartnerShip } from "Redux/actions/PartnershipAction.js";
import { UpdateDriver } from "Redux/actions/Driver.actions.js";
import Skeleton from "react-loading-skeleton";

  const animatedComponents = makeAnimated();
  const EditDriver = () => {

    const error = useSelector(state=>state.error?.errors)


  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    // const ListOfQuote= useSelector(state=>state?.quote?.quote?.quotes)


    const dispatch = useDispatch()

    const PartnerDetails = useSelector(state=>state?.partnerDetails?.partnerDetails?.partner)
  const { id } = useParams();
  useEffect(() => {
    dispatch(GetPartnerDetailsById(id))
  }, [dispatch,PartnerDetails?._id])

    dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })




    const showToastMessage = () => {
      toast.success('Driver Edit  successfully.', {
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



    };








    const onSubmit = (e)=>{

      e.preventDefault();




    dispatch(UpdateDriver(id,form))

    // !error?.success ? showErrorToastMessage() : null




        // showToastMessage()
        e.target.reset();


    }








    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>

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
                    <h2 className="mb-0">Edit a Driver</h2>
                  </div>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/DriverList`}
                            >

                      <Button
                        // color="primary"

                        size="md"
                        >  List of Driver
                        <i className=" ml-2 fas fa-arrow-right" />
                      </Button>
                        </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
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

    <ToastContainer />

    <Row>
    {
      PartnerDetails ?


      <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Name<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input type="text" required defaultValue={PartnerDetails?.name}  placeholder="Enter the contact person's name"   name={"name"} className={classNames("form-control")} onChange={onChangeHandler}/>
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
      height={40}
      width={250}
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

          <input type="text" required defaultValue={PartnerDetails?.email}   placeholder="Enter the business email address" name={"email"} className={classNames("form-control")} onChange={onChangeHandler}/>
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
      height={40}
      width={250}
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

    <hr/>










    <Row>
      <Col
      md="4"
      >
         <div className=" mb-3">
        {
            !error?.success && (<span style={{color:"red"}}>
  {error?.success ? "" : error?.error}
            </span>)
          }
          <div   >
            {/* {errors}dfds */}
          </div>
      </div>
      </Col>

    </Row>






    <Row>
    {
      PartnerDetails ?

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
    </Row>
  </form>


                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  export default EditDriver;
