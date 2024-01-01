import { REMOVE_SEEN_MSG } from "Redux/types";
import { ADD_UNSEEN_MSG } from "Redux/types";


export const addUnseenmsg = (payload) => ({ type: ADD_UNSEEN_MSG, payload });
export const removeSeenMsg = (payload) => ({ type: REMOVE_SEEN_MSG, payload });
