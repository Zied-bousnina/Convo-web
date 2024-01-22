import {  SET_FACTURE_DETAIL_ADMIN} from "../types"

const initialState = {
    FactureDetails: {}


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_FACTURE_DETAIL_ADMIN:
            return {
                ...state,
                FactureDetails: action.payload

            }

        default:
            return state
    }

}


