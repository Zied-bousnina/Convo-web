

import {  SET_CURRENT_USER } from "../types"

const initialState = {
    users: {}


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                users: action.payload

            }

        default:
            return state
    }

}


