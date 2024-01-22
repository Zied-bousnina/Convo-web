/* eslint-disable react-hooks/rules-of-hooks */
import {Button,Card,CardHeader,CardBody,Container,Row,Col} from "reactstrap";
  import UserHeader from "components/Headers/UserHeader.js";
  import { useDispatch, useSelector } from "react-redux";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import React, { useEffect, useRef, useState } from "react";
  import classNames from "classnames";
  import { SET_IS_SECCESS } from "Redux/types";
import Chart from "chart.js";
import { useHistory } from 'react-router-dom';
import { chartOptions,parseOptions} from "../../../variables/charts.js";
import { GetAllUsers } from "Redux/actions/userAction.js";
import {Link} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { AddDemande } from "Redux/actions/Demandes.Actions.js";
import { useParams } from "react-router-dom";
import { FindRequestDemandeById } from "Redux/actions/Demandes.Actions.js";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Divider, Switch } from "@chakra-ui/react";
import Skeleton from "react-loading-skeleton";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button as Btn} from 'primereact/button';
import { SET_SINGLE_DEMANDE } from "Redux/types.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from 'primereact/dialog';
import { FindAllCategories } from "Redux/actions/Demandes.Actions.js";
import { siretMask } from "text-mask-siret";
import MaskedInput from "react-text-mask";
import FileInput from "components/FileInput.jsx";
import Select from 'react-select'
import { AddDevis } from "Redux/actions/Demandes.Actions.js";
import { SET_ERRORS } from "Redux/types.js";
import { socket } from "socket.js";
import { FinddevisByPartner } from "Redux/actions/Demandes.Actions.js";
import { FinddevisById } from "Redux/actions/Demandes.Actions.js";
import { rejectDevis } from "Redux/actions/Demandes.Actions.js";





  const devisDetail = () => {

    const navigate = useHistory();
    const isSuccess = useSelector(state=>state?.success?.success)
    const SingleDemande = useSelector(state=>state?.Demande?.demandes?.demande)
    const devsList = useSelector(state=>state?.devisDetails?.devisDetails?.devis)
    const Categories = useSelector(state=>state?.AllCategories?.categorie?.categorie)
    const { user } = useSelector((store) => store.auth);
    const { id } = useParams();
    const dispatch = useDispatch()
    const colourOptions = []
    const [selectedValues, setSelectedValues] = useState();
    useEffect(() => {
      dispatch(FinddevisById(id))

    }, [ devsList?.length])
    console.log("555555555555555555",devsList)
    useEffect(() => {
      // socket = io(SERVER_POINT);
      socket.emit("setup", user);
      socket.on("connected", () => {
        // setconnectedtosocket(true);
      });
    }, []);
    // useEffect(() => {
    //   //_id is of selected chat so that user can join same chat room
    //   if (!_id) return;
    //   dispatch(fetchCurrentMessages(_id, token, socket));

    //   currentChattingWith = _id;
    // }, [_id]);
    // useEffect(() => {
    //   socket.on("message recieved", (newMessage) => {
    //     if (!currentChattingWith || currentChattingWith !== newMessage.chat._id) {
    //       handleNotyfy(newMessage);
    //     } else {
    //       dispatch(sendMessage(newMessage));
    //     }
    //   });
    // }, []);
    useEffect(() => {

        dispatch(FindAllCategories())
      }, [ Categories?.length])
    const handleSelectChange = (selectedOptions) => {


        setSelectedValues(selectedOptions);
    };
    Categories?.map(e=>{
      colourOptions.push({value:e._id, label:`${e.description}|[${e.unitPrice}]`,
        unitPrice:e.unitPrice,
    })

    })

    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })
    const showToastMessage = () => {
      toast.success('Reaquest created successfully.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
    }
    const [form, setForm] = useState({
    })
useEffect(() => {
      if (isSuccess) {
        showToastMessage()
      }
    }, [isSuccess])


    const AllUsers = useSelector(state => state?.users?.users?.users);
    useEffect(() => {
      dispatch(GetAllUsers())
    }, [dispatch,AllUsers?.length])

    // --------------------------------------------------------------------------------------------
    const [selectedItem, setselectedItem] = useState(null)
  const [selectedStatus, setselectedStatus] = useState()
  const [selectedProduct, setSelectedProduct] = useState(null);
    const error = useSelector(state=>state.error?.errors)


    // const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const [isLoad, setisLoad] = useState(false)
    const [loadid, setLoadid] = useState(1)
    const click =  (id)=> {
        setLoadid(id)
        setisLoad(true)
        setTimeout(() => {
            setisLoad(false)
            const url = `/partner/factures/`; history.push(url);
        }, 1000);
    }
    // const [form, setForm] = useState({})
    const mask = siretMask;
    const onChangeHandler = (e) => {
        const { name, value } = e.target;



          setForm({
            ...form,
            [name]: value,
          });


      };
    const onChangeHandlerFile = (e) => {
      const { name, checked, value } = e.target;

      setForm({
        ...form,
        kbis: e.target.files[0],
      });
    };
    // const isSuccess = useSelector(state=>state?.success?.success)
    const history = useHistory();
    const [tab, settab] = useState("admin")
    const requests = useSelector(state=>state?.DemandeDriver?.demandes?.demands)
    const requestsByPartner = useSelector(state=>state?.partnersMissions?.demandes?.demands)
    const dt = useRef(null);
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
      const user2 = useSelector(state=>state?.auth?.user)
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
        const filteredData = (selectedStatus ? devsList?.devisList.filter(item => item.status === selectedStatus) : devsList?.devisList) ;


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
  const [dialogVisible, setDialogVisible] = useState(false);
  const [confirme, setconfirme] = useState(false)
  const [Rectification, setRectification] = useState(0)
  const dialogFooterTemplate = () => {
    return <Btn label="Ok" icon="pi pi-check" onClick={() => setDialogVisible(false)} />;
};

useEffect(() => {
  dispatch({
    type: SET_ERRORS,
    payload: {}})
}, [])
// ((selectedValues?.unitPrice
//   + Rectification)
//    *
//   SingleDemande?.distance
//   ).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})
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
const onSubmit = async (e) => {
  e.preventDefault();
  if((confirme ?
    (Number(selectedValues?.unitPrice  ) * Number(SingleDemande?.distance) )
    :
    (Number(selectedValues?.unitPrice  ) * Number(SingleDemande?.distance)  +Number (Rectification))) <0
    ) {
    toast.error('Montant ne peut pas être négatif.', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
  });

    }
const data = {
  categorie:selectedValues?.value,
  mission: SingleDemande?._id,
  montant:
  confirme ?
  (Number(selectedValues?.unitPrice  ) * Number(SingleDemande?.distance) ).toString()
  :
  (Number(selectedValues?.unitPrice  ) * Number(SingleDemande?.distance)  +Number (Rectification)).toString(),
  partner:   SingleDemande?.user?.contactName && SingleDemande?.user?._id,
  distance :
  SingleDemande?.distance,
  rectification: Rectification ?
  Rectification.toString()
  :
  "0"
}
dispatch(AddDevis(data, navigate, user2))
  e.target.reset();
};
    return (
      <>
        <UserHeader />
        <Container className="mt--7" fluid>
        <Row>
        <Col xl="4"
          style={{marginBottom:"20px"}}
           >
            <Card className="shadow "
            style={{ height: "120vh", marginBottom:10 }}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <Col
                    xs="8"
                  >
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                     mission details

                    </h6>
                    <h2 className="mb-0">Directions</h2>
                  </Col>
                  {/* <Col className="text-right" xs="4">
                    <Link
                            to={`/admin/edit-mission/${id}`}
                            >
                      <Button
                        size="sm"
                        >  Edit
                        <i className=" ml-2 fas fa-arrow-right" />
                      </Button>
                        </Link>
                    </Col> */}

                </Row>
              </CardHeader>
              <CardBody
              >
                <div className="chart">

      <form onSubmit={onSubmit}
style={
  {
    borderRadius:"5px",
    justifyContent: 'center',
    alignItems: 'center',
  }
}
>
{SingleDemande?.user?.contactName&&


<>

<hr/>
</>
}

<fieldset>
<legend>Information Générales</legend>
</fieldset>



{
    devsList ?

<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Starting point</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="Choose starting point, or click on the map"
          value={devsList?.mission?.address?.display_name}
          name={"start"}
          className={classNames("form-control")}
          disabled

        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
}
 {
    devsList ?

<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">Addresse arrivée</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="Choose destination, or click on the map"
          value={devsList?.mission?.destination?.display_name}
          name={"destination"}
          className={classNames("form-control")}
          disabled
        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}

/>
 }

{
    devsList?.mission?.missionType?
<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">mission Type
</label>
      <div className="input-group">
        <input
          type="text"
          // placeholder="Choose starting point, or click on the map"
          value={ devsList?.mission?.missionType}
          name={"start"}
          className={classNames("form-control")}
          disabled
        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}
/>
}
{
    devsList?.mission?.vehicleType?
<Row>
  <Col md="12">
    <div className=" mb-3">
      <label className="form-label">
vehicle Type
</label>
      <div className="input-group">
        <input
          type="text"
          // placeholder="Choose starting point, or click on the map"
          value={ devsList?.mission?.vehicleType
}
          name={"start"}
          className={classNames("form-control")}
          disabled
        />
      </div>
    </div>
  </Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}
/>
}


{
    devsList ?
<Row>
<Col>
<label className="form-label">Distance (Km) ~</label>
<div className="input-group">
  <input
    type="text"
    placeholder="Choose distance of mission"
    value={ `~${Math.floor(devsList?.mission?.distance)} km`}
    name={"distance"}
    className={classNames("form-control")}
    disabled
  />
</div>
</Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}
/>
}

{/* {
  SingleDemande ?
  <Row>
    <Col
    className="col-12"
    style={{
      height: "60vh",
      width: "85%",
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }}
    >
    <Link
    to={`/admin/edit-mission/${SingleDemande?._id}`}
    // target="_blank"
    state={{ SingleDemmande : SingleDemande}}
    >
    <Button
    className="btn-icon btn-3"
    color="primary"
    type="button"
    >
    <span className="btn-inner--icon">
    <i className="ni ni-bold-right"></i>
    </span>
    <span className="btn-inner--text">Devise </span>
    </Button>
    </Link>
  </Col>
  </Row>
  :
  <Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={150}
height={50}

/>
} */}

</form>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className=" mb-xl-0" xl="8">
            <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">

                      <h3 className="mb-0">Devis</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Link
                            to={`/partner/factures`}
                            >

                      <Button
                        // color="primary"

                        size="md"
                        >  factures
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
    {/* {
    devsList ?
<Row>
<Col>
<label className="form-label">categorie </label>
<div className="input-group">
  <input
    type="text"
    placeholder="Choose distance of mission"
    value={ `${devsList?.categorie?.description} `}
    name={"distance"}
    className={classNames("form-control")}
    disabled
  />
</div>
</Col>
</Row>
:
<Skeleton
  style={
    {
      marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
        marginBottom:"20px"
    }
  }
width={300}
height={30}
/>
} */}
<hr/>
    <Row>
    <Col md="12">
  {devsList?.montant && (
    <Alert
  status='info'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
//   height='200px'
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>
    Montant proposé!
  </AlertTitle>
  <AlertDescription maxWidth='sm'>
   {
        (
            devsList?.montant
        ).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})

   }
  </AlertDescription>
</Alert>
  )}
</Col>




    </Row>
    <hr/>
    {
        selectedValues?.unitPrice &&

    <Row>
      <Col
      md="12"
      >
            <div className=" mb-3 ">
        <label className="form-label">Confirmer montant proposé  <span>   :  </span></label>

      <Switch
        id="offer"
       size='lg'
         colorScheme="green"
        defaultChecked={false}
        onChange={(e)=>{
            setconfirme(e.target.checked)
        }}

       />

        </div>
      </Col>

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
    }


    <hr/>
















{
  devsList?.status =="Devis" &&


    <Row>
      <Col
        md="2"
      >
      <button type="button" className="btn btn-outline-success"
        onClick={()=>{
            socket.emit("accept devis",devsList);
            click(1)

            }
        }
      >
      {isLoad && loadid==1 ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          'Accepté'
        )}

                    <i className="fa-solid fa-floppy-disk"></i>
                  </button></Col>
                  <Col
                  md="2">
      <button
        onClick={()=>{
            // socket.emit("reject devis",devsList);
            click(2)
            socket.emit("refuse devis",devsList);
            dispatch(rejectDevis(devsList?._id))
            }
        }
      type="button" className="btn btn-danger">
      {isLoad&& loadid==2 ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          'Rejeté'
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
        <ToastContainer />
      </Container>

      </>
    );
  };

  export default devisDetail;
