
import isEmpty from "../../utils/isEmpty"
import { SET_ERRORS, SET_USER, SET_LOADING, SET_FIRST_LOGIN } from "../types"

const initialState = {
    isConnected: false,
    isLoading: false,

    isAdmin: false,
    isPartner: false,
    isUser: false,
    isVerified: false,
    // isPrivateCompany: false,
    user: {},
    request: {},
    isFirstTime:false


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                isConnected: !isEmpty(action.payload),
                user: action.payload,
                isLoading: isEmpty(action.payload),
                isAdmin: action.payload?.role === "ADMIN",
                isPartner: action.payload?.role === "PARTNER",
                isUser: action.payload?.role === "USER",
                // isPrivateCompany: action.payload?.role === "PRIVATE_COMPANY",
                isVerified: action.payload?.verified,

                isFirstTime : action.payload?.firstLogin
            }
            case SET_FIRST_LOGIN:
                return {
                    ...state,
                    isFirstTime: action.payload
                }

        default:
            return state
    }

}


