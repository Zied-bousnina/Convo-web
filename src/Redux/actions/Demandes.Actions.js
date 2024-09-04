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
import { SET_SPECIFIQUE_DEVIS_BY_PARTNER } from "Redux/types";
import { SET_FACTURES_BY_PARTNER } from "Redux/types";
import { SET_SINGLE_FACTURE } from "Redux/types";
import { SET_FACTURES_BY_PARTNERS } from "Redux/types";
import { SET_FACTURE_DETAIL_ADMIN } from "Redux/types";
import { SET_FACTURES_BY_DRIVERS } from "Redux/types";
import { SET_STATISTIQUE_BY_PARTNER } from "Redux/types";
import { SET_STATISTIQUE_AMMOUNT_BY_PARTNER } from "Redux/types";
const baseUrl = "https://convoyage.onrender.com"
// const baseUrl = "http://localhost:3600"
// const baseUrl = "http://localhost:3600"
export const AddDemande =  (userData, navigate ) => (dispatch) => {

    // const [token, settoken] = useState('')
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })

    axios.post(`${baseUrl}/api/users/createDemande`, userData)
        .then(async(res) => {




          socket.emit("new mission", res.data);


          dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
          setTimeout(() => {
            dispatch(
              setLoading(false)
            )

          }, 3000);
          navigate.push("/admin/List-demandes");
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

        //   navigation.navigate("FindDriverScreen",{...userData, demandeId:res?.data?.demande?._id} )

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
  export const AddDemandePartner =  (userData, navigate ) => (dispatch) => {

    // const [token, settoken] = useState('')
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })

    axios.post(`${baseUrl}/api/users/createDemande`, userData)
        .then(async(res) => {




          socket.emit("new mission", res.data);


          dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
          setTimeout(() => {
            dispatch(
              setLoading(false)
            )

          }, 3000);
          navigate.push("/partner/List-demandes");
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

        //   navigation.navigate("FindDriverScreen",{...userData, demandeId:res?.data?.demande?._id} )

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
  export const createDemandeNewVersion =  (userData, navigate ) => (dispatch) => {

    // const [token, settoken] = useState('')
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })

    axios.post(`${baseUrl}/api/users/createDemandeNewVersion`, userData,{
      headers: { "Content-Type": "multipart/form-data" }
    })
        .then(async(res) => {




          socket.emit("new mission", res.data);


          dispatch({
            type:SET_IS_LOADING,
            payload:false
        })
          setTimeout(() => {
            dispatch(
              setLoading(false)
            )

          }, 3000);
          navigate.push(`/partner/devis/${res?.data?.demande?._id}`);
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

        //   navigation.navigate("FindDriverScreen",{...userData, demandeId:res?.data?.demande?._id} )

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
    axios.get(`${baseUrl}/api/users/devis/findDevisByPartner`)
    .then(async(res) => {

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
    axios.get(`${baseUrl}/api/users/devis/findDevisById/${id}`)
    .then(async(res) => {

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
    axios.get(`${baseUrl}/api/users/findDemandsByUserId`)
    .then(async(res) => {

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
    axios.get(`${baseUrl}/api/users/findDemandsCreatedByPartner`)
    .then(async(res) => {

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
  export const findDemandsstatisticsByPartner = ( )=> (dispatch) => {
    axios.get(`${baseUrl}/api/users/findDemandsstatisticsByPartner`)
    .then(async(res) => {

      dispatch({
        type: SET_STATISTIQUE_BY_PARTNER,
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
  export const findDemandsstatisticsadmin = ( )=> (dispatch) => {
    axios.get(`${baseUrl}/api/users/findDemandsstatisticsAdmin`)
    .then(async(res) => {

      dispatch({
        type: SET_STATISTIQUE_BY_PARTNER,
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
  export const findAmmountStatis = ( )=> (dispatch) => {
    axios.get(`${baseUrl}/api/users/getTotalAmountByPartner`)
    .then(async(res) => {

      dispatch({
        type: SET_STATISTIQUE_AMMOUNT_BY_PARTNER,
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
    axios.get(`${baseUrl}/api/users/findAllPartnersAndTheirDemands`)
    .then(async(res) => {

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

        }



    )

  }
  export const FindFacturesByPartners = ( )=> (dispatch) => {

    axios.get(`${baseUrl}/api/users/findAllPartnersAndTheirFactures`)
    .then(async(res) => {


      dispatch({
        type: SET_FACTURES_BY_PARTNERS,
        payload: res?.data,

      })

    })


    .catch( (err) =>{

           dispatch({
              type: SET_ERRORS,
              payload: err?.response?.data
            })

        }



    )

  }
  export const FindFacturesDriver = ( )=> (dispatch) => {

    axios.get(`${baseUrl}/api/users/findAllDriversAndTheirFactures`)
    .then(async(res) => {


      dispatch({
        type: SET_FACTURES_BY_DRIVERS,
        payload: res?.data,

      })

    })


    .catch( (err) =>{

           dispatch({
              type: SET_ERRORS,
              payload: err?.response?.data
            })

        }



    )

  }

  export const FindFacturesDetailsById = ( id)=> (dispatch) => {

    axios.get(`${baseUrl}/api/users/factureById/${id}`)
    .then(async(res) => {


      dispatch({
        type: SET_FACTURE_DETAIL_ADMIN,
        payload: res?.data,

      })

    })


    .catch( (err) =>{

           dispatch({
              type: SET_ERRORS,
              payload: err?.response?.data
            })

        }



    )

  }
  export const FindFacturesDriverDetailsById = ( id)=> (dispatch) => {

    axios.get(`${baseUrl}/api/users/factureDriverById/${id}`)
    .then(async(res) => {


      dispatch({
        type: SET_FACTURE_DETAIL_ADMIN,
        payload: res?.data,

      })

    })


    .catch( (err) =>{

           dispatch({
              type: SET_ERRORS,
              payload: err?.response?.data
            })

        }



    )

  }
  export const PayeeFacture = ( id, navigation)=> (dispatch) => {
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })

    axios.get(`${baseUrl}/api/users/PayeeFacture/${id}`)
    .then(async(res) => {


      dispatch({
        type:SET_IS_LOADING,
        payload:false
    })
    dispatch({
      type: SET_DEMANDES_BY_PARTNERS,
      payload: {},

    })

    dispatch({
      type: SET_DEMANDES_BY_PARTNERS_V2,
      payload: [],

    })
    dispatch(FindRequestDemandeByPartner())
    dispatch(FindRequestDemandeByPartnerV2())
    navigation.push("/admin/ListFacture")


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
  export const PayeeFactureDriver = ( id, navigation)=> (dispatch) => {
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })

    axios.get(`${baseUrl}/api/users/payeeFactureDriver/${id}`)
    .then(async(res) => {


      dispatch({
        type:SET_IS_LOADING,
        payload:false
    })
    dispatch({
      type: SET_DEMANDES_BY_PARTNERS,
      payload: {},

    })

    dispatch({
      type: SET_DEMANDES_BY_PARTNERS_V2,
      payload: [],

    })
    dispatch(FindRequestDemandeByPartner())
    dispatch(FindRequestDemandeByPartnerV2())
    navigation.push("/admin/ListFactureDrivers")


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
      .delete(`${baseUrl}/api/users/mission/deleteMission/${missionId}`)
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
      .delete(`${baseUrl}/api/users/categorie/deleteCategorie/${missionId}`)
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
      const res = await axios.get(`${baseUrl}/api/users/findDemandById/${demandeid}`);


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

  export const getUserInformationById = (demandeId)=> (dispatch) => {
    // Return the promise created by axios.get
     return axios.get(`${baseUrl}/api/users/getMissionById/${demandeId}`)
      .then(response => {
        // You can process the response here if needed
        return response.data; // Assuming the API response has the needed data here
      })
      .catch(error => {
        // Handle error
        throw error; // Rethrow the error so you can catch it with .then()
      });
  };
  export const UpdateUserInformationById = (info)=> (dispatch) => {
    // Return the promise created by axios.get
     return axios.post(`${baseUrl}/api/users/updateFieldsForDevis`,
      info
     )
      .then(response => {
        // You can process the response here if needed
        return response.data; // Assuming the API response has the needed data here
      })
      .catch(error => {
        // Handle error
        throw error; // Rethrow the error so you can catch it with .then()
      });
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
      const res = await axios.get(`${baseUrl}/api/users/devis/getAllDevisByPartner/${demandeid}`);


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
    axios.post(`${baseUrl}/api/users/mission/updateMission/${id}`,partnerData)
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

  export const UpdateCategorie1 = (id,partnerData, navigate)=>dispatch=>{
    dispatch({
      type: SET_ERRORS,
      payload: []
  })
  dispatch({
      type:SET_IS_LOADING,
      payload:true
  })
    axios.post(`${baseUrl}/api/users/categorie/updateCategorie/${id}`,partnerData)
    // http://localhost:3600/api/users/mission/updateMission/6559cfb07be46100421ee64c
    .then(res => {
      dispatch({
        type: SET_ERRORS,
        payload: []
    })
    navigate.push("/admin/ListCategorie")
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
    axios.get(`${baseUrl}/api/users/categorie/getAllCategorie`)
    .then(async(res) => {

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

        const res = await axios.post(`${baseUrl}/api/users/devis/create`, userData);

if(res.data?.data?.status =="Confirmée") {

  socket.emit("accept devis",res?.data?.data);
}

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


  // const [token, settoken] = useState('')
  dispatch({
    type:SET_IS_LOADING,
    payload:true
})

  axios.post(`${baseUrl}/api/users/devis/rejectDevis/${id}`)
      .then(async(res) => {






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


    // const [token, settoken] = useState('')
    dispatch({
      type:SET_IS_LOADING,
      payload:true
  })

    axios.post(`${baseUrl}/api/users/devis/UpdateDevis/${id}`, userData)
        .then(async(res) => {






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
    axios.get(`${baseUrl}/api/users/categorie/${id}`)
    .then(async(res) => {


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

  export const FindFactureById = (factureId,data ) => async (dispatch) => {
    dispatch({
      type: SET_ERRORS,
      payload: {},
    });
    // dispatch({
    //   type: SET_SPECIFIQUE_DEVIS_BY_PARTNER,
    //   payload: [],
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
      const res = await axios.get(`${baseUrl}/api/users/facture/fetchFacturePartnerById/${factureId}`
      );
      dispatch({
        type: SET_ERRORS,
        payload: {},
      });

      dispatch({
        type: SET_SINGLE_FACTURE,
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
  export const FindDevisByPartnerId = (partner,data ) => async (dispatch) => {
    dispatch({
      type: SET_ERRORS,
      payload: {},
    });
    dispatch({
      type: SET_SPECIFIQUE_DEVIS_BY_PARTNER,
      payload: [],
    });
    // dispatch({
    //   type: SET_SINGLE_DEMANDE,
    //   payload: {},
    // });
    dispatch({
      type: SET_IS_LOADING_TABLE_MISSION,
      payload: true,
    });
    try {
      const res = await axios.post(`${baseUrl}/api/users/devis/findDevisByPartnerId/${partner}`,
      data
      );
      dispatch({
        type: SET_ERRORS,
        payload: {},
      });

      dispatch({
        type: SET_SPECIFIQUE_DEVIS_BY_PARTNER,
        payload: res.data?.devis,
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




  export const createFacture = (userData, navigate,user2) => async (dispatch) => {
    try {
        dispatch({
            type: SET_IS_LOADING,
            payload: true
        });

        const res = await axios.post(`${baseUrl}/api/users/facture/create`, userData);

        // Log the entire response



        // if(user2) {

        //   socket.emit("add-user", user2.id);
        // }
        // socket.emit("new message", res.data);

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
        return res.data;

    } catch (err) {


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
        throw err;
    }
};

export const FindFacturesByPartner = ( ) => async (dispatch) => {
  dispatch({
    type: SET_ERRORS,
    payload: {},
  });
  // dispatch({
  //   type: SET_FACTURES_BY_PARTNER,
  //   payload: [],
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
    const res = await axios.get(`${baseUrl}/api/users/facture/fetchFactureByPartner`
    );
    dispatch({
      type: SET_ERRORS,
      payload: {},
    });

    dispatch({
      type: SET_FACTURES_BY_PARTNER,
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
