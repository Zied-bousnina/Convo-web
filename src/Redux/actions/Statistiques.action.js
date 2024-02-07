import { SET_BIN_STATISTIQUES } from "Redux/types"
import { SET_PARTNER_STATISTIQUES } from "Redux/types";
import { SET_MISSION_BY_PARTNER_STATISTIQUES } from "Redux/types";
import { SET_DEMANDE_STATISTIQUES } from "Redux/types"
import { SET_STATISTIQUES } from "Redux/types"
import axios from "axios"
const baseUrl = "https://convoyage.onrender.com"
export const getUsersCounts = () => (dispatch) => {
    try {
      axios.get(`${baseUrl}/api/users/getUserCounts`)
        .then((res) => {

          dispatch({
            type: SET_STATISTIQUES,
            payload: res?.data,
          });
        })
        .catch((err) => {
          // Handle other errors if needed


          // You can dispatch an action to handle the error if necessary
          // dispatch({
          //   type: SET_ERRORS,
          //   payload: err?.response?.data,
          // });

          // You may also want to rethrow the error if you want it to propagate to the next catch block in the promise chain
          // throw err;
        });
    } catch (error) {
      // Handle synchronous errors if any (e.g., if axios.get throws an exception before the promise is settled)


      // You can dispatch an action to handle the error if necessary
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: error.message,
      // });

      // You may also want to rethrow the error if you want it to propagate to the next catch block outside this function
      // throw error;
    }
  };

  export const getPartnerCounts = () => (dispatch) => {
    try {
      axios.get(`${baseUrl}/api/users/getPartnerCounts`)
        .then((res) => {

          dispatch({
            type: SET_PARTNER_STATISTIQUES,
            payload: res?.data,
          });
        })
        .catch((err) => {
          // Handle other errors if needed


          // You can dispatch an action to handle the error if necessary
          // dispatch({
          //   type: SET_ERRORS,
          //   payload: err?.response?.data,
          // });

          // You may also want to rethrow the error if you want it to propagate to the next catch block in the promise chain
          // throw err;
        });
    } catch (error) {
      // Handle synchronous errors if any (e.g., if axios.get throws an exception before the promise is settled)


      // You can dispatch an action to handle the error if necessary
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: error.message,
      // });

      // You may also want to rethrow the error if you want it to propagate to the next catch block outside this function
      throw error;
    }
  };
  export const getMissionByPartnerCounts = () => (dispatch) => {
    try {
      axios.get(`${baseUrl}/api/users/getMissionsCountByUser`)
        .then((res) => {

          dispatch({
            type: SET_MISSION_BY_PARTNER_STATISTIQUES,
            payload: res?.data,
          });
        })
        .catch((err) => {
          // Handle other errors if needed



          // You can dispatch an action to handle the error if necessary
          // dispatch({
          //   type: SET_ERRORS,
          //   payload: err?.response?.data,
          // });

          // You may also want to rethrow the error if you want it to propagate to the next catch block in the promise chain
          // throw err;
        });
    } catch (error) {
      // Handle synchronous errors if any (e.g., if axios.get throws an exception before the promise is settled)


      // You can dispatch an action to handle the error if necessary
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: error.message,
      // });

      // You may also want to rethrow the error if you want it to propagate to the next catch block outside this function
      // throw error;
    }
  };




  export const getBinsCount = () => (dispatch) => {
    try {
      axios.get(`${baseUrl}/api/bin/getBinsCount`)
        .then((res) => {

          dispatch({
            type: SET_BIN_STATISTIQUES,
            payload: res?.data,
          });
        })
        .catch((err) => {
          // Handle other errors if needed


          // You can dispatch an action to handle the error if necessary
          // dispatch({
          //   type: SET_ERRORS,
          //   payload: err?.response?.data,
          // });

          // You may also want to rethrow the error if you want it to propagate to the next catch block in the promise chain
          // throw err;
        });
    } catch (error) {
      // Handle synchronous errors if any (e.g., if axios.get throws an exception before the promise is settled)


      // You can dispatch an action to handle the error if necessary
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: error.message,
      // });

      // You may also want to rethrow the error if you want it to propagate to the next catch block outside this function
      throw error;
    }
  };


  export const getDemandesCount = () => (dispatch) => {
    try {
      axios.get(`${baseUrl}/api/users/getDemandeCounts`)
        .then((res) => {

          dispatch({
            type: SET_DEMANDE_STATISTIQUES,
            payload: res?.data,
          });
        })
        .catch((err) => {
          // Handle other errors if needed


          // You can dispatch an action to handle the error if necessary
          // dispatch({
          //   type: SET_ERRORS,
          //   payload: err?.response?.data,
          // });

          // You may also want to rethrow the error if you want it to propagate to the next catch block in the promise chain
          // throw err;
        });
    } catch (error) {
      // Handle synchronous errors if any (e.g., if axios.get throws an exception before the promise is settled)


      // You can dispatch an action to handle the error if necessary
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: error.message,
      // });

      // You may also want to rethrow the error if you want it to propagate to the next catch block outside this function
      throw error;
    }
  };
