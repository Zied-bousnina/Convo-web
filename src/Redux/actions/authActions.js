import axios from 'axios'
import { SET_CURRENT_ACCESS, SET_ERRORS, SET_FIRST_LOGIN, SET_IS_LOADING, SET_IS_SECCESS, SET_LOADING, SET_PROFILES, SET_REQUEST, SET_USER } from '../types'


import { SetAuthToken } from '../../utils/SetAuthToken';
import jwt_decode from "jwt-decode"
import { GetProfile } from './profile.actions';
import { GetCurrentUser } from './userAction';


export function setLoading(isLoading) {
    return {
      type: SET_LOADING,
      payload: isLoading,
    };
  }

export const setCurrentUser = (decoded) => {
    return {
        type: SET_USER,
        payload: decoded
    }
}

export const loginUser = (userData) => dispatch => {
    // console.log("--------------userData-----------------------------")
    // console.log("--------------------------------------",userData)
    // console.log("---------------userData----------------------------")
    dispatch({
        type: SET_ERRORS,
        payload: []
    })
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })
    dispatch(LogOut())
    axios
        .post(`${process.env.REACT_APP_API_URL}/api/users/login`, {email:userData.email, password:userData.password})
        .then(res => {

            const { token } = res.data



            // AsyncStorage.setItem('jwtToken', token)
            localStorage.setItem('jwtToken', token)


            // Set token to Auth header
            SetAuthToken(token)
            dispatch(GetProfile())
            dispatch(GetCurrentUser())
            // Decode token to get user data
            const decoded = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))
            dispatch({
                type: SET_ERRORS,
                payload: []
            })
            dispatch({
                type:SET_IS_LOADING,
                payload:false
            })
        })
        .catch(err =>
           {
            // console.log(err)
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

export const LogOut = (navigation)=>dispatch=>{
    // AsyncStorage.removeItem("jwtToken")
    localStorage.removeItem("jwtToken")




    dispatch( {
        type: SET_USER,
        payload: {}
    })
    dispatch({
        type: SET_PROFILES,
        payload:[]
    })
    dispatch({
        type: SET_REQUEST,
        payload:{}
    })
    dispatch({
        type: SET_CURRENT_ACCESS,
        payload:[]
    })
    // navigation.navigate('Login')

}

export const getUserByEmail = (info,navigation)=>dispatch=>{
    const {idToken,user } = info
    const {email, familyName, givenName, id, photo } = info.user
    // console.log(photo)

const data = {email, name:familyName+' '+givenName,avatar:photo, googleId:id, tokenId:idToken}
    // console.log(data.email )
    // email, name, googleId, tokenId
    // console.log("email", info.user.email)
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/getUserByEmail/${info.user.email}`)
    .then(res => {
        // console.log(res)
        dispatch({
            type: SET_USER,
            payload: res?.data
        })


        // dispatch(registerGoogleUser(data))

        // dispatch(loginUser(data))
    })
    .catch(err =>
       {
        // console.log("err in authAction.js line 366",err)
        // dispatch({
        //     type: SET_ERRORS,
        //     payload: err?.response?.data
        // })
        // dispatch(registerGoogleUser(data))
    }
    )
}

export const CreatePartner = (userData) => dispatch => {

    dispatch({
        type: SET_ERRORS,
        payload: []
    })
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })

    axios
        .post(`${process.env.REACT_APP_API_URL}/api/users/AddPartner`, userData,{
            headers: { "Content-Type": "multipart/form-data" }
        })
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
        })
        .catch(err =>
           {
            // console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err?.response?.data
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
                  dispatch({
                    type:SET_IS_LOADING,
                    payload:false
                })
        }

        )
}

export const createCategorie = (userData) => dispatch => {

    dispatch({
        type: SET_ERRORS,
        payload: []
    })
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })

    axios
        .post(`${process.env.REACT_APP_API_URL}/api/users/categorie/create`, userData,{
            headers: { "Content-Type": "multipart/form-data" }
        })
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
        })
        .catch(err =>
           {
            // console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err?.response?.data
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
                  dispatch({
                    type:SET_IS_LOADING,
                    payload:false
                })
        }

        )
}
export const forgotPassword = (email) => async (dispatch) => {
    try {
        // //("-------------------------------------",email)
        dispatch({
            type: SET_ERRORS,
            payload: {}
        });

        dispatch({
            type: SET_IS_LOADING,
            payload: true
        });

        dispatch({
            type: SET_IS_SECCESS,
            payload: false
        });

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/forgot-password`, { email });

        dispatch({
            type: SET_IS_LOADING,
            payload: false
        });

        dispatch({
            type: SET_IS_SECCESS,
            payload: true
        });

        setInterval(() => {
            dispatch({
                type: SET_IS_SECCESS,
                payload: false
            });
        }, 3000);

        setTimeout(() => {
            dispatch({
                type: SET_IS_LOADING,
                payload: false
            });

            dispatch(setLoading(false));

            dispatch(setLoading(true));
        }, 1000);
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
        });

        dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
        });

        dispatch({
            type: SET_IS_LOADING,
            payload: false
        });

        setTimeout(() => {
            dispatch({
                type: SET_IS_SECCESS,
                payload: false
            });
        }, 3000);
    }
};
export const updatePassword = (userData) => dispatch => {

    dispatch({
        type: SET_ERRORS,
        payload: []
    })
    dispatch({
        type:SET_IS_LOADING,
        payload:true
    })

    axios
        .post(`${process.env.REACT_APP_API_URL}/api/users/updatePassword`, userData)
        .then(res => {
            dispatch({
                type: SET_FIRST_LOGIN,
                payload: false
            })
            dispatch({
                type: SET_ERRORS,
                payload: []
            })
            dispatch({
                type:SET_IS_LOADING,
                payload:false
            })
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
        })
        .catch(err =>
           {
            // console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err?.response?.data
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
                  dispatch({
                    type:SET_IS_LOADING,
                    payload:false
                })
        }

        )
}







