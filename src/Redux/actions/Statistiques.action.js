import { SET_BIN_STATISTIQUES } from "Redux/types"
import { SET_DEMANDE_STATISTIQUES } from "Redux/types"
import { SET_STATISTIQUES } from "Redux/types"
import axios from "axios"

export const getUsersCounts = () => (dispatch) => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/api/users/getUserCounts`)
        .then((res) => {
          // console.log(res)
          dispatch({
            type: SET_STATISTIQUES,
            payload: res?.data,
          });
        })
        .catch((err) => {
          // Handle other errors if needed
          console.error("Error in getUsersCounts:", err);

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
      console.error("Synchronous error in getUsersCounts:", error);

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
      axios.get(`${process.env.REACT_APP_API_URL}/api/bin/getBinsCount`)
        .then((res) => {
          // console.log(res)
          dispatch({
            type: SET_BIN_STATISTIQUES,
            payload: res?.data,
          });
        })
        .catch((err) => {
          // Handle other errors if needed
          console.error("Error in getBinsCount:", err);

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
      console.error("Synchronous error in getBinsCount:", error);

      // You can dispatch an action to handle the error if necessary
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: error.message,
      // });

      // You may also want to rethrow the error if you want it to propagate to the next catch block outside this function
      // throw error;
    }
  };


  export const getDemandesCount = () => (dispatch) => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/api/users/getDemandeCounts`)
        .then((res) => {
          // console.log(res)
          dispatch({
            type: SET_DEMANDE_STATISTIQUES,
            payload: res?.data,
          });
        })
        .catch((err) => {
          // Handle other errors if needed
          console.error("Error in getDemandesCount:", err);

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
      console.error("Synchronous error in getDemandesCount:", error);

      // You can dispatch an action to handle the error if necessary
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: error.message,
      // });

      // You may also want to rethrow the error if you want it to propagate to the next catch block outside this function
      // throw error;
    }
  };
