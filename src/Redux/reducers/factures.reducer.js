

import {  SET_FACTURES_BY_PARTNER } from "../types"

const initialState = {
    factures: []


}


export default function(state = initialState, action) {
    switch(action.type) {
        case SET_FACTURES_BY_PARTNER:
            return {
                ...state,
                factures: action.payload

            }

        default:
            return state
    }

}


