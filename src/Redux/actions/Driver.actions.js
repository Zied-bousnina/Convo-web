import { SET_BIN_STATISTIQUES } from "Redux/types"
import { SET_DEMANDES_MUNICIPAL } from "Redux/types"
import { SET_IS_SECCESS } from "Redux/types"
import { SET_PARTNER_DETAILS } from "Redux/types"
import { SET_IS_LOADING_DRIVER_TABLE } from "Redux/types"
import { SET_ALL_DRIVER } from "Redux/types"
import { SET_PARTNERSHIP_LIST } from "Redux/types"
import { SET_IS_LOADING } from "Redux/types"
import { SET_ERRORS } from "Redux/types"
import { SET_STATISTIQUES } from "Redux/types"
import axios from "axios"


const baseUrl = "https://convoyage.onrender.com"
export const FetchAllDrivers = ()=>dispatch=>{
  dispatch({
    type:SET_IS_LOADING_DRIVER_TABLE,
    payload:true
  })
  axios.get(`${baseUrl}/api/users/driver/fetchAll` )
  .then(res => {


      dispatch({
        type: SET_ALL_DRIVER,
        payload: res.data
    })

    dispatch({
      type:SET_IS_LOADING_DRIVER_TABLE,
      payload:false
    })






      // dispatch(registerGoogleUser(data))

      // dispatch(loginUser(data))
  })
  .catch(err =>
     {


      dispatch({
          type: SET_ERRORS,
          payload: err?.response?.data
      })
      dispatch({
        type:SET_IS_SECCESS,
        payload:false
    })
    dispatch({
      type:SET_IS_LOADING_DRIVER_TABLE,
      payload:false
    })

      // dispatch(registerGoogleUser(data))
  }
  )
}

export const CreateDriver = (data)=>dispatch=>{
    dispatch({
      type: SET_ERRORS,
      payload: []
  })
  dispatch({
      type:SET_IS_LOADING,
      payload:true
  })




    axios.post(`${baseUrl}/api/users/driver/AddDriver`,data, {
      headers: { "Content-Type": "multipart/form-data" }
    } )
    .then(res => {

        dispatch({
          type: SET_ERRORS,
          payload: []
      })
      dispatch({
          type:SET_IS_LOADING,
          payload:false
      })

      dispatch({
        type:SET_IS_SECCESS,
        payload:true
    })

    setTimeout(() => {
      dispatch({
        type:SET_IS_SECCESS,
        payload:false
    })
    }, 3000);



        // dispatch(registerGoogleUser(data))

        // dispatch(loginUser(data))
    })
    .catch(err =>
       {

        dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
        })
        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        dispatch({
          type:SET_IS_SECCESS,
          payload:false
      })

        // dispatch(registerGoogleUser(data))
    }
    )
  }

  export const UpdateDriver = (id,driverData)=>dispatch=>{
    dispatch({
      type: SET_ERRORS,
      payload: []
  })
  dispatch({
      type:SET_IS_LOADING,
      payload:true
  })
    axios.post(`${baseUrl}/api/users/driver/updateDriver/${id}`,driverData)
    .then(res => {
      dispatch({
        type: SET_ERRORS,
        payload: []
    })
    setTimeout(() => {

        dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
    }, 1000);
    dispatch({
        type:SET_IS_SECCESS,
        payload:true
    })
    setTimeout(() => {
        dispatch({
          type:SET_IS_SECCESS,
          payload:false
      })
      }, 3000);
    })
    .catch(err =>
       {

        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })

  dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })
        // dispatch(registerGoogleUser(data))
    }
    )
  }

  export const activateDriverAccount = (id)=>dispatch=>{
    dispatch({
      type: SET_ERRORS,
      payload: []
  })
  dispatch({
      type:SET_IS_LOADING,
      payload:true
  })
    axios.post(`${baseUrl}/api/users/driver/ValiderDriverAccount/${id}`)
    .then(res => {
      dispatch({
        type: SET_ERRORS,
        payload: []
    })
    setTimeout(() => {

        dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
    }, 1000);
    dispatch({
        type:SET_IS_SECCESS,
        payload:true
    })
    setTimeout(() => {
        dispatch({
          type:SET_IS_SECCESS,
          payload:false
      })
      }, 3000);
    })
    .catch(err =>
       {

        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })

  dispatch({

      type:SET_IS_SECCESS,
      payload:false
  })
        // dispatch(registerGoogleUser(data))
    }
    )
  }

  export const RefusAccount = (id, data)=>dispatch=>{
    dispatch({
      type: SET_ERRORS,
      payload: []
  })
  dispatch({
      type:SET_IS_LOADING,
      payload:true
  })
  return axios.post(`${baseUrl}/api/users/driver/refusDriverAccount/${id}`,
    data


    )
    .then(res => {
      dispatch({
        type: SET_ERRORS,
        payload: []
    })
    setTimeout(() => {

        dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
    }, 1000);
    dispatch({
        type:SET_IS_SECCESS,
        payload:true
    })
    setTimeout(() => {
        dispatch({
          type:SET_IS_SECCESS,
          payload:false
      })
      }, 3000);
      return res.data;
    })
    .catch(err =>
       {

        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })

  dispatch({

      type:SET_IS_SECCESS,
      payload:false
  })
  throw err;
        // dispatch(registerGoogleUser(data))
    }
    )
  }
