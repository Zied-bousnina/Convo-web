
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
import { FindAllCategories } from "Redux/actions/Demandes.Actions.js";
import { useParams } from "react-router-dom";
import { FindCategorieById } from "Redux/actions/Demandes.Actions.js";
import Skeleton from "react-loading-skeleton";
  const CategorieDetails = () => {

    const error = useSelector(state=>state.error?.errors)
    const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    const Categorie = useSelector(state=>state?.categorie?.categorie?.categorie)
    const { id } = useParams();

dispatch({type:SET_IS_SECCESS, payload:false })

useEffect(() => {

    dispatch(FindCategorieById(id))
  }, [ Categorie?._id])
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
      console.log(form)
      console.log("Form Data", formdata)

    dispatch(createCategorie(formdata))



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

                      <h3 className="mb-0"> Catégorie details</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/updateCategorie/${id}`}
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
    {
        Categorie?.description ?


    <div className="mb-3">
      <label className="form-label">Description<span style={{color:"red"}}>*</span> :</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="Description libre"
          name={"description"}
          className={classNames("form-control")}
          onChange={onChangeHandler}
        //   required
        value={Categorie.description}
        disabled
        />
      </div>
    </div>
    :
    <Skeleton
    height={40}
    // count={1}
    style={{marginBottom: 6}}
    width={400}
    />
    }
  </Col>

  <Col md="6">
  {
        Categorie?.unitPrice ?

    <div className="mb-3">
      <label className="form-label">Prix unitaire<span style={{color:"red"}}>*</span> € : </label>
      <div className="input-group">
        <input
          type="number"
          placeholder="Entrez le prix unitaire"
          name={"unitPrice"}
          className={classNames("form-control")}
          onChange={onChangeHandler}

          disabled
            value={Categorie?.unitPrice}
        />
      </div>
    </div>
    :
    <Skeleton
    height={40}
    // count={1}
    style={{marginBottom: 6}}
    width={400}
    />
    }
  </Col>
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

  export default CategorieDetails;
