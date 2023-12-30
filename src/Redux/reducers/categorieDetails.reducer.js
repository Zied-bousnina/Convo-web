import {  SET_BIN_DETAILS, SET_CONTACT_DETAIL, SET_CATEGORIE_DETAILS} from "../types"

const initialState = {
    categorie: {}


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CATEGORIE_DETAILS:
            return {
                ...state,
                categorie: action.payload

            }

        default:
            return state
    }

}


