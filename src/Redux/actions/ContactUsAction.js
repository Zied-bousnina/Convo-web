import { SET_CONTACT_LIST } from "Redux/types"
import { SET_CONTACT_DETAIL } from "Redux/types"
import { SET_IS_SECCESS } from "Redux/types"
import { SET_IS_LOADING } from "Redux/types"
import { SET_ERRORS } from "Redux/types"

import axios from "axios"
const baseUrl = "https://convoyage.onrender.com"
export const CreateContactUs = (data)=>dispatch=>{
  dispatch({
    type: SET_ERRORS,
    payload: []
})
dispatch({
    type:SET_IS_LOADING,
    payload:true
})




  axios.post(`${baseUrl}/api/site/AddContactUs`,data )
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

export const FetchAllContact = (data)=>dispatch=>{
  axios.get(`${baseUrl}/api/site/contactUs/fetchAll`,data )
  .then(res => {


      dispatch({
        type: SET_CONTACT_LIST,
        payload: res.data
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

      // dispatch(registerGoogleUser(data))
  }
  )
}

export const GetContactUsById = (id,navigation)=>dispatch=>{

  axios.get(`${baseUrl}/api/site/contactUs/fetchByID/${id}`)
  .then(res => {

      dispatch({
          type: SET_CONTACT_DETAIL,
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

export const UpdateContactStatus = (id,navigation)=>dispatch=>{
  dispatch({
    type: SET_ERRORS,
    payload: []
})
dispatch({
    type:SET_IS_LOADING,
    payload:true
})
  axios.put(`${baseUrl}/api/site/contactUs/readed/${id}`)
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