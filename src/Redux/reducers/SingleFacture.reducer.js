

import {   SET_SINGLE_FACTURE } from "../types"

const initialState = {
    facture: {},


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_SINGLE_FACTURE:
            return {
                ...state,

                facture: action.payload,


            }

        default:
            return state
    }

}


