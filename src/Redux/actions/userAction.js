
import { SET_ERRORS } from "Redux/types"
import { SET_IS_LOADING } from "Redux/types"
import { SET_CURRENT_USER } from "Redux/types"
import { SET_IS_SECCESS } from "Redux/types"
import { SET_USERS_DETAILS } from "Redux/types"
import { SET_USERS } from "Redux/types"

import axios from "axios"
import { removeSeenMsg } from "./Notification.action"
import { ADD_UNSEEN_MSG } from "Redux/types"
import { SET_NEW_NOTI } from "Redux/types"


export const GetCurrentUser = (navigation) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/users/currentUser`);
    dispatch({
      type: SET_CURRENT_USER,
      payload: res?.data
    });
    dispatch({
      type: ADD_UNSEEN_MSG,
      payload: res?.data?.user?.Newsocket || [], // Adjust payload as needed
    });



    dispatch({
      type: SET_NEW_NOTI,
      payload: res?.data?.user?.Newsocket , // Adjust payload as needed
    })
    // If you have additional actions to dispatch after successfully fetching data, you can do it here using await.

    // await dispatch(registerGoogleUser(data));
    // await dispatch(loginUser(data));
  } catch (err) {
    // Handle errors

    dispatch({
      type: SET_ERRORS,
      payload: err?.response?.data
    });
    // If you want to rethrow the error after handling it, you can use throw err.
    // throw err;
  }
};


export const RemoveNotification = (navigation)=>dispatch=>{

  axios.post(`${process.env.REACT_APP_API_URL}/api/users/users/EmptySocket`)
  .then(res => {

      dispatch(removeSeenMsg([]))


      // dispatch(registerGoogleUser(data))

      // dispatch(loginUser(data))

      dispatch(GetCurrentUser())
  })
  .catch(err =>
     {

      dispatch({
          type: SET_ERRORS,
          payload: err?.response?.data
      })
      // dispatch(registerGoogleUser(data))
      throw err
  }
  )
}
export const ByIdRemoveNotification = (id,navigation)=>dispatch=>{

  axios.post(`${process.env.REACT_APP_API_URL}/api/users/users/RemoveSocketById/${id}`)
  .then(res => {

      dispatch(removeSeenMsg([]))


      // dispatch(registerGoogleUser(data))

      // dispatch(loginUser(data))
      dispatch(GetCurrentUser())
  })
  .catch(err =>
     {

      dispatch({
          type: SET_ERRORS,
          payload: err?.response?.data
      })
      // dispatch(registerGoogleUser(data))
      throw err
  }
  )
}


export const GetAllUsers = (navigation)=>dispatch=>{

  axios.get(`${process.env.REACT_APP_API_URL}/api/users/getUsers`)
  .then(res => {

      dispatch({
          type: SET_USERS,
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
      throw err
  }
  )
}

export const GetAllUserDetails = (id,navigation)=>dispatch=>{

    axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
    .then(res => {

        dispatch({
            type: SET_USERS_DETAILS,
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


  export const BlockUser = (id,navigation)=>dispatch=>{
    dispatch({
        type: SET_ERRORS,
        payload: []
    })
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })
    axios.put(`${process.env.REACT_APP_API_URL}/api/users/block/${id}`)
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
  export const UnBlockUser = (id,navigation)=>dispatch=>{
    dispatch({
        type: SET_ERRORS,
        payload: []
    })
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })
    axios.put(`${process.env.REACT_APP_API_URL}/api/users/deblock/${id}`)
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


  export const DeleteUserByAdmin = (id) => (dispatch) => {
    dispatch({
      type: SET_ERRORS,
      payload: [],
    });

    dispatch({
      type: SET_IS_LOADING,
      payload: true,
    });

    return axios
      .delete(`${process.env.REACT_APP_API_URL}/api/users/deleteAccountByAdmin/${id}`)
      .then((res) => {
        dispatch({
          type: SET_ERRORS,
          payload: [],
        });
        dispatch({
          type: SET_IS_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_IS_SECCESS, // Assuming you have a SET_IS_SECCESS action type
          payload: true,
        });
        // Assuming you want to reset success after a certain duration
        setTimeout(() => {
          dispatch({
            type: SET_IS_SECCESS,
            payload: false,
          });
        }, 3000);

        return res.data; // Return data if needed
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err?.response?.data,
        });
        dispatch({
          type: SET_IS_SECCESS, // Assuming you have a SET_IS_SECCESS action type
          payload: false,
        });
        dispatch({
          type: SET_IS_LOADING,
          payload: false,
        });
        throw err; // Rethrow the error if needed
      });
  };





