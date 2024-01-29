
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Modal
  } from "reactstrap";
  // core components
  import UserHeader from "../../components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect, useState } from "react";
  import axios from "axios";
  import classNames from "classnames";

  import { SET_ERRORS, SET_IS_LOADING, SET_IS_SECCESS } from "../../Redux/types";
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
import { activateDriverAccount } from "Redux/actions/Driver.actions.js";
import { RefusAccount } from "Redux/actions/Driver.actions.js";

  const animatedComponents = makeAnimated();
  const DriverDetails = () => {
    const [notificationModal, setnotificationModal] = useState(false)
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
    const Ducuments = useSelector(state=>state?.partnerDetails?.partnerDetails?.documents)
  const { id } = useParams();
  useEffect(() => {
    dispatch(GetPartnerDetailsById(id))
  }, [dispatch,PartnerDetails?._id, Ducuments?._id])

    dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })






    const showToastMessage = () => {
      toast.success('Compte modifié avec succès', {
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


    dispatch(RefusAccount(id,form))
    .then(res => {

        dispatch({
          type: SET_ERRORS,
          payload: []
      })
      dispatch({
          type:SET_IS_LOADING,
          payload:false
      })

      dispatch({
        type:SET_IS_SECCESS,
        payload:true
    })
    setnotificationModal(false)


      dispatch({
        type:SET_IS_SECCESS,
        payload:false
    })


  })
  .catch(err =>{
    dispatch({
      type: SET_ERRORS,
      payload: err?.response?.data
  })
  dispatch({
    type:SET_IS_LOADING,
    payload:false
})
setnotificationModal(false)
  dispatch({
    type:SET_IS_SECCESS,
    payload:false
})
  })


    // !error?.success ? showErrorToastMessage() : null

    // console.log(form, id)




        // showToastMessage()
        // setSelectedBins([])
        e.target.reset();


    }







    // Handle onChange event


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
                    <h2 className="mb-0">Détails du conducteur</h2>
                  </div>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/edit-Driver/${id}`}
                            >

                      <Button
                        // color="primary"

                        size="md"
                        >  Modifier
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

    <Row>

    <Col className="text-right" xs="6">
    <Row>


                    <Link
                            // to={`/admin/ListCategorie`}
                            >

<Button
                      color={`${ "success" }`}
                      // href="#pablo"
                      onClick={(e) => dispatch(activateDriverAccount(id)) }
                      size="xl"
                      style={{
                        marginRight:"20px"
                      }}
                    >
                      {isLoad ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      ) : (

           "Activer le compte"
      )}
                    </Button>
                        </Link>
                        <Link
                            // to={`/admin/ListCategorie`}
                            >

<Button
                      color={`${"danger"}`}
                      // href="#pablo"
                      // onClick={(e) => dispatch(PayeeFactureDriver(id, navigate)) }
                      size="xl"
                      disabled={isLoad}
                      onClick={()=>{
                        console.log("clickced")
                        setnotificationModal(true)}}
                    >
                      {isLoad ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      ) : (

        "Refuser le document"
      )}
                    </Button>
                        </Link>
                        </Row>
                    </Col>

    </Row>
    <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={notificationModal}

            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                Votre attention est requise
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
                  <h4 className="heading mt-4">Tu devrais lire ceci !</h4>
                  <p>
                  Lorsque vous cliquez sur 'Ok', le compte du conducteur est désactivé
                     {/* {selectedItem} */}
                  </p>
                </div>
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
    <Col
      md="12"
      >
         <div className=" mb-">
        <label className="form-label">Raison :</label>
        <div className="input-group">

          <input type="text"   placeholder="Entrez la raison du refus du compte (optionnel)"  name={"raisonRefus"} className={classNames("form-control")} onChange={onChangeHandler}/>
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
    <Row
    className="mt-4"
    >
      <Col
      md="12"
      >
       <Button className="btn-white" color="default" type="submit"

                >
                  {isLoad ? (
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden"></span>
    </div>
  )
                  :
                  "Ok"
                  }

                </Button>
      </Col>
    </Row>
  </form>
              </div>


              <div className="modal-footer">

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
<fieldset>
    <legend>Informations sur le conducteur</legend>


    <Row>
    {
      PartnerDetails ?

    <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Nom</label>
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
        <label className="form-label">Email: </label>
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
    {/* <Alert status='info'>
    <AlertIcon />
    This is a warning alert — This feature is still in development. Some functionalities may not be available yet</Alert> */}
    <fieldset>
    <legend>Documents du conducteur</legend>

    <Row>
    <Col
      md="12"
      >
         <div className=" mb-3">
        <label className="form-label"> K-Bis </label>
        <div className="input-group">
        <input type="text"
          readOnly
          onClick={()=> {

            if (Ducuments[0]?.kbis) {
      window.open(Ducuments[0]?.kbis, '_blank');
    }
          }}
          placeholder="Cliquez pour ouvrir le fichier"  className={classNames("form-control")}  />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
    </Row>
    <Row>
    <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Permis de conduire (Carte avant)</label>
        <div className="input-group">

        <input type="text"
          readOnly
          onClick={()=> {

            if (Ducuments[0]?.permisConduirefrontCard) {
      window.open(Ducuments[0]?.permisConduirefrontCard, '_blank');
    }
          }}
          placeholder="Cliquez pour ouvrir le fichier"  className={classNames("form-control")}  />
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
        <label className="form-label">Permis de conduire (Carte arrière)</label>
        <div className="input-group">

        <input type="text"
          readOnly
          onClick={()=> {

            if (Ducuments[0]?.permisConduirebackCard) {
      window.open(Ducuments[0]?.permisConduirebackCard, '_blank');
    }
          }}
          placeholder="Cliquez pour ouvrir le fichier"  className={classNames("form-control")}  />
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
        <label className="form-label">Certificat d'assurance</label>
        <div className="input-group">

        <input type="text"
          readOnly
          onClick={()=> {

            if (Ducuments[0]?.assurance) {
      window.open(Ducuments[0]?.assurance, '_blank');
    }
          }}
          placeholder="Cliquez pour ouvrir le fichier"  className={classNames("form-control")}  />
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
        <label className="form-label">Document d'identité (Carte avant)</label>
        <div className="input-group">

        <input type="text"
          readOnly
          onClick={()=> {

            if (Ducuments[0]?.CinfrontCard) {
      window.open(Ducuments[0]?.CinfrontCard, '_blank');
    }
          }}
          placeholder="Cliquez pour ouvrir le fichier"  className={classNames("form-control")}  />
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
        <label className="form-label">Document d'identité (Carte arrière)</label>
        <div className="input-group">

        <input type="text"
          readOnly
          onClick={()=> {

            if (Ducuments[0]?.CinbackCard) {
      window.open(Ducuments[0]?.CinbackCard, '_blank');
    }
          }}
          placeholder="Cliquez pour ouvrir le fichier"  className={classNames("form-control")}  />
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
        <label className="form-label">Justificatif de domicile</label>
        <div className="input-group">

        <input type="text"
          readOnly
          onClick={()=> {

            if (Ducuments[0]?.proofOfAddress) {
      window.open(Ducuments[0]?.proofOfAddress, '_blank');
    }
          }}
          placeholder="Cliquez pour ouvrir le fichier"  className={classNames("form-control")}  />
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
    <span className="btn-inner--text">Mission en cours</span>
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
