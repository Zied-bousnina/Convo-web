
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

import { CreatePartner } from "Redux/actions/authActions.js";
import { CreateDriver } from "Redux/actions/Driver.actions.js";
import FileInput from "components/FileInput.jsx";


  const AddDriver = () => {

    const error = useSelector(state=>state.error?.errors)


  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    const dispatch = useDispatch()
    const onChangeHandlerFile = (e) => {
      const { name, files } = e.target;

      setForm({
        ...form,
        [name]: files[0],
      });
    };


    dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })




    const showToastMessage = () => {
      toast.success('Driver created successfully.', {
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






    const { idQuote } = useParams();
    // console.log("Params:", useParams())
    const onSubmit = (e)=>{

      e.preventDefault();
      // console.log("bins", selectedValues.value)
      console.log(form)

      if(

        form.permisConduirefrontCard=== undefined ||
        form.permisConduirebackCard=== undefined ||
        form.assurance=== undefined ||
        form.CinfrontCard=== undefined ||
        form.CinbackCard === undefined||
        form.proofOfAddress=== undefined
      ){
        showToastMessage1()
        return
      }
      const formdata = new FormData();

      Object.keys(form).forEach((key) => {
        if (Array.isArray(form[key])) {
          form[key].forEach((value) => {
            formdata.append(key, value);
          });
        } else {
          formdata.append(key, form[key]);
        }
      });
      console.log("Form Data", formdata)

    dispatch(CreateDriver(formdata))

    // !error?.success ? showErrorToastMessage() : null




        // showToastMessage()
        // setSelectedBins([])
        e.target.reset();


    }
    const showToastMessage1 = () => {
      toast.error('Please add all Document', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }









    // Handle onChange event

    // console.log("SelectedValues", selectedValues)
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

                      <h3 className="mb-0">Create a Driver</h3>
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

<fieldset>
    <legend>Driver Information</legend>


    <Row>
    <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Name<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input type="text" required  placeholder="Enter the contact person's name"  name={"name"} className={classNames("form-control")} onChange={onChangeHandler}/>
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
         <div className=" mb-3">
        <label className="form-label">Email: <span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input type="text" required   placeholder="Enter the business email address" name={"email"} className={classNames("form-control")} onChange={onChangeHandler}/>
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
    </fieldset>
    <hr/>
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
                  onChange={onChangeHandlerFile}
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
                  onChange={onChangeHandlerFile}
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
                  onChange={onChangeHandlerFile}
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
                  onChange={onChangeHandlerFile}
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
                  onChange={onChangeHandlerFile}
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
                  onChange={onChangeHandlerFile}
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






    <Row>
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

  export default AddDriver;
