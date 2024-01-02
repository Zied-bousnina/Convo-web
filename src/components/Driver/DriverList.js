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
} from "reactstrap";
import Header from '../Headers/Header';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { FetchAllBins } from 'Redux/actions/BinAction';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteBinByID } from 'Redux/actions/BinAction';
import { Button as Btn} from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Tooltip } from 'primereact/tooltip';
import { useHistory } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { ToastContainer, toast } from 'react-toastify';
import { FindRequestDemande } from 'Redux/actions/Demandes.Actions';
import PartnershipList from 'components/PartnershipList';
import { FetchAllPartnership } from 'Redux/actions/PartnershipAction';
import { DeleteUserByAdmin } from 'Redux/actions/userAction';
import { FetchAllDrivers } from 'Redux/actions/Driver.actions';
import { SET_PARTNER_DETAILS } from 'Redux/types';
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Tooltip } from '@chakra-ui/react';
function ListOfDrivers() {
const navigate = useHistory()

  const listOfBins = useSelector(state=>state?.ListOfBins?.ListOfBins?.bins)

  const ListOfUsers = useSelector(state=>state?.users?.users)
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const TableDriverLoadingisLoad = useSelector(state=>state?.TableDriverLoading?.isLoading)
  const isSuccess = useSelector(state=>state?.success?.success)


  const requests = useSelector(state=>state?.DemandeDriver?.demandes?.demands)

  const driverList = useSelector(state=>state?.drivers?.driver_list?.driver)
  const [selectedItem, setselectedItem] = useState(null)
  const dispatch = useDispatch()
  const [count, setCount] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const dt = useRef(null);


  useEffect(() => {
    dispatch(FetchAllDrivers())
    dispatch({
      type: SET_PARTNER_DETAILS,
      payload: {}
  })

  }, [ driverList?.length])
  // console.log(driverList)

const [filters, setFilters] = useState({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  driverIsVerified: { value: null, matchMode: FilterMatchMode.EQUALS },
  onligne: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const [globalFilterValue, setGlobalFilterValue] = useState('');
  const cols = [
      // { field: '_id', header: 'Id' },
    //   { field: 'name', header: 'Name' },
      { field: 'name', header: 'Nom' },
    //   { field: 'contactName', header: 'Contact Name' },
      { field: 'email', header: 'E-mail' },
      // { field: 'onligne', header: 'Is Online' },
      // { field: 'createdAt', header: 'Created At' }
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




//   console.log(ListOfUsers)
    const [notificationModal, setnotificationModal] = useState(false)
  // console.log(requestsMunicipal)



  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames('pi', {
          'text-green-500 pi-check-circle': rowData.driverIsVerified,
          'text-red-500 pi-times-circle': !rowData.driverIsVerified,
        })}
      ></i>
    );
  };

const verifiedRowFilterTemplate = (options) => {
  return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
};





  const showToastMessage = () => {
    toast.success('Partner deleted  successfully.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
  }
  useEffect(() => {
    if (isSuccess) {

      showToastMessage()
      setnotificationModal(false)
    }
  }, [isSuccess])


  const deleteBin = (id)=> {
    console.log("delete")

    dispatch(DeleteUserByAdmin(id))
    setnotificationModal(false)
    if(isSuccess){

    }
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
const [statuses] = useState(['Online', 'Hors-ligne']);

const getSeverity = (status) => {
    switch (status) {
        case false:
            return 'danger';

        case true:
            return 'success';


    }
};
const statusBodyTemplate = (rowData) => {
  return <Tag value={
    rowData.onligne?
    "Online"
    :
    "Hors-ligne"
  } severity={getSeverity(rowData.onligne)} />;
};

const statusRowFilterTemplate = (options) => {
  return (
      <Dropdown value={options.value} options={statuses} onChange={(e) => {
        options.filterApplyCallback(
          e.value === 'Online' ? true : false
        )}} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
  );
};

const statusItemTemplate = (option) => {
  return <Tag value={option} severity={getSeverity(option)} />;
};
const actionBodyTemplate = (rowData) => {
  return (
      <React.Fragment>
        <Link
                          to={`/admin/edit-Driver/${rowData?._id}`}
                          >

          <Btn icon="pi pi-pencil" rounded outlined className="mr-2"  />
                          </Link>
          <Btn icon="pi pi-trash" rounded outlined severity="danger" onClick={()=>{

setnotificationModal(true)

setselectedItem(rowData?._id)
} } />
      </React.Fragment>
  );
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
                  lg="8"
                    md="8"
                  >
                <h3 className="mb-0">Liste de tous les conducteurs</h3>

                  </Col>
                  <Col
                  // lg="6"
                    md="2"
                  >

                            <Button
                            className="float-right"
                            // color="primary"
                            onClick={()=>{
                              dispatch(FetchAllDrivers())
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
                          to={`/admin/AddDriver`}
                          >
                            <Button
                            className="float-right"
                            // color="primary"
                            >


Créer un conducteur
                <i className=" ml-2 fas fa-arrow-right" />
                            </Button>
                          </Link>
                  </Col>
                </Row>
              </CardHeader>

              <ToastContainer />
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
                onClick={()=>deleteBin(selectedItem)}
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
              <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25]} ref={dt} value={driverList} header={header} selection={selectedProduct}
              selectionMode={true}
              // loading={TableDriverLoadingisLoad}
              onSelectionChange={(e) => setSelectedProduct(e.data)}
              filters={filters} filterDisplay="row" globalFilterFields={['_id','name', 'address', 'gaz', 'niv', 'status']}
              onRowClick={
                (e) => {

                  const url = `/admin/driver-details/${e.data._id}`;
  history.push(url);
                }
              }


               sortMode="multiple"className="thead-light" tableStyle={{ minWidth: '50rem' }}>
                {/* <Column field="_id" header="ID" sortable className="thead-light" ></Column>
                <Column field="name" header="Name" sortable className="thead-light" ></Column>
                <Column field="address" header="Address" sortable style={{ width: '25%' }}></Column>
                <Column field="gaz" header="Gaz" sortable style={{ width: '25%' }}></Column>
                <Column field="niv" header="Level" sortable style={{ width: '25%' }}>
                  hjh
                </Column> */
               }
               <Column field={"_id"}
                body={(rowData) => `#${rowData._id.toString().slice(-5)}`}
                header={"ID"} sortable style={{ width: '25%' }}></Column>
                {
                  cols.map(e=>{
                    return <Column field={e.field} header={e.header} sortable style={{ width: '25%' }}></Column>
                  })
                }
                <Column field="onligne" header="Est en ligne" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }}
                body={statusBodyTemplate} filter
                filterElement={statusRowFilterTemplate} />
                <Column field={"createdAt"}
                body={(rowData) => new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }
                ).format(new Date(rowData.createdAt))}
                header={"Créé le"} sortable style={{ width: '25%' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                <Column field="driverIsVerified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />

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

export default ListOfDrivers