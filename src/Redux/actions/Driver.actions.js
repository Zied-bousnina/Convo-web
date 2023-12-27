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



export const FetchAllDrivers = ()=>dispatch=>{
  dispatch({
    type:SET_IS_LOADING_DRIVER_TABLE,
    payload:true
  })
  axios.get(`${process.env.REACT_APP_API_URL}/api/users/driver/fetchAll` )
  .then(res => {
      // console.log(res)

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
      // console.log("err in authAction.js line 366",err)
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




    axios.post(`${process.env.REACT_APP_API_URL}/api/users/driver/AddDriver`,data, {
      headers: { "Content-Type": "multipart/form-data" }
    } )
    .then(res => {
        // console.log(res)
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
        // console.log("err in authAction.js line 366",err)
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
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/driver/updateDriver/${id}`,driverData)
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
        // console.log("err in authAction.js line 366",err)
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

