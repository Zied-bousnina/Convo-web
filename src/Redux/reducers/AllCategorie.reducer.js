

import {  SET_ALL_CATEGORIES } from "../types"

const initialState = {
    categorie: []


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ALL_CATEGORIES:
            return {
                ...state,
                categorie: action.payload

            }

        default:
            return state
    }

}


