
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps";
import RequestsMunicpal from "./components/RequestsMunicpal";
import ListOfUsers from "components/ListOfUsers";
import UserDetails from "components/UserDetails";
import PartnershipList from "components/PartnershipList";
import QuoteList from "components/QuoteList";
import TechnicalAssistanceList from "components/TechnicalAssistanceList";
import ContactsList from "components/ContactsList";
// import PartnerDetails from "components/DetailsPartnership";
import QuoteDetail from "components/QuoteDetails";
import TechAssistDetail from "components/TechAssistDetail";
import ContactDetails from "components/ContactDetails";
import CreateBin from "components/CreateBin";
import ListOfBins from "components/ListOfBins";
import ListOfPointBin from "components/ListOfPointBin";
import CreateBinPoint from "components/CreatePointBin";
import ShowBinDetails from "components/ShowBinDetails";
import EditBin from "components/EditBin";
import PointBinDetails from "components/PointBinDetails";
import EditPointBin from "components/EditPointBins";
import MunicipalDetails from "components/MunicipalDetails";
import MapsComponent from "components/MapsComponent";

import CreateRequest from "components/CreateRequest";
import ListOfDemandes from "components/ListOfDemandes";
import RequestDetails from "components/RequestDetails";
import ListOfPartners from "components/Partner/PartnerList";
import PartnerDetails from "components/Partner/PartnerDetail";
import AddPartner from "components/Partner/AddPartner";
import EditPartner from "components/Partner/EditPartner";
import ListOfDrivers from "components/Driver/DriverList";
import AddDriver from "components/Driver/AddDriver";
import EditDriver from "components/Driver/EditDriver";
import DriverDetails from "components/Driver/DriverDetails";
import MapsComponentPartner from "components/PartnerDashboard/MapsComponentPartner";
import EditMission from "components/EditMission";
import SpecifiqueMission from "components/Driver/SpecifiqueMission";



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: MapsComponent,
    layout: "/admin"
  },
  {
    path: "/Mapcomponent",
    name: "map component",
    icon: "ni ni-folder-17 text-yellow",
    component: MapsComponent,
    layout: "/admin"
  },
  {
    path: "/SpecifiqueMission/:id",
    name: "Create Mission",
    icon: "ni ni-folder-17 text-yellow",
    component: SpecifiqueMission,
    layout: "/admin"
  },
  {
    path: "/List-demandes",
    name: "List Of Missions",
    icon: "ni ni-folder-17 text-yellow",
    component: ListOfDemandes,
    layout: "/admin"
  },
  {
    path: "/AddRequest",
    name: "Create request",
    icon: "ni ni-building text-red",
    component: CreateRequest,
    layout: "/admin"
  },
  {
    path: "/edit-mission/:id",
    name: "Create request",
    icon: "ni ni-building text-red",
    component: EditMission,
    layout: "/admin"
  },
  {
    path: "/AddPartner",
    name: "Add Partner",
    icon: "ni ni-building text-red",
    component: AddPartner,
    layout: "/admin"
  },
  {
    path: "/PartnerList",
    name: "Partners",
    icon: "ni ni-building text-red",
    component: ListOfPartners,
    layout: "/admin"
  },

  {
    path: "/request-details/:id",
    name: "requestDetails",
    icon: "ni ni-single-02 text-yellow",
    component: RequestDetails,
    layout: "/admin"
  },
  {
    path: "/partner-details/:id",
    name: "partnerdetails",
    icon: "ni ni-single-02 text-yellow",
    component: PartnerDetails,
    layout: "/admin"
  },
  {
    path: "/edit-Partner/:id",
    name: "Edit partner",
    icon: "ni ni-building text-red",
    component: EditPartner,
    layout: "/admin"
  },

  {
    path: "/DriverList",
    name: "Drivers",
    icon: "fa fa-car text-info ",
    component: ListOfDrivers,
    layout: "/admin"
  },

  {
    path: "/AddDriver",
    name: "Add Driver",
    icon: "ni ni-building text-red",
    component: AddDriver,
    layout: "/admin"
  },
  {
    path: "/edit-Driver/:id",
    name: "Edit Driver",
    icon: "ni ni-building text-red",
    component: EditDriver,
    layout: "/admin"
  },
  {
    path: "/driver-details/:id",
    name: "driver details",
    icon: "ni ni-single-02 text-yellow",
    component: DriverDetails,
    layout: "/admin"
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: MapsComponentPartner,
    layout: "/partner"
  },
  {
    path: "/AddRequest",
    name: " create a mission",
    icon: "ni ni-building text-red",
    component: CreateRequest,
    layout: "/partner"
  },
  // {
  //   path: "/DriverList",
  //   name: "Drivers",
  //   icon: "fa fa-car text-info ",
  //   component: ListOfDrivers,
  //   layout: "/partner"
  // },

  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
