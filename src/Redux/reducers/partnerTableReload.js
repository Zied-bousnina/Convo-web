
import {  SET_IS_LOADING_PARTNER_TABLE } from "../types"

const initialState = {

    isLoading: false,




}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_IS_LOADING_PARTNER_TABLE:
            return {
                ...state,
               isLoading: action.payload
                // isLoading: isEmpty(action.payload),


            }

        default:
            return state
    }

}


