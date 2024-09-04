import React, { useEffect, useRef } from 'react'
import { useState } from "react";
// react component that copies the given text inside your clipboard

import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardFooter,
  Button,
  Modal,
  Label,
} from "reactstrap";
import Header from './Headers/Header';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { Button as Btn} from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Tooltip } from 'primereact/tooltip';
import { Tooltip  } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { toast } from 'react-toastify';
import { FindRequestDemande } from 'Redux/actions/Demandes.Actions';
import { Switch } from '@chakra-ui/react';
import { SET_DEMANDES } from 'Redux/types';
import { SET_SINGLE_DEMANDE } from 'Redux/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FindRequestDemandeByPartner } from 'Redux/actions/Demandes.Actions';
import { DeleteMission } from 'Redux/actions/Demandes.Actions';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { FindRequestDemandeByPartnerV2 } from 'Redux/actions/Demandes.Actions';
import axios from 'axios';
import jsPDF from 'jspdf';

function ListOfDemandes() {
const navigate = useHistory()


  const ListOfUsers = useSelector(state=>state?.users?.users)
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const TableIsLOad = useSelector(state=>state?.MissionTableLoad?.isLoading)
  const isSuccess = useSelector(state=>state?.success?.success)

  const requests = useSelector(state=>state?.DemandeDriver?.demandes?.demands)
  const requestsByPartner = useSelector(state=>state?.partnersMissions?.demandes?.demands)
  const requests1 = useSelector(state=>state?.DemandeDriver?.demandes?.demands)
  const [selectedItem, setselectedItem] = useState(null)
  const [selectedStatus, setselectedStatus] = useState()
  const dispatch = useDispatch()
  const [count, setCount] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const dt = useRef(null);
  const [tab, settab] = useState("admin")

  const requestsByPartnerV2 = useSelector(state=>state?.MissionByPartnerV2?.demandes)

  useEffect(() => {
    dispatch({
      type: SET_SINGLE_DEMANDE,
      payload: {},
    });


    dispatch(FindRequestDemande())
    dispatch(FindRequestDemandeByPartner())
    dispatch(FindRequestDemandeByPartnerV2())

  }, [ requests?.length,requestsByPartner?.length,requestsByPartnerV2?.length])


  useEffect(() => {
    dispatch({
      type: SET_SINGLE_DEMANDE,
      payload: {},
    });

  }, [])



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
const [globalFilterValue, setGlobalFilterValue] = useState('');
  const cols = [
      // { field: '_id', header: 'Id' },
    //   { field: 'name', header: 'Name' },
      { field: 'address.display_name', header: 'Point de départ' },
      { field: 'destination.display_name', header: 'Destination' },
      // { field: 'distance', header: 'Distance (km)' },
      // { field: 'createdAt', header: 'Created At' },
      // { field: 'driverIsAuto', header: 'Conducteur automatique' }
      // tab === "partner" ? { field: 'partnerName', header: 'Partner' } : null
  ];

  const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));


  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);





    const [notificationModal, setnotificationModal] = useState(false)









  // const showToastMessage = () => {
  //   toast.success('Request sent successfully.', {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 3000,
  //   });
  // }
  // useEffect(() => {
  //   if (isSuccess) {

  //     showToastMessage()
  //   }
  // }, [isSuccess])


  const deleteMission = (id)=> {


    dispatch(DeleteMission(id))
    .then(() => {
      // Handle success
      setnotificationModal(false)
    })
    .catch((error) => {
      // Handle error
      setnotificationModal(false)
    });

  //   setTimeout(() => {
  //     setnotificationModal(false)

  // }, 3000);
  }


  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
};






const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  let _filters = { ...filters };

  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};

const [checked, setChecked] = useState(false);
const handleChange = (event) => {
  setChecked(event.target.checked);

};


const exportPdf = () => {
  import('jspdf').then((jsPDF) => {
    import('jspdf-autotable').then(() => {
      const doc = new jsPDF.default(0, 0);
      const cols = [
        // { field: '_id', header: 'ID' },
        { field: 'postalAddress', header: 'Point de départ' },
        { field: 'postalDestination', header: 'Destination' },
        { field: 'driverIsAuto', header: 'Conducteur automatique' },
        { field: 'distance', header: 'Distance (km)' },
        { field: 'createdAt', header: 'Créé le' },
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
        cell: (cell) => col.field === '_id' ? { content: cell.raw.toString().slice(-5) } : cell.raw, // Apply .toString().slice(-5) for _id field // Apply .toString().slice(-5) for _id field
      }));

      // Add title and date variables
      const title = tab === 'partner' ?
        'Liste des missions  ' :
        'Liste des missions  ';

      const exportDate = new Date().toLocaleString('fr-FR'); // Format the date as needed

      // Add title and date to the header
      doc.text(`${title} - ${selectedStatus? selectedStatus: ''}`, 14, 10);
      doc.text(` ${exportDate}`, 140, 10,
      { lineHeightFactor: 10 }
      );

      // Filter the data based on the selected status

      const filteredData = tab === 'partner' ?
        (selectedStatus ? requestsByPartner.filter(item => item.status === selectedStatus) : requestsByPartner) :
        (selectedStatus ? requests.filter(item => item.status === selectedStatus ) : requests);

      // Add the table with the modified header and filtered data
      doc.autoTable(exportColumns1, filteredData);

      // Save the document
      doc.save(`missions_list_${
        tab === 'partner' ? 'partner' : 'admin'
      }_${exportDate}.pdf`,
      {
        styles: { fillColor: [211, 211, 211] }, // Add background color for the table header
        columnStyles: { _id: { cellWidth: 30 } }, // Adjust the _id column width
        addPageContent: () => {
          // Add footer
          doc.text('Liste des missions', 14, doc.internal.pageSize.height - 15);
          doc.text(`${exportDate}`, doc.internal.pageSize.width - 35, doc.internal.pageSize.height - 15);
        },
      }

      );
    });
  });
};
const exportPdf2 = (data,name) => {
  import('jspdf').then((jsPDF) => {
    import('jspdf-autotable').then(() => {
      const doc = new jsPDF.default(0, 0);
      const cols = [
        // { field: '_id', header: 'ID' },
        { field: 'postalAddress', header: 'Point de départ' },
        { field: 'postalDestination', header: 'Destination' },
        { field: 'driverIsAuto', header: 'Conducteur automatique' },
        { field: 'distance', header: 'Distance (km)' },
        { field: 'createdAt', header: 'Créé le' },
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
        cell: (cell) => col.field === '_id' ? { content: cell.raw.toString().slice(-5) } : cell.raw, // Apply .toString().slice(-5) for _id field // Apply .toString().slice(-5) for _id field
      }));

      // Add title and date variables
      const title = tab === 'partner' ?
        `Liste des missions - ${name}  ` :
        `Liste des missions - ${name}  `;

      const exportDate = new Date().toLocaleString('fr-FR'); // Format the date as needed

      // Add title and date to the header
      doc.text(`${title} - ${selectedStatus? selectedStatus: ''}`, 14, 10);
      doc.text(` ${exportDate}`, 140, 10,
      { lineHeightFactor: 10 }
      );

      // Filter the data based on the selected status

      const filteredData = tab === 'partner' ?
        (selectedStatus ? requestsByPartner.filter(item => item.status === selectedStatus) : requestsByPartner) :
        (selectedStatus ? requests.filter(item => item.status === selectedStatus && item.driver.onligne) : requests);

      // Add the table with the modified header and filtered data

      doc.autoTable(exportColumns1, data);

      // Save the document
      doc.save(`missions_list_${
        tab === 'partner' ? 'partner' : 'admin'
      }_${exportDate}.pdf`,


      );
    });
  });
};

  const header = (
    <>
    <Row>
        <Col >
        <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
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
const header2 =(data, name)=> {


  return(

    <>
  <Row>
      <Col >
      <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              </span>
      </Col>
      <Col xs="auto">
      {/* <div className="flex align-items-center justify-content-end gap-2"> */}
      <Btn type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
      {/* <Btn type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
      <Btn type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
      <Btn type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={()=>exportPdf2(data,name)} data-pr-tooltip="PDF" />
      {/* </div> */}
      </Col>
  </Row>

  </>
  )
}

// "in progress"
//             ? 35
//             : status === "Devis"
//             ? 75
//             : status === "Terminée"
const getSeverity = (status) => {
  switch (status) {
      case 'En attente ':
          return 'warning';

      case 'Devis':
          return 'success';

          case 'Confirmée':
            return 'success';

      case 'Terminée':
          return 'info';
      case 'Démarrée':
          return 'info';
          case 'En retard':
            return 'danger';
      case 'rejected':
          return 'danger';
          case 'refusée':
            return 'danger';


  }
};

const statusItemTemplate = (option) => {
  return <Tag value={option} severity={getSeverity(option)} />;
};
const [statuses] = useState(['En attente ', 'Devis', 'Terminée', 'rejected',"refusée", 'Démarrée', 'En retard', 'Confirmée']);

const statusBodyTemplate = (rowData) => {
  return <Tag value={rowData?.status == "in progress"?
    "En cours de validation" : rowData?.status == "Accepted" ? "Acceptée" : rowData?.status == "Completed" ? "Terminée" : rowData?.status
  } severity={getSeverity(rowData?.status)} />;
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
// --------------------------------------------------------------------------------------------------
const [expandedRows, setExpandedRows] = useState(null);
const toast = useRef(null);
const onRowExpand = (event) => {
  toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
};

const onRowCollapse = (event) => {
  toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
};
const allowExpansion = (rowData) => {

  return rowData.demands?.length > 0;
};

const rowExpansionTemplate = (data) => {

  return (
      <div className="p-3">
          <h5>missions from {data.partner.name}</h5>
          <DataTable
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
               ref={dt}
              value={data?.demands}
              header={_=>header2(data?.demands,data.partner.name)}
              selection={selectedProduct}
              selectionMode={true}
              onSelectionChange={(e) => setSelectedProduct(e.data)}
              filters={filters}
              filterDisplay="row"
              globalFilterFields={['_id','name', 'status']}
              onRowClick={(e) => {const url = `/admin/request-details/${e.data._id}`; history.push(url); }}
               sortMode="multiple"className="thead-light" tableStyle={{ minWidth: '50rem' }}
               emptyMessage="No Missions found."
              //  loading={TableIsLOad}
               >
                {/* <Column field="_id" header="ID" sortable className="thead-light" ></Column>
                <Column field="name" header="Name" sortable className="thead-light" ></Column>
                <Column field="address" header="Address" sortable style={{ width: '25%' }}></Column>
                <Column field="gaz" header="Gaz" sortable style={{ width: '25%' }}></Column>
                <Column field="niv" header="Level" sortable style={{ width: '25%' }}>
                  hjh
                </Column> */}
                <Column field={"_id"}
                body={(rowData) => `#${rowData._id.toString().slice(-5)}`}
                header={"ID"} sortable style={{ width: '25%' }}></Column>

                {
                  cols.map(e=>{
                    return <Column field={e.field} header={e.header} sortable style={{ width: '25%' }}></Column>
                  })
                }
                <Column field={"_id"}
                body={(rowData) =>rowData?.driver?.name}
                header={"Conducteur"} sortable style={{ width: '25%' }}></Column>
                <Column field={"distance"}
                body={(rowData) => `~${Math.floor(rowData.distance )}km`}
                header={"Distance (km)"} sortable style={{ width: '25%' }}></Column>
                  <Column field={"createdAt"}
                body={(rowData) => new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }
                ).format(new Date(rowData.createdAt))}
                header={"Créé le"} sortable style={{ width: '25%' }}></Column>
                {/* <Column body={actionBodyTemplate2} header={"Driver"} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
                <Column field="status" header="Statut" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />

                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                {/* { field: 'driverIsAuto', header: 'driverIsAuto' } */}

            </DataTable>
      </div>
  );
};
// --------------------------------------------------------------------------------------------------
const actionBodyTemplate = (rowData) => {

  return (
      <React.Fragment>
      {
        rowData?.status =='En attente' || rowData?.status== 'Devis' || rowData?.status== 'in progress' &&
      <>

        <Link
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
} } />
      </>
      }
 <Btn  type="button" disabled={loading} icon={ loading? <i className="pi pi-spin pi-spinner" /> : "pi pi-file-pdf"} severity="warning" rounded onClick={() => generatePDF(rowData)} data-pr-tooltip="PDF" />
      </React.Fragment>
  );
};
const actionBodyTemplate2 = (rowData) => {
  return (
<React.Fragment>

    <Switch
    checked={checked}
    onChange={handleChange}
    inputProps={{ 'aria-label': 'controlled' }}
    size='lg'
  />
</React.Fragment>
  );
};
const [loading, setLoading] = useState(false);
const generatePDF = (rowData) => {
  setLoading(true);
  axios.get(`https://convoyage.onrender.com/api/users/getFactureByMissionId/${rowData._id}`)
      .then((response) => {
          const facture = response.data[0];
          const doc = new jsPDF();


          const logoBase64 = 'data:image/png;base64,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';

          // Header: Logo and Title
          doc.addImage(logoBase64, 'PNG', 10, 10, 40, 20);
          doc.setFontSize(24);
          doc.setFont('Helvetica', 'bold');
          doc.text('Facture', 160, 25);

          // Company Information
          doc.setFontSize(10);
          doc.setFont('Helvetica', 'normal');
          doc.text('140 bis Rue DE RENNES', 10, 40);
          doc.text('PARIS 75006', 10, 45);
          doc.text('Téléphone : 06 51913143', 10, 50);
          doc.text('SIRET:98066356100028', 10, 55);

          // Facture Information
          doc.setFont('Helvetica', 'bold');
          doc.setFillColor(0, 102, 204); // Blue color for background
          doc.rect(10, 60, 90, 7, 'F');
          doc.rect(110, 60, 90, 7, 'F');
          doc.setTextColor(255, 255, 255);
          doc.text('FACTURER À ', 15, 65);
          doc.text('RÉF CLIENT', 115, 65);
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text(`ID CLIENT: ${facture.partner}`, 115, 75);
          doc.text(`N° de commande: ${facture.numFacture}`, 10, 75);

          // Conditions
          doc.rect(110, 85, 90, 7, 'F');
          doc.setFillColor(0, 102, 204);
          doc.text('CONDITIONS', 115, 90);
          doc.text('Paiement à la commande', 115, 100);

          // Table
          doc.autoTable({
              startY: 105,
              head: [['DESCRIPTION', 'QTÉ', 'PRIX UNITAIRE', 'MONTANT']],
              body: [
                  ['DISTINATION COMBIEN DE km', '46', '1,50', '69,00'],
                  ['PLEIN DE CARBURANT', '1', '10,00', '10,00'],
                  ['RECHARGE ELECTRIQUE', '0', '10,00', '-'],
                  ['PLAQUE W GARAGE', '1', '30,00', '30,00'],
                  ['LAVAGE EXTERIEUR', '1', '15,00', '15,00'],
                  ['LAVAGE INTERIEUR', '1', '18,00', '18,00'],
                  // Add more items here based on your facture data
              ],
              theme: 'grid',
              headStyles: {
                  fillColor: [0, 102, 204],
                  textColor: [255, 255, 255],
              },
              styles: {
                  halign: 'center',
              },
              columnStyles: {
                  0: { halign: 'left' },
              }
          });

          // Total
          doc.setFillColor(240, 248, 255); // Light blue color for the totals section
          doc.rect(140, doc.lastAutoTable.finalY + 10, 60, 7, 'F');
          doc.text('TOTAL HT', 145, doc.lastAutoTable.finalY + 15);
          doc.text(`${facture.totalAmmount}`, 195, doc.lastAutoTable.finalY + 15, { align: 'right' });
          doc.text('TOTAL TTC', 145, doc.lastAutoTable.finalY + 25);
          doc.text(`${facture.totalAmmount}`, 195, doc.lastAutoTable.finalY + 25, { align: 'right' });

          // Footer
          doc.setFontSize(10);
          doc.text('*Mode de règlement : Virement bancaire (FR76 2823 3000 0168 3398 1016 122)', 10, doc.lastAutoTable.finalY + 40);
          doc.text('Pour toute question, veuillez contacter', 10, doc.lastAutoTable.finalY + 50);
          doc.text('GAIES Rachid, 06 51 91 31 43, CARVOY7@GMAIL.COM', 10, doc.lastAutoTable.finalY + 55);

          doc.save(`Facture_${rowData._id}.pdf`);
          setLoading(false);
      })
      .catch((error) => {
          console.error("There was an error fetching the facture data!", error);
          setLoading(false);
      });
};


  return (
    <>
    <Header />
    {/* Page content */}
    <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col
                  // lg="6"
                    md="10"
                  >
                <h3 className="mb-0">Liste de toutes les missions  {tab =="partner" && 'créées par les partenaires'} </h3>

                  </Col>
                  <Col
                  // lg="6"
                    md="10"
                  >

                            <Button
                            className="float-right"
                            // color="primary"
                            onClick={()=>{
                              dispatch(FindRequestDemande())
    dispatch(FindRequestDemandeByPartner())
                            }
                            }
                            >


<Tooltip label='refresh data ' fontSize='md'>

                              <i className="fas fa-sync-alt" />
</Tooltip>
                {/* <i className=" ml-2 fas fa-arrow-right" /> */}
                            </Button>

                  </Col>
                  <Col
                  // lg="6"
                    md="2"
                  >
                     <Link
                          to={`/admin/AddRequest`}
                          >

                            <Button
                            className="float-right"
                            // color="primary"
                            >


Créer une mission
                <i className=" ml-2 fas fa-arrow-right" />
                            </Button>
                          </Link>
                  </Col>
                  <Col md="2">
  {/* <Link to={`/company/index`}> */}


    <Button className="float-right"
    onClick={() => {settab("partner")
    setselectedStatus(
      null
    )
    }}

    >
  <Tooltip label='By Partners' fontSize='md'>
        <i className="fas fa-users" />
  </Tooltip>
      {/* </Link> */}
    </Button>

    <Button className="float-right"
    onClick={() => settab("Admin")}
    >
      {/* <Link to="/company/index"> */}
        {/* <i className="fas fa-users-tie" /> */}
        <Tooltip label='By Admin' fontSize='md'>

        <FontAwesomeIcon icon={faUserTie} />
        </Tooltip>
      {/* </Link> */}
    </Button>

  {/* </Link> */}
</Col>
                </Row>
              </CardHeader>


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
                  <h4 className="heading mt-4">Vous devriez lire ceci!</h4>
                  <p>
                  Lorsque vous cliquez sur 'Ok, compris', la demande sera supprimée{selectedItem}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"
                onClick={()=>deleteMission(selectedItem)}
                >
                  {isLoad ? (
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden"></span>
    </div>
  )
                  :
                  "Ok, compris"
                  }

                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setnotificationModal(false)}
                >
                  Fermer
                </Button>
              </div>
            </Modal>
            <div className="card">

              {/* <Tooltip target=".export-buttons>button" position="bottom" /> */}
              {
                tab !=='partner' ?

              <DataTable
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
               ref={dt}
              value={tab =="partner" ? requestsByPartner : requests}
              header={header}
              selection={selectedProduct}
              selectionMode={true}
              onSelectionChange={(e) => setSelectedProduct(e.data)}
              filters={filters}
              filterDisplay="row"
              globalFilterFields={['_id','name', 'status']}
              onRowClick={(e) => {const url = `/admin/request-details/${e.data._id}`; history.push(url); }}
               sortMode="multiple"className="thead-light" tableStyle={{ minWidth: '50rem' }}
               emptyMessage="No Missions found."
              //  loading={TableIsLOad}
               >
                {/* <Column field="_id" header="ID" sortable className="thead-light" ></Column>
                <Column field="name" header="Name" sortable className="thead-light" ></Column>
                <Column field="address" header="Address" sortable style={{ width: '25%' }}></Column>
                <Column field="gaz" header="Gaz" sortable style={{ width: '25%' }}></Column>
                <Column field="niv" header="Level" sortable style={{ width: '25%' }}>
                  hjh
                </Column> */}
                <Column field={"_id"}
                body={(rowData) => `#${rowData._id.toString().slice(-5)}`}
                header={"ID"} sortable style={{ width: '25%' }}></Column>
                  <Column field={"_id"}
                body={(rowData) =>rowData?.driver?.name}
                header={"Conducteur"} sortable style={{ width: '25%' }}></Column>
                {tab === "partner" ?
                <Column field={"user.contactName"}
                body={(rowData) => rowData.user.contactName.toUpperCase()}
                header={"Partner Name"} sortable style={{ width: '25%' }}></Column>
                : null}
                {
                  cols.map(e=>{
                    return <Column field={e.field} header={e.header} sortable style={{ width: '25%' }}></Column>
                  })
                }
                <Column field={"distance"}
                body={(rowData) => `~${Math.floor(rowData.distance )}km`}
                header={"Distance (km)"} sortable style={{ width: '25%' }}></Column>
                  <Column field={"createdAt"}
                body={(rowData) => new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }
                ).format(new Date(rowData.createdAt))}
                header={"Created At"} sortable style={{ width: '25%' }}></Column>
                {/* <Column body={actionBodyTemplate2} header={"Driver"} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
                <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />

                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                {/* { field: 'driverIsAuto', header: 'driverIsAuto' } */}

            </DataTable>
            :
            <div className="card">
            <Toast ref={toast} />
            <DataTable value={requestsByPartnerV2} expandedRows={expandedRows} onRowToggle={(e) => {
            //  alert(e?.data)
              setExpandedRows(e?.data)

            }}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="partner._id" header={header} tableStyle={{ minWidth: '60rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="partner.name" header="Name" sortable />
                <Column field="partner.email" header="E-mail" sortable />
                {/* <Column header="Image" body={imageBodyTemplate} /> */}
                {/* <Column field="price" header="Price" sortable body={priceBodyTemplate} /> */}
                <Column field="partner.phoneNumber" header="Tel" sortable />
                {/* <Column field="rating" header="Reviews" sortable body={ratingBodyTemplate} /> */}
            </DataTable>
        </div>
              }
                </div>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  {/* <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                  <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination> */}
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}

      </Container>
  </>
  )
}

export default ListOfDemandes