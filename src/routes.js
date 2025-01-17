
import Profile from "views/examples/Profile.js";

// import PartnerDetails from "components/DetailsPartnership";

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
import CreateMission from "components/PartnerDashboard/CreateMission";
import ListOfMissions from "components/PartnerDashboard/ListOfMissions";
import DriverDetailsForPartner from "components/PartnerDashboard/DriverDetailsForPartner";

import requestDetailsPartner from "components/PartnerDashboard/requestDetailsPartner";
import editMissionPartner from "components/PartnerDashboard/editMissionPartner";
import AddCategorie from "components/Factures/AddCategorie";
import CreateDevise from "components/Factures/CreateDevise";
import EditDevis from "components/Factures/EditDevis";
import ListCategorie from "components/Factures/ListCategorie";
import CategorieDetails from "components/Factures/CategorieDetails";
import UpdateCategorie from "components/Factures/UpdateCategorie";

import ListOfFacturesPartner from "components/PartnerDashboard/factures/ListOfFacturesPartner";
import devisDetail from "components/PartnerDashboard/factures/devisDetails";
import GenererFacture from "components/Factures/GenererFacturePar";
import FactureDetails from "components/PartnerDashboard/factures/FactureDetails";
import EditProfile from "components/profile/EditProfile";
import ProfilePartner from "components/PartnerDashboard/profilePartner";
import EditProfilePartner from "components/PartnerDashboard/EditProfile";
import ListFactures from "components/Factures/ListFactures";
import FactureDEtails from "components/Factures/FactureDEtails";
import ListFacturesDriver from "components/Factures/ListFacturesDriver";
import FactureDriverDEtails from "components/Factures/FactureDriverDetails";
import Devis from "components/PartnerDashboard/devis";
import NotificationPage from "components/Notification/NotificationPage";
// import { UpdateCategorie } from "Redux/actions/Demandes.Actions";



var routes = [
  {
    path: "/index",
    name: "Accueil",
    icon: "ni ni-tv-2 text-primary",
    component: MapsComponent,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "notifications",
    icon: "ni ni-tv-2 text-primary",
    component: NotificationPage,
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
    name: "Liste des missions",
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
    path: "/edit-mission/:id",
    name: "Create request",
    icon: "ni ni-building text-red",
    component: editMissionPartner,
    layout: "/partner"
  },
  {
    path: "/notifications",
    name: "notifications",
    icon: "ni ni-tv-2 text-primary",
    component: NotificationPage,
    layout: "/partner"
  },
  {
    path: "/devis/:id",
    name: "Devis",
    icon: "ni ni-building text-red",
    component: Devis,
    layout: "/partner"
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
    name: "Partenaires",
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
    path: "/request-details/:id",
    name: "requestDetails",
    icon: "ni ni-single-02 text-yellow",
    component: requestDetailsPartner,
    layout: "/partner"
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
    name: "conducteurs",
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
    path: "/createDevis/:id",
    name: "create devis",
    icon: "ni ni-single-02 text-yellow",
    component: CreateDevise,
    layout: "/admin"
  },
  {
    path: "/editdevis/:id",
    name: "create devis",
    icon: "ni ni-single-02 text-yellow",
    component: EditDevis,
    layout: "/admin"
  },
  {
    path: "/updateCategorie/:id",
    name: "modifier categorie",
    icon: "ni ni-single-02 text-yellow",
    component: UpdateCategorie,
    layout: "/admin"
  },
  {
    path: "/ListCategorie/",
    name: "create devis",
    icon: "ni ni-single-02 text-yellow",
    component: ListCategorie,
    layout: "/admin",
    invisible:true
  },
  {
    path: "/catDetails/:id",
    name: "Détails de la Catégorie",
    icon: "ni ni-single-02 text-yellow",
    component: CategorieDetails,
    layout: "/admin",
    invisible:true
  },
  {
    path: "/genererFacture",
    name: "Générer Facture",
    icon: "ni ni-single-02 text-yellow",
    component: GenererFacture,
    layout: "/admin",
    invisible:true
  },
  {

    path: "/ListFacture",
    name: "Factures",
    // miniName: "P",
    component: ListFactures,
    icon: "ni ni-money-coins text-info",
    layout: "/admin",
    invisible:true
  },
  {

    path: "/ListFactureDrivers",
    name: "Facture conducteurs",
    // miniName: "P",
    component: ListFacturesDriver ,
    icon: "ni ni-money-coins text-info",
    layout: "/admin",
    // collapse: true,
    invisible:true
  },
  {
    path: "/factures",
    name: "Gérer les paramètres",
    // miniName: "P",
    // collapse: true,
    component: AddCategorie,
    icon: "ni ni-ui-04 text-info",
    layout: "/admin",
    invisible:true
  },
  {

    path: "/ListCategorie",
    name: "Liste Categorie",
    // miniName: "P",
    component: ListCategorie,
    icon: "ni ni-money-coins text-info",
    layout: "/admin",
    // collapse: true,
    invisible:true
  },


  {
    path: "/factures",
    name: "Facturation",
    icon: "ni ni-folder-17 text-red",
    component: AddCategorie,
    layout: "/admin",
    collapse: true,
    views: [
      {
        path: "/factures",
        name: "Gérer les paramètres",
        // miniName: "P",
        // collapse: true,
        component: AddCategorie,
        icon: "ni ni-ui-04 text-info",
        layout: "/admin",
      },
      {

        path: "/ListCategorie",
        name: "Liste Categorie",
        // miniName: "P",
        component: ListCategorie,
        icon: "ni ni-money-coins text-info",
        layout: "/admin",
        // collapse: true,
      },
      {

        path: "/genererFacture",
        name: "Générer Facture",
        // miniName: "P",
        component: GenererFacture,
        icon: "ni ni-money-coins text-info",
        layout: "/admin",
        // collapse: true,
      },
      {

        path: "/ListFacture",
        name: "Facture partenaires",
        // miniName: "P",
        component: ListFactures,
        icon: "ni ni-money-coins text-info",
        layout: "/admin",
        // collapse: true,
      },
      {

        path: "/ListFactureDrivers",
        name: "Facture conducteurs",
        // miniName: "P",
        component: ListFacturesDriver ,
        icon: "ni ni-money-coins text-info",
        layout: "/admin",
        // collapse: true,
      },
      // {

      //   path: "/devis",
      //   name: "Créer Facture",
      //   miniName: "P",
      //   component: ListOfFactures,
      //   icon: "ni ni-single-copy-04 text-pink",
      //   layout: "/admin",
      // },
    ]

  },
  {
    path: "/driver-details/:id",
    name: "driver details",
    icon: "ni ni-single-02 text-yellow",
    component: DriverDetailsForPartner,
    layout: "/partner"
  },
  {
    path: "/index",
    name: "Accueil",
    icon: "ni ni-tv-2 text-primary",
    component: MapsComponentPartner,
    layout: "/partner"
  },
  {
    path: "/AddRequest",
    name: "j’obtiens mon devis",
    icon: "ni ni-delivery-fast text-primary",
    component: CreateMission,
    layout: "/partner"
  },
  {
    path: "/List-demandes",
    name: "Liste des missions",
    icon: "ni ni-folder-17 text-yellow",
    component: ListOfMissions,
    layout: "/partner"
  },
  {
    path: "/devisDetail/:id",
    name: "devis details",
    icon: "ni ni-folder-17 text-yellow",
    component: devisDetail,
    layout: "/partner"
  },
  {
    path: "/historique-facture",
    name: "Historique factures",
    // miniName: "P",
    // collapse: true,
    component: ListOfFacturesPartner,
    icon: "ni ni-ui-04 text-info",
    layout: "/partner",
    invisible:true
  },
  {
    path: "/facture-details/:id",
    name: "facture",
    // miniName: "P",
    // collapse: true,
    component: FactureDetails,
    icon: "ni ni-ui-04 text-info",
    layout: "/partner",
    invisible:true
  },
  {
    path: "/facture-detailsPar/:id",
    name: "facture",
    // miniName: "P",
    // collapse: true,
    component: FactureDEtails,
    icon: "ni ni-ui-04 text-info",
    layout: "/admin",
    invisible:true
  },
  {
    path: "/facture-DriverdetailsPar/:id",
    name: "facture",
    // miniName: "P",
    // collapse: true,
    component: FactureDriverDEtails,
    icon: "ni ni-ui-04 text-info",
    layout: "/admin",
    invisible:true
  },
  {
    path: "/historique-facture",
    name: "Facturation",
    icon: "ni ni-folder-17 text-red",
    component: ListOfFacturesPartner,
    layout: "/partner",
    collapse: true,
    views: [

      {
        path: "/historique-facture",
        name: "Historique factures",
        // miniName: "P",
        collapse: true,
        component: ListOfFacturesPartner,
        icon: "ni ni-ui-04 text-info",
        layout: "/partner",
      },
      // {

      //   path: "/ListCategorie",
      //   name: "Liste Categorie",
      //   // miniName: "P",
      //   component: ListCategorie,
      //   icon: "ni ni-money-coins text-info",
      //   layout: "/partner",
      //   collapse: true,
      // },
      // {

      //   path: "/devis",
      //   name: "Créer Facture",
      //   miniName: "P",
      //   component: ListOfFactures,
      //   icon: "ni ni-single-copy-04 text-pink",
      //   layout: "/admin",
      // },
    ]

  },
  // {
  //   path: "/AddRequest",
  //   name: " create a mission",
  //   icon: "ni ni-building text-red",
  //   component: CreateMission,
  //   layout: "/partner"
  // },
  // {
  //   path: "/DriverList",
  //   name: "conducteurs",
  //   icon: "fa fa-car text-info ",
  //   component: ListOfDrivers,
  //   layout: "/partner"
  // },

  {
    path: "/user-profile",
    name: "Profil utilisateur",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/Edit-profile",
    name: "Profil utilisateur",
    icon: "ni ni-single-02 text-yellow",
    component: EditProfile,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Profil utilisateur",
    icon: "ni ni-single-02 text-yellow",
    component: ProfilePartner,
    layout: "/partner"
  },
  {
    path: "/Edit-profile",
    name: "Profil utilisateur",
    icon: "ni ni-single-02 text-yellow",
    component: EditProfilePartner,
    layout: "/partner"
  },
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
