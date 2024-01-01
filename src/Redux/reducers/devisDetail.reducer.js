import {  SET_devis_DETAIL} from "../types"

const initialState = {
    devisDetails: {}


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_devis_DETAIL:
            return {
                ...state,
                devisDetails: action.payload

            }

        default:
            return state
    }

}


