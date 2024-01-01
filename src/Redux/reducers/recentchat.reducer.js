// import { RECENT_ERROR, RECENT_LOADING, NEW_CREATED_CHAT, ADD_RECENT_CHAT } from "Redux/types";

import { RECENT_ERROR } from "Redux/types";
import { RECENT_LOADING } from "Redux/types";
import { NEW_CREATED_CHAT } from "Redux/types";
import { ADD_RECENT_CHAT } from "Redux/types";

const initialState = {
  recent_chat: [],
  loading: true,
  error: false,
};

export default function(state = initialState, action)  {
  const { type, payload } = action;

  switch (type) {
    case ADD_RECENT_CHAT:
      return {
        ...state,
        recent_chat: payload,
        loading: false,
        error: false,
      };
    case NEW_CREATED_CHAT:
      return {
        ...state,
        recent_chat: [payload, ...state.recent_chat],
        loading: false,
        error: false,
      };
    case RECENT_ERROR:
      return { ...state, error: payload };
    case RECENT_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};
