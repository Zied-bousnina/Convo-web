

import {   SET_SINGLE_DEMANDE } from "../types"

const initialState = {
    demande: {},


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_SINGLE_DEMANDE:
            return {
                ...state,

                demandes: action.payload,


            }

        default:
            return state
    }

}


