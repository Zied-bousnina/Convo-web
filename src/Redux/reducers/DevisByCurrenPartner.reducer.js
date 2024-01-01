import {  SET_BIN_DETAILS, SET_CONTACT_DETAIL, SET_DEVIS_BY_CURRENT_PARTNER} from "../types"

const initialState = {
    devis: []


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_DEVIS_BY_CURRENT_PARTNER:
            return {
                ...state,
                devis: action.payload

            }

        default:
            return state
    }

}


