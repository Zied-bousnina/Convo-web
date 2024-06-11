

import {   SET_STATISTIQUE_BY_PARTNER } from "../types"

const initialState = {
    statistiq: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_STATISTIQUE_BY_PARTNER:
            return {
                ...state,

                statistiq: action.payload,


            }

        default:
            return state
    }

}


