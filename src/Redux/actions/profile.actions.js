import axios from "axios";
import { SET_ERRORS, SET_IS_LOADING, SET_PROFILES } from "../types";
import { setLoading } from "./authActions";





const baseUrl = "https://convoyage.onrender.com"
// const baseUrl = "http://localhost:3600"

export const AddProfile =  (userData, navigation ) => (dispatch) => {


  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`${baseUrl}/api/profile/upload-profile`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {



        dispatch({
          type: SET_PROFILES,
          payload: res.data

        })
        dispatch(
          setLoading(true)
        )
        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
      })
      .catch( (err) =>{

        dispatch({
          type: SET_ERRORS,
          payload: err?.response?.data
      })
      dispatch({
        type:SET_IS_LOADING,
        payload:false
    })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
      }

      )
}

export const EditProfile_Web =  (userData, navigation ) => (dispatch) => {

  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`${baseUrl}/api/profile/Edit_profile_web`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {



        dispatch({
          type: SET_PROFILES,
          payload: res.data

        })
        dispatch(
          setLoading(true)
        )
        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
        navigation.push('/admin')
      })
      .catch( (err) =>{

        dispatch({
          type: SET_ERRORS,
          payload: err
      })
      dispatch({
        type:SET_IS_LOADING,
        payload:false
    })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
      }

      )
}
export const EditProfile_WebPartner =  (userData, navigation ) => (dispatch) => {

  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`${baseUrl}/api/profile/Edit_profile_web`, userData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
      // 'Authorization': 'Bearer ' + token
    }

  })
      .then(async(res) => {



        dispatch({
          type: SET_PROFILES,
          payload: res.data

        })
        dispatch(
          setLoading(true)
        )
        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
        navigation.push('/partner')
      })
      .catch( (err) =>{

        dispatch({
          type: SET_ERRORS,
          payload: err
      })
      dispatch({
        type:SET_IS_LOADING,
        payload:false
    })
        setTimeout(() => {
          dispatch(
            setLoading(false)
          )

        }, 3000);
      }

      )
}

export const GetProfile =  () => (dispatch) => {
  axios.get(`${baseUrl}/api/profile`)
      .then(async(res) => {

        dispatch({
          type: SET_PROFILES,
          payload: res.data

        })
      })
      .catch( (err) =>{

    }

      )
}