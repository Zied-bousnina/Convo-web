
import { Card, CardHeader, CardBody, Container, Row, Col, Button } from "reactstrap";
  import UserHeader from "../../components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect, useState } from "react";
  import classNames from "classnames";
  import { SET_ERRORS, SET_IS_SECCESS } from "../../Redux/types";
import { CreatePartner } from "Redux/actions/authActions.js";
import { createCategorie } from "Redux/actions/authActions.js";
import { Alert, AlertIcon } from "@chakra-ui/react";
import {Link} from "react-router-dom"
  const AddCategorie = () => {

    const error = useSelector(state=>state.error?.errors)
    const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch({
        type: SET_ERRORS,
        payload: {}})
    }, [])
dispatch({type:SET_IS_SECCESS, payload:false })

const showToastMessage = () => {
      toast.success('Categorie created successfully.', {
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

    const onSubmit = (e)=>{

      e.preventDefault();


      if(
        !form?.description ||
        !form?.unitPrice
      ){
        showToastMessage()
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


    dispatch(createCategorie(formdata))



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

                      <h3 className="mb-0">Ajouter Catégorie</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/ListCategorie`}
                            >

                      <Button
                        // color="primary"

                        size="md"
                        >  Liste des Catégories
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
    <Col md="6">
    <div className="mb-3">
      <label className="form-label">Description<span style={{color:"red"}}>*</span> :</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="Description libre"
          name={"description"}
          className={classNames("form-control")}
          onChange={onChangeHandler}
          required
        />
      </div>
    </div>
  </Col>

  <Col md="6">
    <div className="mb-3">
      <label className="form-label">Prix unitaire<span style={{color:"red"}}>*</span> € : </label>
      <div className="input-group">
        <input
          type="number"
          placeholder="Entrez le prix unitaire"
          name={"unitPrice"}
          className={classNames("form-control")}
          onChange={onChangeHandler}
          required
        />
      </div>
    </div>
  </Col>
</Row>











    <Row>
      <Col
      md="12"
      >
         <div className=" mb-3">

        {/* <span style={{color:"red"}}> */}
  { error?.description?
            <Alert status='error'>
    <AlertIcon />
  {error?.description}
    </Alert>
  : null
  }

  { error?.unitPrice?
    <Alert status='error'>

    <AlertIcon />
  {error?.unitPrice}
    </Alert>
  : null
  }
  { error?.message?
    <Alert status='error'>

    <AlertIcon />
  {error?.message}
    </Alert>
  : null
  }

            {/* </span> */}


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

  export default AddCategorie;
