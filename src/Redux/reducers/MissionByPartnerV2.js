

import {   SET_DEMANDES_BY_PARTNERS_V2 } from "../types"

const initialState = {
    demandes: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_DEMANDES_BY_PARTNERS_V2:
            return {
                ...state,

                demandes: action.payload,


            }

        default:
            return state
    }

}


