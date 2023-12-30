
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
  import React, { useEffect, useRef, useState } from "react";
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
import { GetPartnerDetailsById } from "Redux/actions/PartnershipAction.js";
import { UpdatePartnerShip } from "Redux/actions/PartnershipAction.js";
import Skeleton from "react-loading-skeleton";
import { Button as Btn} from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { FindRequestDemandeById } from "Redux/actions/Demandes.Actions.js";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { FindAllCategories } from "Redux/actions/Demandes.Actions.js";
import { FindDevisByPartner } from "Redux/actions/Demandes.Actions.js";
  const animatedComponents = makeAnimated();
  const PartnerDetails = () => {

    const error = useSelector(state=>state.error?.errors)


  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const isSuccess = useSelector(state=>state?.success?.success)
    // const ListOfQuote= useSelector(state=>state?.quote?.quote?.quotes)
    const ListOfBinsNotInUse= useSelector(state=>state?.ListOfBinsNotInPointBin?.ListOfBinsNotInPointBin)

    const [governorates, setgovernorates] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Tunis');
    const [selectedMunicipal, setMunicipal] = useState('Tunis');
    const [selectedValues, setSelectedValues] = useState([]);
    const dispatch = useDispatch()
    const [selectedStatus, setselectedStatus] = useState()
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const SingleDemande = useSelector(state=>state?.Demande?.demandes?.demande)
    const devsList = useSelector(state=>state?.DevisByPartner?.devis?.Devis)
    const Categories = useSelector(state=>state?.AllCategories?.categorie?.categorie)
    const dialogFooterTemplate = () => {
      return <Btn label="Ok" icon="pi pi-check" onClick={() => setDialogVisible(false)} />;
  };
  const dt = useRef(null);
  useEffect(() => {
    dispatch(FindDevisByPartner(id))

  }, [ devsList?.length])
  console.log(devsList)
  useEffect(() => {

      dispatch(FindAllCategories())
    }, [ Categories?.length])
    const PartnerDetails = useSelector(state=>state?.partnerDetails?.partnerDetails?.partner)
  const { id } = useParams();
  useEffect(() => {
    dispatch(GetPartnerDetailsById(id))
  }, [dispatch,PartnerDetails?._id])
//   console.log(PartnerDetails)
    dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })




    const showToastMessage = () => {
      toast.success('Partner Edit  successfully.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }


    useEffect(() => {
        if (isSuccess) {

          showToastMessage()
        }
      }, [isSuccess])



    const [form, setForm] = useState({})

    const onChangeHandler = (e) => {
      const { name, value } = e.target;



        setForm({
          ...form,
          [name]: value,
        });


      console.log(form);
    };


    useEffect(() => {
      dispatch(FetchAllBinsNotInUse())

    }, [ListOfBinsNotInUse])




    // console.log("Params:", useParams())
    const onSubmit = (e)=>{

      e.preventDefault();
      // console.log("bins", selectedValues.value)

      console.log(form)

    dispatch(UpdatePartnerShip(id,form))

    // !error?.success ? showErrorToastMessage() : null




        // showToastMessage()
        // setSelectedBins([])
        e.target.reset();


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
    const [globalFilterValue, setGlobalFilterValue] = useState('');
      const cols = [
        // { field: '_id', header: 'ID' },
        // { field: 'partner.contactName', header: 'Partner Name' },
        // { field: 'categorie', header: 'Categorie' },
        // { field: 'montant', header: 'Montant' },
        // { field: 'createdAt', header: 'Créé le' },
        // { field: 'status', header: 'Statut' }, // New status column
        // Add other columns as needed
      ];
      const [notificationModal, setnotificationModal] = useState(false)
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
    const exportPdf = () => {
      import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
          const doc = new jsPDF.default(0, 0);
          const cols = [
            // { field: '_id', header: 'ID' },
            { field: 'montant', header: 'Montant' },


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
          const title =
            'Liste des missions  ';

          const exportDate = new Date().toLocaleString('fr-FR'); // Format the date as needed

          // Add title and date to the header
          doc.text(`${title} - ${selectedStatus? selectedStatus: ''}`, 14, 10);
          doc.text(` ${exportDate}`, 140, 10,
          { lineHeightFactor: 10 }
          );

          // Filter the data based on the selected status
          console.log(selectedStatus);
          const filteredData = (selectedStatus ? devsList.filter(item => item.status === selectedStatus) : devsList) ;


          // Add the table with the modified header and filtered data
          doc.autoTable(exportColumns1, filteredData);

          // Save the document
          doc.save(`missions_list_${
            'partner'
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
            console.log('Selected value:', e.value);
            options.filterApplyCallback(e.value);
            setselectedStatus(
              e.value

            )

          }}
          itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
      );
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





    // Handle onChange event

    // console.log("SelectedValues", selectedValues)
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          {/* <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Make request
                    </h6>
                    <h2 className="mb-0">Directions</h2>
                  </div>
                </Row>
              </CardHeader> */}
            <Col className="order-xl-1" xl="11">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                    <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                    {
      PartnerDetails ?


                    `Partner ID #${id.toString().slice(-5)}`
                    :
      <Col
      md="6"
      >
      <Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
      height={40}
      width={250}
      />
      </Col>
    }
                    </h6>
                    <h2 className="mb-0">Partner Details</h2>
                  </div>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/edit-Partner/${id}`}
                            >

                      <Button
                        // color="primary"

                        size="md"
                        >  Edit
                        <i className=" ml-2 fas fa-arrow-right" />
                      </Button>
                        </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
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
              value={devsList}
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
                {
                  cols.map(e=>{
                    return <Column field={e.field} header={e.header} sortable style={{ width: '25%' }}></Column>
                  })
                }
                <Column field={"distance"}
                body={(rowData) => `${Number(rowData.montant).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'}) }`}
                header={"Montant"} sortable style={{ width: '25%' }}></Column>
                <Column field={"distance"}
                body={(rowData) => `~${Math.floor(rowData?.distance )}km`}
                header={"Distance (km)"} sortable style={{ width: '25%' }}></Column>
                  <Column field={"createdAt"}
                body={(rowData) => new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }
                ).format(new Date(rowData.createdAt))}
                header={"Créé le "} sortable style={{ width: '25%' }}></Column>
                {/* <Column body={actionBodyTemplate2} header={"Driver"} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
                <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />

                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                {/* { field: 'driverIsAuto', header: 'driverIsAuto' } */}

            </DataTable>
        </Dialog>
</fieldset>
<hr/>
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
    {
      PartnerDetails ?

    <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">Business Name: </label>
        <div className="input-group">

          <input type="text" disabled required placeholder="Enter the name of the business" defaultValue={PartnerDetails?.name}  name={"name"} className={classNames("form-control")} onChange={onChangeHandler} />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      :
      <Col
      md="6"
      >
      <Skeleton
       style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }

      height={40}
      width={250}
      />
      </Col>

    }
    {
      PartnerDetails ?

      <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label"> Contact Person: </label>
        <div className="input-group">

          <input type="text" disabled required defaultValue={PartnerDetails?.contactName} placeholder="Enter the contact person's name" name={"contactName"} className={classNames("form-control")} onChange={onChangeHandler} />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      :
      <Col
      md="6"
      >
      <Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
      height={40}
      width={250}
      />
      </Col>

    }

    </Row>
    <Row>

{
  PartnerDetails ?



      <Col
      md="12"
      >
         <div className=" mb-3">
        <label className="form-label">Address: </label>
        <div className="input-group">

          <input type="text" disabled required defaultValue={PartnerDetails?.addressPartner} placeholder="Enter the business address"  name={"addressPartner"} className={classNames("form-control")} onChange={onChangeHandler} />
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      :
      <Col
      md="6"
      >
      <Skeleton
       style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }

      height={40}
      width={250}
      />
      </Col>

    }
    </Row>
    <Row>
    {
      PartnerDetails ?

      <Col
      md="6"
      >
         <div className=" mb-3">
        <label className="form-label">Email: </label>
        <div className="input-group">

          <input type="text" disabled required defaultValue={PartnerDetails?.email}   placeholder="Enter the business email address" name={"email"} className={classNames("form-control")} onChange={onChangeHandler}/>
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      :
      <Col
      md="6"
      >
      <Skeleton
       style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }

      height={40}
      width={250}
      />
      </Col>

    }
    {
      PartnerDetails ?

      <Col
      md="6"
      >
         <div className=" mb-">
        <label className="form-label">Phone Number:</label>
        <div className="input-group">

          <input type="text" disabled required defaultValue={PartnerDetails?.name}  placeholder="Enter the business phone number"  name={"phoneNumber"} className={classNames("form-control")} onChange={onChangeHandler}/>
          {/* {
            errors && (<div  className="invalid-feedback">
            {errors}
          </div>)
          } */}
        </div>
      </div>
      </Col>
      :
      <Col
      md="6"
      >
      <Skeleton
       style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }

      height={40}
      width={250}
      />
      </Col>

    }
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
      md="4"
      >
         <div className=" mb-3">
        {
            !error?.success && (<span style={{color:"red"}}>
  {error?.success ? "" : error?.error}
            </span>)
          }
          <div   >
            {/* {errors}dfds */}
          </div>
      </div>
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

  export default PartnerDetails;
