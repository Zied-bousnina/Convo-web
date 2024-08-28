import React, { useRef, useState, useEffect } from "react";
import { Button, Container, Card, CardBody, Table, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, Input } from "reactstrap";
import ReactToPrint from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "components/Logo/logo.js"; // Assuming this is your logo component
// import { FindFactureById, PayeFactureByPartnerHorLigne } from "Redux/actions/Demandes.Actions.js";
import StripeContainer from "components/Payment/StripeContainer.js";
import Skeleton from "react-loading-skeleton";
import { SET_ERRORS, SET_IS_SECCESS, SET_SINGLE_FACTURE } from "../../../Redux/types";
import { PayeFactureByPartnerHorLigne } from "Redux/actions/userAction";
import { FindFactureById } from "Redux/actions/Demandes.Actions";
import logoBase64 from "../global/imagesBase64";

const FactureDetails = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const { id } = useParams();
    const singleFacture = useSelector(state => state?.singleFacture?.facture);
    const isLoad = useSelector(state => state?.isLoading?.isLoading);
    const [notificationModal, setNotificationModal] = useState(false);

    useEffect(() => {
        dispatch({ type: SET_SINGLE_FACTURE, payload: {} });
        dispatch(FindFactureById(id));
    }, [dispatch, id]);

    const payeeFactureHorLigne = () => {
        dispatch(PayeFactureByPartnerHorLigne(id))
            .then(res => {
                dispatch({ type: SET_SINGLE_FACTURE, payload: {} });
                dispatch(FindFactureById(id));
                showToastMessage();
            })
            .catch(error => {});
    };

    const showToastMessage = () => {
        toast.success('Success', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    };
console.log("singleFacture", singleFacture?.devis?.[0])

    return (
        <Container fluid className="p-4">
            <Card className="bg-white border-0 shadow">
                <CardBody>
                    <Row className="align-items-center mb-4">
                        <Col xs="6">
                        <img src={logoBase64} alt="Logo" width="150px" />
                            <p className="mb-0 font-weight-bold">140 bis Rue DE RENNES</p>
                            <p className="mb-0">PARIS 75006</p>
                            <p className="mb-0">Téléphone: 06 51913143</p>
                            <p className="mb-0">SIRET: 98066356100028</p>
                        </Col>
                        <Col xs="6" className="text-right">
                            <h2 className="font-weight-bold">Facture</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <div className="border p-3 mb-3">
                                <div className="bg-primary text-white p-2 font-weight-bold">FACTURER À :</div>
                                <p className="mb-0">REF DOSSIER :{singleFacture?.devis?.[0]?.mission?.immatriculation ?
                                singleFacture?.devis[0]?.mission?.immatriculation : 'N/A'}</p>

                                <p className="mb-0">{singleFacture?.facture?.partner?.email}</p>
                                <p className="mb-0">{singleFacture?.facture?.partner?.addressPartner}</p>
                                <p className="mb-0">{singleFacture?.facture?.partner?.phoneNumber}</p>
                                <p className="mb-0">{singleFacture?.facture?.partner?.siret}</p>
                            </div>
                        </Col>
                        <Col xs="6">
                            {/* <div className="border p-3 mb-3">
                                <div className="bg-primary text-white p-2 font-weight-bold">RÉF CLIENT</div>
                                <p className="mb-0">N° de commande : 160</p>
                                <p className="mb-0">DATE : 11/07/2024</p>
                                <p className="mb-0">ID CLIENT</p>
                                <p className="mb-0">Conditions: Paiement à la commande</p>
                            </div> */}
                            <div className="border p-3 mb-3">
                            <div className="bg-primary text-white p-2 font-weight-bold">RÉF CLIENT</div>
                            <p className="mb-0">N° de commande : {singleFacture?.numFacture}</p>
                            <p className="mb-0">DATE : {new Date().toLocaleString('fr-FR')}</p>
                            <p className="mb-0">ID CLIENT:#{singleFacture?.facture?.partner?._id.slice(0, 5)}
</p>
                            <p className="mb-0">Conditions: Paiement à la commande</p>
                        </div>
                        </Col>
                    </Row>
                    <Table bordered>
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>DESCRIPTION</th>
                                <th>QTE</th>
                                <th>PRIX UNITAIRE</th>
                                <th>MONTANT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {singleFacture?.devis?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.mission?.postalAddress || 'N/A'}</td>
                                    <td>1</td>
                                    <td>{item?.montant}</td>
                                    <td>{item?.montant}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="3" className="text-right">TOTAL HT</th>
                                <th className="bg-light-blue text-right">{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                  singleFacture?.facture?.totalAmmount,
          ) || '0,00'}</th>
                            </tr>
                            <tr>
                                <th colSpan="3" className="text-right">TOTAL TTC</th>
                                <th className="bg-light-blue text-right">   { new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            singleFacture?.facture?.totalAmmount * 1.20 || 0
        )}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <p className="text-center mt-5 mb-0 font-italic">Nous vous remercions de votre confiance.</p>
                    <p className="text-center">Mode de règlement : Virement bancaire (FR76 2823 3000 0168 3398 1016 122)</p>
                    <p className="text-center">Pour toute question, veuillez contacter [GAIES Rachid, 06 51 91 31 43, CARVOY7@GMAIL.COM]</p>
                    {!singleFacture?.payed && (
                        <Row>
                            <Col className="text-left">
                                <Button color="danger" onClick={() => setNotificationModal(true)}>
                                    {isLoad ? (
                                        <div className="spinner-border text-light" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                    ) : (
                                        'Payer Facture'
                                    )}
                                </Button>
                                <Modal isOpen={notificationModal}>
                                    <div className="modal-header">
                                        <h6 className="modal-title">Votre attention est requise</h6>
                                        <button
                                            aria-label="Close"
                                            className="close"
                                            type="button"
                                            onClick={() => {
                                                dispatch({ type: SET_SINGLE_FACTURE, payload: {} });
                                                dispatch(FindFactureById(id));
                                                setNotificationModal(false);
                                            }}
                                        >
                                            <span aria-hidden={true}>×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="py-3 text-center">
                                            <p className="text-black">
                                                <StripeContainer />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <Button
                                            className="text-black ml-auto"
                                            color="link"
                                            onClick={() => {
                                                dispatch({ type: SET_SINGLE_FACTURE, payload: {} });
                                                dispatch(FindFactureById(id));
                                                setNotificationModal(false);
                                            }}
                                        >
                                            Fermer
                                        </Button>
                                    </div>
                                </Modal>
                            </Col>
                        </Row>
                    )}
                    <Row className="justify-end mb-8">
                        <Col className="text-right">
                            <ReactToPrint
                                trigger={() => <Button color="primary">Télécharger le PDF</Button>}
                                content={() => componentRef.current}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <div className="hidden">
                <PrintableCard
                    ref={componentRef}
                    selectedInfo={singleFacture}
                    missions={singleFacture?.devis || []}
                />
            </div>
        </Container>
    );
};

export default FactureDetails;

const PrintableCard = React.forwardRef(({ selectedInfo, missions }, ref) => {

    const calculateTVA = (montantHT, tvaRate) => {
        const TVA = montantHT * (tvaRate / 100);
        const montantTTC = montantHT + TVA;
        return { montantHT, TVA, montantTTC };
    };

    const tvaRate = 20;

    return (
        <Card className="bg-white border-0 shadow" innerRef={ref}>
            <CardBody>
                <Row className="align-items-center mb-4">
                    <Col xs="6">
                    <img src={logoBase64} alt="Logo" width="150px" />
                        <p className="mb-0 font-weight-bold">140 bis Rue DE RENNES</p>
                        <p className="mb-0">PARIS 75006</p>
                        <p className="mb-0">Téléphone: 06 51913143</p>
                        <p className="mb-0">SIRET: 98066356100028</p>
                    </Col>
                    <Col xs="6" className="text-right">
                        <h2 className="font-weight-bold">Facture</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                    <div className="border p-3 mb-3">
                                <div className="bg-primary text-white p-2 font-weight-bold">FACTURER À :</div>
                                <p className="mb-0">REF DOSSIER :{selectedInfo?.devis?.[0]?.mission?.immatriculation ?
                                selectedInfo?.devis[0]?.mission?.immatriculation : 'N/A'}</p>

                                <p className="mb-0">{selectedInfo?.facture?.partner?.email}</p>
                                <p className="mb-0">{selectedInfo?.facture?.partner?.addressPartner}</p>
                                <p className="mb-0">{selectedInfo?.facture?.partner?.phoneNumber}</p>
                                <p className="mb-0">{selectedInfo?.facture?.partner?.siret}</p>
                            </div>
                    </Col>
                    <Col xs="6">
                        <div className="border p-3 mb-3">
                            <div className="bg-primary text-white p-2 font-weight-bold">RÉF CLIENT</div>
                            <p className="mb-0">N° de commande : {selectedInfo?.numFacture}</p>
                            <p className="mb-0">DATE : {new Date().toLocaleString('fr-FR')}</p>
                            <p className="mb-0">ID CLIENT:#{selectedInfo?.facture?.partner?._id.slice(0, 5)}</p>
                            <p className="mb-0">Conditions: Paiement à la commande</p>
                        </div>
                    </Col>
                </Row>
                <Table bordered>
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>DESCRIPTION</th>
                            <th>QTE</th>
                            <th>PRIX UNITAIRE</th>
                            <th>MONTANT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missions.map((mission, index) => (
                            <tr key={index}>
                                <td>{mission?.mission?.postalAddress || 'N/A'}</td>
                                <td>1</td>
                                <td>{mission?.montant}</td>
                                <td>{mission?.montant}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="3" className="text-right">TOTAL HT</th>
                            <th className="bg-light-blue text-right">{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            selectedInfo?.facture?.totalAmmount,
          )}</th>
          {/* { new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            selectedInfo?.totalAmmount,
          )} */}
                        </tr>
                        <tr>
                            <th colSpan="3" className="text-right">TOTAL TTC</th>
                            <th className="bg-light-blue text-right">{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            selectedInfo?.facture?.totalAmmount *1.20,
          )}</th>
                        </tr>
                    </tfoot>
                </Table>
                <p className="text-center mt-5 mb-0 font-italic">Nous vous remercions de votre confiance.</p>
                <p className="text-center">Mode de règlement : Virement bancaire (FR76 2823 3000 0168 3398 1016 122)</p>
                <p className="text-center">Pour toute question, veuillez contacter [GAIES Rachid, 06 51 91 31 43, CARVOY7@GMAIL.COM]</p>
            </CardBody>
        </Card>
    );
});
