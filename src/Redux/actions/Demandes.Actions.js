import { SET_IS_LOADING } from "Redux/types";
import axios from "axios";
import { setLoading } from "./authActions";
import { SET_ERRORS } from "Redux/types";
import { SET_IS_SECCESS } from "Redux/types";
import { SET_DEMANDES } from "Redux/types";
import { SET_SINGLE_DEMANDE } from "Redux/types";
import { SET_DEMANDES_BY_PARTNERS } from "Redux/types";
import { SET_IS_LOADING_TABLE_MISSION } from "Redux/types";
import { SET_DEMANDES_BY_PARTNERS_V2 } from "Redux/types";
import { SET_ALL_CATEGORIES } from "Redux/types";
import { SET_CATEGORIE_DETAILS } from "Redux/types";
import { SET_DEVIS_BY_PARTNER } from "Redux/types";
import { socket}  from "../../socket.js"
import { SET_DEVIS_BY_CURRENT_PARTNER } from "Redux/types";
import { SET_devis_DETAIL } from "Redux/types";
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

  export const FinddevisByPartner = ( )=> (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/devis/findDevisByPartner`)
    .then(async(res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>",res.data)
      dispatch({
        type: SET_DEVIS_BY_CURRENT_PARTNER,
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

  export const FinddevisById = (id )=> (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/devis/findDevisById/${id}`)
    .then(async(res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>",res.data)
      dispatch({
        type: SET_devis_DETAIL,
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
  export const FindRequestDemandeByPartnerV2 = ( )=> (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/findAllPartnersAndTheirDemands`)
    .then(async(res) => {
      console.log(">>>>>>>>>>>>>>>>>>>",res.data)
      dispatch({
        type: SET_DEMANDES_BY_PARTNERS_V2,
        payload: res?.data,

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
            console.log("error")
        }



    )

  }
  export const DeleteMission = (missionId) => (dispatch) => {
    dispatch({
      type: SET_ERRORS,
      payload: [],
    });

    dispatch({
      type: SET_IS_LOADING,
      payload: true,
    });

    // Return the promise from axios.delete
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/api/users/mission/deleteMission/${missionId}`)
      .then((res) => {
        dispatch({
          type: SET_ERRORS,
          payload: [],
        });
        dispatch({
          type: SET_DEMANDES_BY_PARTNERS,
          payload: {},

        })
        dispatch(FindRequestDemandeByPartner())
        setTimeout(() => {
          dispatch({
            type: SET_IS_LOADING,
            payload: false,
          });
        }, 1000);

        dispatch({
          type: SET_IS_SECCESS,
          payload: true,
        });

        setTimeout(() => {
          dispatch({
            type: SET_IS_SECCESS,
            payload: false,
          });
        }, 3000);
      })
      .catch((err) => {
        dispatch({
          type: SET_DEMANDES_BY_PARTNERS,
          payload: {},

        })
        dispatch({
          type: SET_IS_LOADING,
          payload: false,
        });
        dispatch(FindRequestDemandeByPartner())

        dispatch({
          type: SET_IS_SECCESS,
          payload: false,
        });

        // You can handle the error further if needed
        // console.log("err in authAction.js line 366", err);

        // Re-throw the error to propagate it to the next catch block
        throw err;
      });
  };
  export const DeleteCategorie= (missionId) => (dispatch) => {
    dispatch({
      type: SET_ERRORS,
      payload: [],
    });

    dispatch({
      type: SET_IS_LOADING,
      payload: true,
    });

    // Return the promise from axios.delete
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/api/users/categorie/deleteCategorie/${missionId}`)
      .then((res) => {
        dispatch({
          type: SET_ERRORS,
          payload: [],
        });
        dispatch({
          type: SET_ALL_CATEGORIES,
          payload: {},

        })
        dispatch(FindRequestDemandeByPartner())
        setTimeout(() => {
          dispatch({
            type: SET_IS_LOADING,
            payload: false,
          });
        }, 1000);

        dispatch({
          type: SET_IS_SECCESS,
          payload: true,
        });

        setTimeout(() => {
          dispatch({
            type: SET_IS_SECCESS,
            payload: false,
          });
        }, 3000);
      })
      .catch((err) => {
        dispatch({
          type: SET_DEMANDES_BY_PARTNERS,
          payload: {},

        })
        dispatch({
          type: SET_IS_LOADING,
          payload: false,
        });
        dispatch(FindRequestDemandeByPartner())

        dispatch({
          type: SET_IS_SECCESS,
          payload: false,
        });

        // You can handle the error further if needed
        // console.log("err in authAction.js line 366", err);

        // Re-throw the error to propagate it to the next catch block
        throw err;
      });
  };


  export const FindRequestDemandeById = (demandeid) => async (dispatch) => {
    // dispatch({
    //   type: SET_ERRORS,
    //   payload: {},
    // });
    // dispatch({
    //   type: SET_SINGLE_DEMANDE,
    //   payload: {},
    // });
    dispatch({
      type: SET_IS_LOADING_TABLE_MISSION,
      payload: true,
    });
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/findDemandById/${demandeid}`);

      // console.log(">>>>>>>>>>>>>>>>>>>", res.data);
      dispatch({
        type: SET_SINGLE_DEMANDE,
        payload: res.data,
      });
      dispatch({
        type: SET_IS_LOADING_TABLE_MISSION,
        payload: false,
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
      dispatch({
        type: SET_IS_LOADING_TABLE_MISSION,
        payload: false,
      });
    }
  };

  export const FindDevisByPartner = (demandeid) => async (dispatch) => {
    // dispatch({
    //   type: SET_ERRORS,
    //   payload: {},
    // });
    // dispatch({
    //   type: SET_SINGLE_DEMANDE,
    //   payload: {},
    // });
    dispatch({
      type: SET_IS_LOADING_TABLE_MISSION,
      payload: true,
    });
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/devis/getAllDevisByPartner/${demandeid}`);

      // console.log(">>>>>>>>>>>>>>>>>>>", res.data);
      dispatch({
        type: SET_DEVIS_BY_PARTNER,
        payload: res.data,
      });
      dispatch({
        type: SET_IS_LOADING_TABLE_MISSION,
        payload: false,
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
      dispatch({
        type: SET_IS_LOADING_TABLE_MISSION,
        payload: false,
      });
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

  export const UpdateCategorie1 = (id,partnerData)=>dispatch=>{
    dispatch({
      type: SET_ERRORS,
      payload: []
  })
  dispatch({
      type:SET_IS_LOADING,
      payload:true
  })
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/categorie/updateCategorie/${id}`,partnerData)
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
        type: SET_ERRORS,
        payload: err?.response?.data})

  dispatch({
      type:SET_IS_SECCESS,
      payload:false
  })
        // dispatch(registerGoogleUser(data))
    }
    )
  }

  export const FindAllCategories = ( )=> (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/categorie/getAllCategorie`)
    .then(async(res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>",res.data)
      dispatch({
        type: SET_ALL_CATEGORIES,
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

  export const AddDevis = (userData, navigate,user2) => async (dispatch) => {
    try {
        dispatch({
            type: SET_IS_LOADING,
            payload: true
        });

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/devis/create`, userData);

        // Log the entire response
        console.log("Response", res);

        console.log("done!");
        if(user2) {

          socket.emit("add-user", user2.id);
        }
        socket.emit("new message", res.data);

        dispatch({
            type: SET_IS_LOADING,
            payload: false
        });

        setTimeout(() => {
            dispatch(setLoading(false));
        }, 3000);

        navigate.push("/home");

        dispatch({
            type: SET_IS_SECCESS,
            payload: true
        });

        setTimeout(() => {
            dispatch({
                type: SET_IS_SECCESS,
                payload: false
            });
        }, 3000);

    } catch (err) {
        console.error("Error", err);

        dispatch({
            type: SET_ERRORS,
            payload: err?.response?.data
        });

        dispatch({
            type: SET_IS_LOADING,
            payload: false
        });

        dispatch({
            type: SET_IS_SECCESS,
            payload: false
        });

        setTimeout(() => {
            dispatch(setLoading(false));
        }, 3000);
    }
};
export const rejectDevis =  ( id, navigate ) => (dispatch) => {

  // console.log(userData)
  // const [token, settoken] = useState('')
  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`${process.env.REACT_APP_API_URL}/api/users/devis/rejectDevis/${id}`)
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
        // navigate.push("/home");
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

  export const UpdateDevis =  (userData, id, navigate ) => (dispatch) => {

    // console.log(userData)
    // const [token, settoken] = useState('')
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })

    axios.post(`${process.env.REACT_APP_API_URL}/api/users/devis/UpdateDevis/${id}`, userData)
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

  export const FindCategorieById = ( id)=> (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users/categorie/${id}`)
    .then(async(res) => {
      // console.log(">>>>>>>>>>>>>>>>>>>",res.data)
      dispatch({
        type: SET_CATEGORIE_DETAILS,
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

