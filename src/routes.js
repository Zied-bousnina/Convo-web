
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps";
import RequestsMunicpal from "./components/RequestsMunicpal";
import ListOfUsers from "components/ListOfUsers";
import UserDetails from "components/UserDetails";
import PartnershipList from "components/PartnershipList";
import QuoteList from "components/QuoteList";
import TechnicalAssistanceList from "components/TechnicalAssistanceList";
import ContactsList from "components/ContactsList";
import PartnerDetails from "components/DetailsPartnership";
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
    path: "/List-demandes",
    name: "List Of Requests",
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
    path: "/feedbacks",
    name: "Feedbacks",
    icon: "ni ni-books text-green",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/Report",
    name: "Reports",
    icon: "ni ni-curved-next text-red",
    component: RequestsMunicpal,
    layout: "/admin"
  },
  {
    path: "/request-details/:id",
    name: "binDetails",
    icon: "ni ni-single-02 text-yellow",
    component: RequestDetails,
    layout: "/admin"
  },


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
