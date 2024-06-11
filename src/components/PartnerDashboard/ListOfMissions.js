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
import { ProgressB } from './Headers/Components/progressBar/ProgressB';
import { CustomizedSteppers } from './Headers/Components/progressBar/CustomizedSteppers';
import { DeleteMission } from 'Redux/actions/Demandes.Actions';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { FindRequestDemandeByPartnerV2 } from 'Redux/actions/Demandes.Actions';
import UserHeader from 'components/Headers/UserHeader';
import { findDemandsstatisticsByPartner } from 'Redux/actions/Demandes.Actions';

function ListOfMissions() {
const navigate = useHistory()


  const ListOfUsers = useSelector(state=>state?.users?.users)
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const isSuccess = useSelector(state=>state?.success?.success)

  const requests = useSelector(state=>state?.DemandeDriver?.demandes?.demands)
  const stats = useSelector(state=>state?.statistiquesPartnerMission?.statistiq?.statistics  )
  const requestsByPartner = useSelector(state=>state?.partnersMissions?.demandes?.demands)

  const requests1 = useSelector(state=>state?.DemandeDriver?.demandes?.demands)
  const [selectedItem, setselectedItem] = useState(null)
  const dispatch = useDispatch()
  const [count, setCount] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const dt = useRef(null);
  const TableIsLOad = useSelector(state=>state?.MissionTableLoad?.isLoading)

  useEffect(() => {
    dispatch({
      type: SET_SINGLE_DEMANDE,
      payload: {},
    });
    dispatch(FindRequestDemande())
    dispatch(findDemandsstatisticsByPartner())
    dispatch(FindRequestDemandeByPartner())


  }, [ requests?.length,requestsByPartner?.length])

  console.log("---------------------------------: ",stats )



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
      { field: 'address.display_name', header: 'Starting point' },
      { field: 'destination.display_name', header: 'Destination' },
    //   { field: 'status', header: 'Mission status' },
      // { field: 'distance', header: 'Distance (km)' },
      // { field: 'createdAt', header: 'Created At' },
      { field: 'driverIsAuto', header: 'driverIsAuto' }
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
        }}
        itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    );
  };


  const showToastMessage = () => {
    toast.success('Request sent successfully.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
  }
  useEffect(() => {
    if (isSuccess) {

      showToastMessage()
    }
  }, [isSuccess])


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


    // if(isSuccess){

    //   startTimer()
    // }
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
        {/* </div> */}
        </Col>
    </Row>

    </>
);
const actionBodyTemplate = (rowData) => {

  return (
      <React.Fragment>
      {
       ( rowData?.status =='En attente' || rowData?.status== 'in progress' ) &&

      <>


        <Link
                          to={`/partner/edit-mission/${rowData?._id}`}
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
  return (
    <>
    {/* <Header /> */}
    <UserHeader />
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
                <h3 className="mb-0">Liste de toutes les missions</h3>

                  </Col>
                  <Col
                  // lg="6"
                    md="2"
                  >
                     <Link
                          to={`/partner/AddRequest`}
                          >

                            <Button
                            className="float-right"
                            // color="primary"
                            >


j’obtiens mon devis
                <i className=" ml-2 fas fa-arrow-right" />
                            </Button>
                          </Link>
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
                  Your attention is required
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
                  <h4 className="heading mt-4">You should read this!</h4>
                  <p>
                    When you click on "Ok , Got it" the request will be deleted {selectedItem}
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
                  "Ok, Got it"
                  }

                </Button>
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
            <div className="card">

              {/* <Tooltip target=".export-buttons>button" position="bottom" /> */}
              <DataTable
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
               ref={dt}
              value={ requests}
              header={header}
              selection={selectedProduct}
              selectionMode={true}
              onSelectionChange={(e) => setSelectedProduct(e.data)}
              filters={filters}
              size={"small"}
              filterDisplay="row"
              globalFilterFields={['_id','name', 'status']}
              onRowClick={(e) => {const url = `/partner/request-details/${e.data._id}`; history.push(url); }}
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
                {/* <Column field={"_id"}
                body={(rowData) => `#${rowData._id.toString().slice(-5)}`}
                header={"ID"} sortable style={{ width: '25%' }}></Column> */}

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

export default ListOfMissions