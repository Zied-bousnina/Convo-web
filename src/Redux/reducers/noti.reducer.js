

import {   SET_NEW_NOTI } from "../types"

const initialState = {
    Noti: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_NEW_NOTI:
            return {
                ...state,

                Noti: action.payload,


            }

        default:
            return state
    }

}


