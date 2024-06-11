
import {combineReducers} from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import LoadingReducer from './LoadingReducer';
import requestSentsuccesReducer from './requestSentsuccesReducer';
import profileReducers from './profile.reducers';
import UserStatistiquesReducers from './UserStatistiques.reducers';
import AllUsersReducers from './AllUsers.reducers';
import UserDetailsReducer from './userDetails.reducers';
import PartnerShipListReducer from './PartnerShipList.reducer';
import PartnerDetaisReducer from './PartnerDetais.reducer';
import ContactListReducers from './ContactList.reducers';
import ContactDetailsReducer from './ContactDetails.reducer';
import DemanedestatistiquesReducer from './Demanedestatistiques.reducer';
import DemandeDriverRedicers from './DemandeDriver.redicers';
import SingleDemandeReducer from './SingleDemande.reducer';
import DriversListReducer from './DriversList.reducer';
import partnerStatsReducer from './partnerStats.reducer';
import missionsByPartnersReducer from './missionsByPartners.reducer';
import MissionCountByPartner from './MissionCountByPartner';
import DriverTableLoading from './DriverTableLoading';
import MissionTaleReload from './MissionTaleReload';
import partnerTableReload from './partnerTableReload';
import MissionByPartnerV2 from './MissionByPartnerV2';
import AllCategorieReducer from './AllCategorie.reducer';
import categorieDetailsReducer from './categorieDetails.reducer';
import DevisByPartnerReducer from './DevisByPartner.reducer';
import recentchatReducer from './recentchat.reducer';
import chattingReducer from './chattingReducer';
import { notyficationReducer } from './notification.reducer';
import { serachReducer } from './searching.reducer';
import CurrentUserReducer from './CurrentUser.reducer';
import DevisByCurrenPartnerReducer from './DevisByCurrenPartner.reducer';
import devisDetailReducer from './devisDetail.reducer';
import notiReducer from './noti.reducer';
import specifiqueMissionByPartnerReducer from './specifiqueMissionByPartner.reducer';
import facturesReducer from './factures.reducer';
import SingleFactureReducer from './SingleFacture.reducer';
import ListFacturesPartnerReducer from './ListFacturesPartner.reducer';
import FactureDetailsReducer from './FactureDetails.reducer';
import FacturesByDriverReducer from './FacturesByDriver.reducer';
import StatistiquesPartnerReducer from './StatistiquesPartner.reducer';
import AmmountStatsReducer from './AmmountStats.reducer';
// import MissionByPartnerReducer from './MissionByPartner.reducer';
export default combineReducers({
    currentUser:CurrentUserReducer,
    auth:authReducer,
    error:errorReducer,
    isLoading: LoadingReducer,
    success:requestSentsuccesReducer,
    profile: profileReducers,
    userStatistiques: UserStatistiquesReducers,
    users: AllUsersReducers,
    UsersDetails: UserDetailsReducer,
    partnerShipList: PartnerShipListReducer,
    partnerDetails: PartnerDetaisReducer,
    contactList : ContactListReducers,
    ContactDetails : ContactDetailsReducer,
    demandestatistiques : DemanedestatistiquesReducer,
    DemandeDriver : DemandeDriverRedicers,
    Demande : SingleDemandeReducer  ,
    drivers : DriversListReducer  ,
    partnerStats : partnerStatsReducer  ,
    partnersMissions : missionsByPartnersReducer  ,
    MissionsStatistiqueByPartner : MissionCountByPartner  ,
    TableDriverLoading : DriverTableLoading,
    MissionTableLoad : MissionTaleReload,
    PartnerTableLoad: partnerTableReload,
    MissionByPartnerV2 :  MissionByPartnerV2,
    AllCategories :  AllCategorieReducer,
    categorie :  categorieDetailsReducer,
    DevisByPartner :  DevisByPartnerReducer,
    recentChat :  recentchatReducer,
    chatting :  chattingReducer,
    notification :  notyficationReducer,
    search :  serachReducer,
    DevisByCurrenPartner :  DevisByCurrenPartnerReducer,
    devisDetails :  devisDetailReducer,
    noti :  notiReducer,
    specifiqueDevis :  specifiqueMissionByPartnerReducer,
    factures: facturesReducer,
    singleFacture: SingleFactureReducer,
    facturesByPartner: ListFacturesPartnerReducer,
    factureDetailsAdmin: FactureDetailsReducer,
    factureDriver: FacturesByDriverReducer,
    statistiquesPartnerMission: StatistiquesPartnerReducer,
    Ammount: AmmountStatsReducer,

})