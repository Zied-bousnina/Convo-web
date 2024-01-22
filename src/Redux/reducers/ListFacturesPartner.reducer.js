

import {   SET_FACTURES_BY_PARTNERS } from "../types"

const initialState = {
    factures: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_FACTURES_BY_PARTNERS:
            // console.log("SET_FACTURES_BY_PARTNERS")
            return {
                ...state,

                factures: action.payload,


            }

        default:
            return state
    }

}


