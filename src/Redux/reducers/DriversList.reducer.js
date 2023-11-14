

import {  SET_ALL_DRIVER } from "../types"

const initialState = {
    driver_list: []


}


export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ALL_DRIVER:
            return {
                ...state,
                driver_list: action.payload

            }

        default:
            return state
    }

}


