
import { Card, CardHeader, CardBody, Container, Row, Col, Button } from "reactstrap";
  import UserHeader from "../../components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import React, { useEffect, useRef, useState } from "react";
  import classNames from "classnames";
  import { SET_ERRORS, SET_IS_SECCESS, SET_SINGLE_DEMANDE } from "../../Redux/types";
import { CreatePartner } from "Redux/actions/authActions.js";
import { createCategorie } from "Redux/actions/authActions.js";
import { Alert, AlertIcon } from "@chakra-ui/react";
import {Link} from "react-router-dom"
import { FindRequestDemandeByPartner } from "Redux/actions/Demandes.Actions";
import Select from 'react-select'
import Datetime from 'react-datetime';
import { FindRequestDemandeByPartnerV2 } from "Redux/actions/Demandes.Actions";
import Skeleton from "react-loading-skeleton";
import { FindDevisByPartnerId } from "Redux/actions/Demandes.Actions.js";
import { Column } from "primereact/column";
import { Button as Btn} from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { useHistory } from 'react-router-dom';
import { createFacture } from "Redux/actions/Demandes.Actions.js";
import { useParams } from "react-router-dom";
import { FindFacturesDetailsById } from "Redux/actions/Demandes.Actions.js";
import { PayeeFacture } from "Redux/actions/Demandes.Actions.js";
  const FactureDEtails = () => {
    const navigate = useHistory();
    const requestsByPartner = useSelector(state=>state?.partnersMissions?.demandes?.demands)
    const factureDEtails = useSelector(state=>state?.factureDetailsAdmin?.FactureDetails)
    const error = useSelector(state=>state.error?.errors)
    const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    const [form, setForm] = useState({})
    const [selectedValues, setSelectedValues] = useState();
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const {id}= useParams()

    useEffect(() => {
        dispatch(FindFacturesDetailsById(id))


    }, [factureDEtails?._id])


    const  getCurrentDateISOString=()=> {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        return `${formattedDate}T00:00:00.000Z`;
      }
      const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });

      const [dialogVisible, setDialogVisible] = useState(false);
    const [valueDe, setValueDe]= useState(getCurrentDateISOString)
    const [valueA, setValueA]= useState(getCurrentDateISOString)
    const dispatch = useDispatch()
    const [resData, setresData] = useState()
    const requestsByPartnerV2 = useSelector(state=>state?.MissionByPartnerV2?.demandes)
    const devisByPartnerId = useSelector(state=>state?.specifiqueDevis?.demande)
    const [partnerdetails, setpartnerdetails] = useState()
    const dt = useRef(null);
    const colourOptions = []


    useEffect(() => {
        dispatch({
          type: SET_SINGLE_DEMANDE,
          payload: {},
        });


        // dispatch(FindRequestDemande())
        dispatch(FindRequestDemandeByPartner())
        dispatch(FindRequestDemandeByPartnerV2())
        dispatch(FindDevisByPartnerId(factureDEtails?.partner?._id,
            {
                fromDate:factureDEtails?.from,
                toDate:factureDEtails?.to
            }
            ))

      }, [ ,requestsByPartnerV2?.length,factureDEtails?.from,factureDEtails?.to,factureDEtails?.partner?._id])

      requestsByPartnerV2?.map(e=>{
        colourOptions.push({value:e?.partner._id, label:`${e?.partner?.contactName}|[${e?.partner?.email}]`
      })
    })
    const [selectedStatus, setselectedStatus] = useState()
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
      dispatch({
        type: SET_ERRORS,
        payload: {}})
    }, [])
dispatch({type:SET_IS_SECCESS, payload:false })

const showToastMessage = () => {
      toast.error('Invalid Date.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }
useEffect(() => {
        if (isSuccess) {
          showToastMessage()
        }
      }, [isSuccess])
      const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
      };
      const exportPdf = (res) => {
        import('jspdf').then((jsPDF) => {
          import('jspdf-autotable').then(() => {
            const doc = new jsPDF.default(0, 0);
            const cols = [
              // { field: '_id', header: 'ID' },
              { field: 'montant', header: 'Montant HT' },


              // { field: 'distance', header: 'Distance (km)' },
              { field: 'createdAt', header: 'Créé le' },
              { field: 'TVA', header: 'TVA' },
              { field: 'MontantTTC', header: 'Montant TTC' },
              // { field: 'postalAddress', header: 'Starting point' },
              // { field: 'postalDestination', header: 'Destination' },
              // { field: 'status', header: 'Statut' }, // New status column
              // Add other columns as needed
            ];

            const exportColumns1 = cols.map((col) => ({
              title: col.header,
              dataKey: col.field,
              styles: {
                fillColor: col.field === 'status' ? [211, 211, 211] : null, // Set background color for the status column
              },
              columnWidth: col.field === '_id' ? 30 : 'auto', // Adjust column width for _id field
              cell: (cell) => col.field == 'montant' ? { content: Number(cell.raw).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'}) } : cell.raw, // Apply .toString().slice(-5) for _id field // Apply .toString().slice(-5) for _id field
            }));

            const title = 'Liste des missions';
            const exportDate = new Date().toLocaleString('fr-FR');

            // Add Info carvoy (info.categorie) in the top left

            const allMissions = devisByPartnerId.map(e=> {
              return {...e, ...e.mission,
                montant:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                  e?.montant,
                  ),
                createdAt:new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }
                ).format(new Date(e?.createdAt)),
                distance:
                `~${Math.floor(e?.mission?.distance )}km`,
                TVA:`${tvaRate}%`,
                MontantTTC:
                `${
                  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                  calculateTVA(Number(e?.montant), tvaRate).montantTTC,
                  )
                }`,



              }

            })

            var textToAdd = `Infos Carvoy\n${devisByPartnerId
              .map((item) => {
                return `Mission: ${item?.mission?.postalAddress} \n Montant: ${Number(item?.montant).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})} \n Distance: ${Math.floor(item?.mission?.distance)} km \n Créé le: ${new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }
                ).format(new Date(item?.createdAt))} \n\n`;
              })
              .join('')}`;
            // doc.text(textToAdd, 14, 100);

            // doc.text(`Info carvoy: ${devisByPartnerId?.categorie?.description}`, 14, 20);

            // Add _id in the top right

            doc.text(`N°: #${res?.numFacture ?
              res?.numFacture : ''

            }`, doc.internal.pageSize.width - 40, 18);

            // Add partenaire information below
            doc.line(4,
              20,
              doc.internal.pageSize.width - 4,
              20

              )
              doc.text(`De ${res?.from} À ${res?.to} `, 14, 30) ;
              doc.text(`MONTANT TOTAL : ${ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                res?.totalAmmount,
              )}  `, 14, 18) ;

            // doc.text(`Partenaire: ${factureDEtails.partner?.contactName}`, 14, 30) ;
            // doc.text(`Adresse: ${factureDEtails.partner?.addressPartner}`, 14, 40) ;
            // doc.text(`N° SIRET: ${factureDEtails.partner?.siret}`, 14, 50) ;
            let yCoordinate = 45; // Initial y-coordinate

            // Function to check if there's enough space on the page for the next line
            function hasEnoughSpaceForNextLine(yCoordinate, lineHeight, pageHeight) {
                return yCoordinate + lineHeight < pageHeight;
            }

            // Example text with labels
            const partnerLabel = "Partn:";
            const adresseLabel = "Addr:";
            const siretLabel = "SIRET:";

            // Example partner details
            const partnerName = factureDEtails.partner?.contactName;
            const partnerAddress = factureDEtails.partner?.addressPartner;
            const partnerSiret = factureDEtails.partner?.siret;

            // Calculate the height of the text (adjust as needed based on font size)
            const lineHeight = 10;

            // Add the first line of text
            // Add the third line of text
            doc.text(`${siretLabel} ${partnerSiret}`, doc.internal.pageSize.width -(55+partnerSiret.length), yCoordinate);
            yCoordinate += lineHeight;
            if (!hasEnoughSpaceForNextLine(yCoordinate, lineHeight, doc.internal.pageSize.height)) {
                doc.addPage();
                yCoordinate = 10; // Reset y-coordinate for the new page
            }
            doc.text(`${partnerLabel} ${partnerName}`, doc.internal.pageSize.width - (50+partnerName.length), yCoordinate);
            yCoordinate += lineHeight;

            // Check if there's enough space for the next line, otherwise move to a new line or page

            // Add the second line of text
            doc.text(`${adresseLabel} ${partnerAddress}`, doc.internal.pageSize.width - (60+partnerAddress.length), yCoordinate);
            yCoordinate += lineHeight;

            // Check if there's enough space for the next line, otherwise move to a new line or page
            if (!hasEnoughSpaceForNextLine(yCoordinate, lineHeight, doc.internal.pageSize.height)) {
                doc.addPage();
                yCoordinate = 10; // Reset y-coordinate for the new page
            }

            // doc.text(`Période : `, 14, 60) ;
            // doc.text(`De : ${res?.from} à ${res?.to} `, 30, 70) ;
            // doc.text(`MONTANT TOTAL : ${Number(res?.totalAmmount).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}  `, 14, 18) ;
            doc.text(`${
              factureDEtails?.paymentMethod =="Paiement En cours – Hors Ligne" ?
"Paiement En cours – Hors Ligne":
"Facture non Payée"

                }`, 14, 40) ;

            // doc.text(`K-bis: ${partnerdetails[0].partner?.kbis}`, 14, 60) ;
            // doc.extractImageFromDataUrl(partnerdetails[0].partner?.kbis)
            // doc.line("------ -----------------------------------------------------------------")

            // Add title and date to the header
            doc.text(`${title} - ${devisByPartnerId.status ? devisByPartnerId.status : ''}`, 14, 100);
            doc.text(` ${exportDate}`, 140, 30, { lineHeightFactor: 10 });


            // Filter the data based on the selected status
            // const filteredData = (selectedStatus ? devisByPartnerId?.devisList.filter(item => item.status === selectedStatus) : devisByPartnerId?.devisList) ;


            // Add the table with the modified header and filtered data
            doc.autoTable(exportColumns1, allMissions,
              {
                startY: 110,

              }
              );

            // Save the document
            doc.save(`Facture_${
             'partner'
            }_${exportDate}.pdf`,
            {
              styles: { fillColor: [211, 211, 211] }, // Add background color for the table header
              columnStyles: { _id: { cellWidth: 30 } }, // Adjust the _id column width
              addPageContent: () => {
                // Add footer
                doc.text("Info carfoy :");
                doc.text('Liste des missions', 14, doc.internal.pageSize.height - 15);
                doc.text(`${exportDate}`, doc.internal.pageSize.width - 35, doc.internal.pageSize.height - 15);
              },
            }

            );
          });
        });
      };
      const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
              {/* <Link
                                to={`/admin/edit-mission/${rowData?._id}`}
                                onClick={(e) => {
          // Your custom click handling logic here
          // e.preventDefault(); // Prevents the default navigation behavior
          dispatch({
              type: SET_SINGLE_DEMANDE,
              payload: {},
            });
        }}

                                >

                <Btn icon="pi pi-pencil" rounded outlined className="mr-2"

                  />
                                </Link>
                <Btn icon="pi pi-trash" rounded outlined severity="danger" onClick={()=>{

      setnotificationModal(true)

      setselectedItem(rowData?._id)
      } } /> */}

            </React.Fragment>
        );
      };
      const getSeverity = (status) => {
        switch (status) {
            case 'in progress':
                return 'warning';

            case 'Accepted':
                return 'success';

            case 'Completed':
                return 'info';

            case 'rejected':
                return 'danger';


        }
      };

      const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
      };
      const [statuses] = useState(['in progress', 'Accepted', 'Completed', 'rejected']);

      const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
      };
      const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses}
            onChange={(e) => {
              options.filterApplyCallback(e.value);
              setselectedStatus(
                e.value

              )

            }}
            itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
      };
    //   const [dialogVisible, setDialogVisible] = useState(false);
      const [confirme, setconfirme] = useState(false)
      const [Rectification, setRectification] = useState(0)
      const [remunerationAmount, setremunerationAmount] = useState(0)

const onChangeHandler = (e) => {
      const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
    };
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };
    const onSubmit = (e)=>{

      e.preventDefault();
      // selectedValues?.value
      // fromDate:formatDateToYYYYMMDD(valueDe?._d),
      //           toDate:formatDateToYYYYMMDD( valueA?._d)

    //   if(
    //     !selectedValues?.value ||
    //     !formatDateToYYYYMMDD(valueDe?._d)
    //     || !formatDateToYYYYMMDD( valueA?._d)
    //     || formatDateToYYYYMMDD( valueA?._d) =='undefined-NaN-undefined'
    //     || formatDateToYYYYMMDD( valueDe?._d) =='undefined-NaN-undefined'
    //   ){
    //     showToastMessage()
    //     return
    //     }
    //     const totalMontant = devisByPartnerId.reduce(
    //       (total, devis) => total + parseFloat(devis.montant),
    //       0
    //     );

      const data = {
        partner:factureDEtails?.partner?._id,
        from:factureDEtails?.from,
        to: factureDEtails?.to,
        totalAmount:factureDEtails?.totalAmmount,

      }









      exportPdf(factureDEtails)



    }




    const handleSelectChange = (selectedOptions) => {


        setSelectedValues(selectedOptions);
        const partner = requestsByPartnerV2?.filter(
            (e) => e?.partner?._id == selectedOptions?.value
            )
            setpartnerdetails(partner)




        };

        const formatDateToYYYYMMDD= (date)=> {
          const year = date?.getFullYear();
          const month = String(date?.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date?.getDate()).padStart(2, '0');

          return `${year}-${month}-${day}`;
        }
        const fetch=()=> {
        dispatch(FindDevisByPartnerId(selectedValues?.value,
            {
                fromDate:formatDateToYYYYMMDD(valueDe?._d),
                toDate:formatDateToYYYYMMDD( valueA?._d)
            }
            ))
        }

        useEffect(() => {
          fetch()

        }, [
            selectedValues,
            valueDe?._d,
            valueA?._d
        ])

        const dialogFooterTemplate = () => {
            return <Btn label="Ok" icon="pi pi-check" onClick={() => setDialogVisible(false)} />;
        };

        const tvaRate = 20; // Change this to your actual TVA rate

        const calculateTVA = (montantHT, tvaRate) => {

          const TVA = montantHT * (tvaRate / 100);
          const montantTTC = montantHT + TVA;
          return {
            montantHT,
            TVA,
            montantTTC
          };
        };

        const header = (
            <>
            <Row>
                <Col >
                <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            {/* <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" /> */}
                        </span>
                </Col>
                <Col xs="auto">
                {/* <div className="flex align-items-center justify-content-end gap-2"> */}
                <Btn type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                {/* <Btn type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <Btn type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
                <Btn type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
                {/* </div> */}
                </Col>
            </Row>

            </>
        );
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

                      <h3 className="mb-0">facture #{factureDEtails?.numFacture}</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            // to={`/admin/ListCategorie`}
                            >

<Button
                      color={`${factureDEtails?.payed ? "success" : "danger"}`}
                      // href="#pablo"
                      onClick={(e) => dispatch(PayeeFacture(id, navigate)) }
                      size="sm"
                    >
                      {isLoad ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      ) : (

        factureDEtails?.payed ?   "impeyee":"Payé"
      )}
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
    <Alert
    status="info"
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    // height="200px"
    >
    {/* <AlertIcon boxSize="40px" mr={0} /> */}
    {
        factureDEtails?.payed ?
        <div>
        {/* <AlertIcon boxSize="40px" mr={0} /> */}
        <h1>Facture Payée :  { Number(factureDEtails?.totalAmmount).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</h1>
        </div>
        :
        <div>
        {/* <AlertIcon boxSize="40px" mr={0} /> */}
        <h1>{factureDEtails?.paymentMethod =="Paiement En cours – Hors Ligne" ?
"Paiement En cours – Hors Ligne":
"Facture non Payée"
        } :{

          Number(factureDEtails?.totalAmmount).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</h1>
        </div>

    }

   </Alert>
    <hr/>
<label className="form-label">Période :<span style={{color:"red"}}>*</span></label>

    <Row>

<Col>
<label className="form-label">De<span style={{color:"red"}}>*</span></label>
<InputText


// onChange={(e)=>setValueDe(e)}
value={factureDEtails?.from}
// timeFormat={false}
inputProps={{
  placeholder: "Date Picker Here",
  name: "dateDepart"
}}
disabled



 />
</Col>
<Col>
<label className="form-label">à<span style={{color:"red"}}>*</span></label>
<InputText

// onChange={(e)=>setValueA(e)}
value={factureDEtails?.to}
// timeFormat={false}
disabled
inputProps={{
  placeholder: "Date Picker Here",
  name: "dateDepart"
}}



 />
</Col>
</Row>
<hr/>
    <Row>
    <Col
      md={
         "12"
      }
      >
         <div className=" mb-3">
        <label className="form-label">Partner: <span style={{color:"red"}}>*</span></label>
        {/* <div className="input-group"> */}

       <InputText
         disabled
            value={factureDEtails?.partner?.contactName}
            // onChange={onChangeHandler}
            // required
            // defaultValue={
            //   Categorie?.description
            // }
            />

          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        {/* </div> */}
      </div>
      </Col>


    </Row>
    <hr/>
    <Row>
    {
      partnerdetails &&
      <>

    <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">Raison social: </label>
        <div className="input-group">

          <input type="text" disabled required placeholder="Raison social" defaultValue={partnerdetails[0]?.partner?.raisonSocial}  name={"name"} className={classNames("form-control")}  />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      </>


    }
    {
      partnerdetails &&

      <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">Adresse: </label>
        <div className="input-group">

          <input type="text" disabled required value={partnerdetails[0]?.partner?.addressPartner} placeholder="Enter the contact person's name" name={"contactName"} className={classNames("form-control")} onChange={onChangeHandler} />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>


    }

    </Row>
    <Row>
    {
      partnerdetails &&

    <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">N° SIRET: </label>
        <div className="input-group">

          <input type="text" readOnly  onChange={onChangeHandler}  placeholder="Raison social" value={partnerdetails[0]?.partner?.siret}  name={"name"} className={classNames("form-control")}  />

          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>


    }
    {
      partnerdetails &&

      <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">N° kbis: </label>
        <div className="input-group">

          <input type="text"
          readOnly
          onClick={()=> {
            if (partnerdetails[0]?.partner?.kbis) {
      window.open(partnerdetails[0]?.partner?.kbis, '_blank');
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


    }

    </Row>
    <hr/>
    <fieldset>
<legend>Historique Partenaire</legend>
<Btn label="Show"
type="button"
icon="pi pi-external-link" onClick={() => setDialogVisible(true)} />
        <Dialog header="Flex Scroll" visible={dialogVisible} style={{ width: '75vw' }} maximizable
                modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
             <DataTable
              paginator
              rows={5}
              size={"small"}
              rowsPerPageOptions={[5, 10, 25]}
               ref={dt}
              value={devisByPartnerId}
              header={header}
              selection={selectedProduct}
              selectionMode={true}
              onSelectionChange={(e) => setSelectedProduct(e.data)}
              filters={filters}
              filterDisplay="row"
              globalFilterFields={['_id','name', 'status']}
              // onRowClick={(e) => {const url = `/admin/request-details/${e.data._id}`; history.push(url); }}
               sortMode="multiple"
               className="thead-light"
                tableStyle={{ minWidth: '50rem' }}
               emptyMessage="No Missions found."

               >

                <Column field={"_id"}
                body={(rowData) => `#${rowData._id.toString().slice(-5)}`}
                header={"ID"} sortable style={{ width: '25%' }}></Column>
                {/* {tab === "partner" ?
                <Column field={"user.contactName"}
                body={(rowData) => rowData.user.contactName.toUpperCase()}
                header={"Partner Name"} sortable style={{ width: '25%' }}></Column>
                : null} */}
                {/* {
                  cols.map(e=>{
                    return <Column field={e.field} header={e.header} sortable style={{ width: '25%' }}></Column>
                  })
                } */}
                <Column field={"distance"}
                body={(rowData) => `${Number(rowData.montant).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'}) }`}
                header={"Montant"} sortable style={{ width: '25%' }}></Column>
                <Column field={"distance"}
                body={(rowData) => `~${Math.floor(rowData.mission?.distance )}km`}
                header={"Distance (km)"} sortable style={{ width: '25%' }}></Column>
                  <Column field={"createdAt"}
                body={(rowData) => new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }
                ).format(new Date(rowData.createdAt))}
                header={"Créé le "} sortable style={{ width: '25%' }}></Column>
                {/* <Column body={actionBodyTemplate2} header={"Driver"} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
                 {/* Montant HT Column */}
      <Column
        field={"montant"}
        body={(rowData) => `${Number(rowData.montant).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'}) }`}
        header={"Montant HT"}
        sortable
        style={{ width: '25%' }}
      ></Column>

      {/* TVA Column */}
      <Column
        field={"montant"}
        body={(rowData) => {
          const montantHT = Number(rowData.montant);
          const { montantTTC } = calculateTVA(montantHT, tvaRate);
          const TVA = montantTTC - montantHT;
          return `${TVA.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`;
        }}
        header={"TVA"}
        sortable
        style={{ width: '25%' }}
      ></Column>

      {/* Montant TTC Column */}
      <Column
        field={"montant"}
        body={(rowData) => {
          const montantHT = Number(rowData.montant);
          const { montantTTC } = calculateTVA(montantHT, tvaRate);
          return `${montantTTC.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`;
        }}
        header={"Montant TTC"}
        sortable
        style={{ width: '25%' }}
      ></Column>
                <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />

                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                {/* { field: 'driverIsAuto', header: 'driverIsAuto' } */}

            </DataTable>
        </Dialog>
</fieldset>













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






{
    factureDEtails?.from &&

    <Row>
      <Col>
      <button type="submit" className="btn btn-outline-primary">
      {isLoad ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          'PDF'
        )}

                    <i className="fa-solid fa-floppy-disk"></i>
                  </button></Col>
    </Row>
}
  </form>


                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  export default FactureDEtails;
