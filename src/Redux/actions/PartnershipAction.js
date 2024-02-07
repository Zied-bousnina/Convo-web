import { SET_BIN_STATISTIQUES } from "Redux/types"
import { SET_DEMANDES_MUNICIPAL } from "Redux/types"
import { SET_IS_SECCESS } from "Redux/types"
import { SET_PARTNER_DETAILS } from "Redux/types"
import { SET_IS_LOADING_PARTNER_TABLE } from "Redux/types"
import { SET_PARTNERSHIP_LIST } from "Redux/types"
import { SET_IS_LOADING } from "Redux/types"
import { SET_ERRORS } from "Redux/types"
import { SET_STATISTIQUES } from "Redux/types"
import axios from "axios"
const baseUrl = "https://convoyage.onrender.com"
export const CreatePartership = (data)=>dispatch=>{
  dispatch({
    type: SET_ERRORS,
    payload: []
})
dispatch({
    type:SET_IS_LOADING,
    payload:true
})




  axios.post(`${baseUrl}/api/site/Addpartnership`,data )
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
        type:SET_IS_SECCESS,
        payload:false
    })

      // dispatch(registerGoogleUser(data))
  }
  )
}


export const FetchAllPartnership = ()=>dispatch=>{
  dispatch({
    type: SET_ERRORS,
    payload: []
})

dispatch({
  type:SET_IS_LOADING_PARTNER_TABLE,
  payload:true
})

  axios.get(`${baseUrl}/api/users/partnerShip/fetchAll` )
  .then(res => {


      dispatch({
        type: SET_PARTNERSHIP_LIST,
        payload: res.data
    })
    dispatch({
      type: SET_ERRORS,
      payload: []
  })

dispatch({
  type:SET_IS_LOADING_PARTNER_TABLE,
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
      type:SET_IS_LOADING_PARTNER_TABLE,
      payload:false
    })


      // dispatch(registerGoogleUser(data))
  }
  )
}

export const GetPartnerDetailsById = (id)=>dispatch=>{

  axios.get(`${baseUrl}/api/users/partnerShip/fetchByID/${id}`)
  .then(res => {

      dispatch({
          type: SET_PARTNER_DETAILS,
          payload: res?.data
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
      // dispatch(registerGoogleUser(data))
  }
  )
}


export const UpdatePartnerShipStatus = (id,navigation)=>dispatch=>{
  dispatch({
    type: SET_ERRORS,
    payload: []
})
dispatch({
    type:SET_IS_LOADING,
    payload:true
})
  axios.put(`${baseUrl}/api/site/partnerShip/readed/${id}`)
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
export const UpdatePartnerShip = (id,partnerData)=>dispatch=>{
  dispatch({
    type: SET_ERRORS,
    payload: []
})
dispatch({
    type:SET_IS_LOADING,
    payload:true
})
  axios.post(`${baseUrl}/api/users/UpdatePartner/${id}`,partnerData)
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