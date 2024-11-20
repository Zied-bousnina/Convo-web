import './BillingInformation.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardHeader, CardBody, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './BillingInformation.css';
import { getUserInformationById, UpdateUserInformationById } from 'Redux/actions/Demandes.Actions';

const BillingForm = ({ id }) => {
  const [isloadBillingInformation, setisloadBillingInformation] = useState(false);
  const [userInformation, setuserInformation] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [editing, setEditing] = useState(false);
  const [isload, setisload] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setisloadBillingInformation(true);
    dispatch(getUserInformationById(id))
      .then(data => {
        console.log("data", data);
        setuserInformation({
          name: data.user.name,
          address: data.user.addressPartner,
          email: data.user.email,
          phone: data.user.phoneNumber,
          vat: data.user.VAT
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setisloadBillingInformation(false);
      });
  }, [dispatch, id]);

  useEffect(() => {
    setBillingInfo(userInformation);
  }, [userInformation]);

  const handleEditToggle = () => setEditing(!editing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisload(true);
    dispatch(UpdateUserInformationById( billingInfo))
      .then(() => {
        setEditing(false);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setisload(false);
      });
  };

  return (
    <Col xl="12" className="mb-4">
        <CardHeader className="bg-transparent py-3">
     <h5 className="mb-0 custom-title">Facturation et commentaire</h5>
   </CardHeader>
      <CardBody>
        {!editing ? (
          isloadBillingInformation ? (
            <div className="spinner-border text-primary" role="status">
              {/* <span className="visually-hidden">Loading...</span> */}
            </div>
          ) : (
            <div className="billing-info-section mb-4 p-3" onClick={handleEditToggle}>
              <h6 className="text-uppercase text-muted mb-4">Informations de facturation (Cliquer pour changer)</h6>
              <p className="mb-1 small">{billingInfo?.name}</p>
              <p className="mb-1 small">{billingInfo?.address}</p>
              <p className="mb-1 small">{billingInfo?.email}</p>
              <p className="mb-1 small">{billingInfo?.phone}</p>
              <p className="mb-1 small">{billingInfo?.vat}</p>
            </div>
          )
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nom</Label>
              <Input type="text" name="name" id="name" value={billingInfo.name || ''} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="address">Adresse</Label>
              <Input type="text" name="address" id="address" value={billingInfo.address || ''} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" value={billingInfo.email || ''} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Téléphone</Label>
              <Input type="tel" name="phone" id="phone" value={billingInfo.phone || ''} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="vat">TVA</Label>
              <Input type="text" name="vat" id="vat" value={billingInfo.vat || ''} onChange={handleInputChange} />
            </FormGroup>
            <Button color="primary" disabled={isload}>
              {isload ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden"></span>
                </div>
              ) : (
                'Sauvegarder'
              )}
            </Button>
          </Form>
        )}
      </CardBody>
    </Col>
  );
};

export default BillingForm;
