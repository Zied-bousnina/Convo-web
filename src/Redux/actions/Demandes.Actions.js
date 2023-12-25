import { SET_IS_LOADING } from "Redux/types";
import axios from "axios";
import { setLoading } from "./authActions";
import { SET_ERRORS } from "Redux/types";
import { SET_IS_SECCESS } from "Redux/types";
import { SET_DEMANDES } from "Redux/types";
import { SET_SINGLE_DEMANDE } from "Redux/types";
import { SET_DEMANDES_BY_PARTNERS } from "Redux/types";

export const AddDemande =  (userData, navigate ) => (dispatch) => {

    // console.log(userData)
    // const [token, settoken] = useState('')
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })

    axios.post(`${process.env.REACT_APP_API_URL}/api/users/createDemande`, userData)
        .then(async(res) => {
          //////////////////////////////////////////console.log(res)





          dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
          setTimeout(() => {
            dispatch(
              setLoading(false)
            )

          }, 3000);
          navigate.push("/home");
          dispatch({
            type: SET_IS_SECCESS,
            payload: true
        })
//  navigate('/list-of-demandes');
        setTimeout(() => {
            dispatch({
                type: SET_IS_SECCESS,
                payload: false
            })
        }, 3000);
          // console.log("res", res?.data?.demande?._id)
        //   navigation.navigate("FindDriverScreen",{...userData, demandeId:res?.data?.demande?._id} )

        })
        .catch( (err) =>{
          // console.log("errrrrrrrrrrrrrrrrrr",err)
          dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
        })
        dispatch({
          type:SET_IS_LOADING,
          payload:false
      })
      dispatch({
        type: SET_IS_SECCESS,
        payload: false
    })
          setTimeout(() => {
            dispatch(
              setLoading(false)
            )

          }, 3000);
        }

        )
  }


export const FindRequestDemande = ( )=> (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/findDemandsByUserId`)
    .then(async(res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>",res.data)
      dispatch({
        type: SET_DEMANDES,
        payload: res.data,

      })

    })


    .catch( (err) =>{

           dispatch({
              type: SET_ERRORS,
              payload: err?.response?.data
            })
            // dispatch({
            //   type: SET_DEMANDES,
            //   payload: [],

            // })
        }



    )

  }
  export const FindRequestDemandeByPartner = ( )=> (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/findDemandsCreatedByPartner`)
    .then(async(res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>",res.data)
      dispatch({
        type: SET_DEMANDES_BY_PARTNERS,
        payload: res.data,

      })

    })


    .catch( (err) =>{

           dispatch({
              type: SET_ERRORS,
              payload: err?.response?.data
            })
            // dispatch({
            //   type: SET_DEMANDES,
            //   payload: [],

            // })
        }



    )

  }


  export const FindRequestDemandeById = (demandeid) => async (dispatch) => {
    // dispatch({
    //   type: SET_ERRORS,
    //   payload: {},
    // });
    // dispatch({
    //   type: SET_SINGLE_DEMANDE,
    //   payload: {},
    // });
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/findDemandById/${demandeid}`);

      // console.log(">>>>>>>>>>>>>>>>>>>", res.data);
      dispatch({
        type: SET_SINGLE_DEMANDE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err?.response?.data,
      });
      // dispatch({
      //   type: SET_DEMANDES,
      //   payload: [],
      // });
    }
  };

  export const UpdateMission = (id,partnerData)=>dispatch=>{
    dispatch({
      type: SET_ERRORS,
      payload: []
  })
  dispatch({
      type:SET_IS_LOADING,
      payload:true
  })
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/mission/updateMission/${id}`,partnerData)
    // http://localhost:3600/api/users/mission/updateMission/6559cfb07be46100421ee64c
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