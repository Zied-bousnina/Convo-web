

import {   SET_FACTURES_BY_DRIVERS } from "../types"

const initialState = {
    factures: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_FACTURES_BY_DRIVERS:
            // console.log("SET_FACTURES_BY_PARTNERS")
            return {
                ...state,

                factures: action.payload,


            }

        default:
            return state
    }

}


