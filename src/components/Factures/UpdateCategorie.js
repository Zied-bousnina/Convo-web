
import { Card, CardHeader, CardBody, Container, Row, Col, Button } from "reactstrap";
  import UserHeader from "../Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect, useState } from "react";
  import classNames from "classnames";
  import { SET_ERRORS, SET_IS_SECCESS } from "../../Redux/types.js";
import { CreatePartner } from "Redux/actions/authActions.js";
import { createCategorie } from "Redux/actions/authActions.js";
import { Alert, AlertIcon } from "@chakra-ui/react";
import {Link} from "react-router-dom"
import { FindCategorieById } from "Redux/actions/Demandes.Actions.js";
import { useParams } from "react-router-dom";
import { UpdateCategorie1 } from "Redux/actions/Demandes.Actions.js";
  const UpdateCategorie = () => {
    const Categorie = useSelector(state=>state?.categorie?.categorie?.categorie)
    const error = useSelector(state=>state.error?.errors)
    // const error2 = useSelector(state=>state.error)
    const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    const { id } = useParams();
    // console.log(error2)
    useEffect(() => {

      dispatch(FindCategorieById(id))
    }, [ Categorie?._id])
dispatch({type:SET_IS_SECCESS, payload:false })

const showToastMessage = () => {
      toast.success('Categorie Updated successfully.', {
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
      console.log("hkjhkhlhlikhjkbhkjbl")

      e.preventDefault();




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
      console.log(form)
      console.log("Form Data", formdata)

    dispatch(UpdateCategorie1(id,formdata))



    }

    console.log(error)
    useEffect(() => {
      dispatch({
        type: SET_ERRORS,
        payload: {}})
    }, [])



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

                      <h3 className="mb-0">Modifier Catégorie</h3>
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
      <label className="form-label">Description:</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="Description libre"
          name={"description"}
          className={classNames("form-control")}
          onChange={onChangeHandler}
          // required
          defaultValue={
            Categorie?.description
          }
        />
      </div>
    </div>
  </Col>

  <Col md="6">
    <div className="mb-3">
      <label className="form-label">Prix unitaire € : </label>
      <div className="input-group">
        <input
          type="number"
          placeholder="Entrez le prix unitaire"
          name={"unitPrice"}
          className={classNames("form-control")}
          onChange={onChangeHandler}
          // required
          defaultValue={
            Categorie?.unitPrice
          }
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
          'Modifier'
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

  export default UpdateCategorie;
