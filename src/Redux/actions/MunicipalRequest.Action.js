import { SET_BIN_STATISTIQUES } from "Redux/types"
import { SET_DEMANDES_MUNICIPAL } from "Redux/types"
import { SET_IS_LOADING } from "Redux/types"
import { SET_DETAILS_MUNICIPAL } from "Redux/types"
import { SET_ERRORS } from "Redux/types"
import axios from "axios"
const baseUrl = "https://convoyage.onrender.com"
export const findDemandeInProgress = (navigation)=>dispatch=>{

  axios.get(`${baseUrl}/api/demande-municipal/findDemandeInProgress`)
  .then(res => {

      dispatch({
          type: SET_DEMANDES_MUNICIPAL,
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

export const UpadeteRequest = (data, navigation)=> (dispatch) => {

  dispatch({
    type: SET_ERRORS,
    payload: []
})
dispatch({
    type:SET_IS_LOADING,
    payload:true
})
  axios.put(`${baseUrl}/api/demande-municipal/AcceptDemande/${data.id}`
  ,{status:data.status}
  )
  .then(async(res) => {
    dispatch({
      type: SET_ERRORS,
      payload: []
  })
  dispatch({
      type:SET_IS_LOADING,
      payload:false
  })

    // dispatch({
    //   type: SET_DEMANDES_MUNICIPAL,
    //   payload: res.data,

    // })


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
      }



  )

}

export const getBinsCount = (navigation)=>dispatch=>{

  axios.get(`${baseUrl}/api/bin/getBinsCount`)
  .then(res => {

      dispatch({
          type: SET_BIN_STATISTIQUES,
          payload: res?.data
      })


      // dispatch(registerGoogleUser(data))

      // dispatch(loginUser(data))
  })
  .catch(err =>
     {

      // dispatch({
      //     type: SET_ERRORS,
      //     payload: err?.response?.data
      // })
      // dispatch(registerGoogleUser(data))
  }
  )
}

export const GetPMunicipalDetailsById = (id,navigation)=>dispatch=>{

  axios.get(`${baseUrl}/api/demande-municipal/findDemandeById/${id}`)
  .then(res => {

      dispatch({
          type: SET_DETAILS_MUNICIPAL,
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

