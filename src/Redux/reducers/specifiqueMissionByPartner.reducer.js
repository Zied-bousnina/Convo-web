

import {   SET_SPECIFIQUE_DEVIS_BY_PARTNER } from "../types"

const initialState = {
    demande: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_SPECIFIQUE_DEVIS_BY_PARTNER:
            return {
                ...state,

                demande: action.payload,


            }

        default:
            return state
    }

}


