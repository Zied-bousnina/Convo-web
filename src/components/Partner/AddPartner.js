
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

import MaskedInput from 'react-text-mask'
import { siretMask, sirenMask } from 'text-mask-siret';
import FileInput from "components/FileInput.jsx";
  const animatedComponents = makeAnimated();
  const AddPartner = () => {

    const error = useSelector(state=>state.error?.errors)


    const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    const ListOfQuote= useSelector(state=>state?.quote?.quote?.quotes)
    const ListOfBinsNotInUse= useSelector(state=>state?.ListOfBinsNotInPointBin?.ListOfBinsNotInPointBin)

    const [governorates, setgovernorates] = useState([]);
    const [selectedValue, setSelectedValue] = useState('Tunis');
    const [selectedMunicipal, setMunicipal] = useState('Tunis');
    const [selectedValues, setSelectedValues] = useState([]);
    const [form, setForm] = useState({})
    const mask = siretMask;
    const onChangeHandlerFile = (e) => {
      const { name, checked, value } = e.target;


      setForm({
        ...form,
        kbis: e.target.files[0],
      });
    };

    const dispatch = useDispatch()

    dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })




    const showToastMessage = () => {
      toast.success('Partner created successfully.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }
    const showToastMessage1 = () => {
      toast.error('K-bis is required', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }


    useEffect(() => {
        if (isSuccess) {

          showToastMessage()
        }
      }, [isSuccess])




    const onChangeHandler = (e) => {
      const { name, value } = e.target;



        setForm({
          ...form,
          [name]: value,
        });



    };


    useEffect(() => {
      dispatch(FetchAllBinsNotInUse())

    }, [ListOfBinsNotInUse])



    const { idQuote } = useParams();

    const onSubmit = (e)=>{

      e.preventDefault();



      if(
        form.name === undefined ||
        form.contactName === undefined ||
        form.addressPartner === undefined ||
        form.email === undefined ||
        form.phoneNumber === undefined ||
        form.siret === undefined ||
        form.kbis === undefined
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


    dispatch(CreatePartner(formdata))

    // !error?.success ? showErrorToastMessage() : null




        // showToastMessage()
        // setSelectedBins([])
        // e.target.reset();


    }




    useEffect(() => {
      axios
        .get(`https://xgenboxv2.onrender.com/api/governorates`)
        .then(res => {
          setgovernorates(res.data[0]);
        })
        .catch(err =>{});
    }, []);



    const colourOptions = []

    ListOfBinsNotInUse?.map(e=>{
      colourOptions.push({value:e._id, label:e.type})

    })



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

                      <h3 className="mb-0">Créer un partenaire</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/PartnerList`}
                            >

                      <Button
                        // color="primary"

                        size="md"
                        >  Liste des partenaires
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
    <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">Nom de l'entreprise: <span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input type="text" required placeholder="Entrez le nom de l'entreprise"  name={"name"} className={classNames("form-control")} onChange={onChangeHandler} />
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
        <label className="form-label">Contact Person: <span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input type="text" required placeholder="Entrez le nom de la personne de contact" name={"contactName"} className={classNames("form-control")} onChange={onChangeHandler} />
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
      md="12"
      >
         <div className=" mb-3">
        <label className="form-label">Adresse: <span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input type="text" required placeholder="Entrez l'adresse de l'entreprise"  name={"addressPartner"} className={classNames("form-control")} onChange={onChangeHandler} />
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
         <div className=" mb-3">
        <label className="form-label">Email: <span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input type="text" required   placeholder="Entrez l'adresse e-mail de l'entreprise" name={"email"} className={classNames("form-control")} onChange={onChangeHandler}/>
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
        <label className="form-label">Numéro de téléphone:<span style={{color:"red"}}>*</span></label>
        <div className="input-group">

          <input type="text" required  placeholder="Entrez le numéro de téléphone de l'entreprise"  name={"phoneNumber"} className={classNames("form-control")} onChange={onChangeHandler}/>
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

    <hr/>
    <Row>
    <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">Siret <span style={{color:"red"}}>*</span></label>
        <div className="input-group">
        <MaskedInput

        mask={mask}
        placeholder="Entrez le numéro SIRET de l'entreprise"
        name={"siret"}
        className={classNames("form-control")}
        onChange={onChangeHandler}

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
         <div className=" mb-3">
        <label className="form-label"> K-Bis <span style={{color:"red"}}>*</span></label>
        <div className="input-group">
        <FileInput
                  id="kbis"
                  name="kbis"
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

    </Row>










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

  { error?.siret?
  error?.siret
  : null
  }
  { error?.phoneNumber?
  error?.phoneNumber
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
          'Valider'
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

  export default AddPartner;
