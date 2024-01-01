import { ADD_MESSAGE, MESSAGE_ERROR, MESSAGE_LOADING, SELECT_CHAT, SEND_MESSAGE } from "../types";


  const initialState = {
    chatting: {},
    messages: [],
    loading: false,
    error: false,
  };

  export default function(state = initialState, action)  {
    const { type, payload } = action;

    switch (type) {
      case SELECT_CHAT:
        return {
          ...state,
          chatting: payload,
          loading: false,
          error: false,
        };
      case SEND_MESSAGE:
        return {
          ...state,
          messages: [...state.messages, payload],
          loading: false,
          error: false,
        };
      case ADD_MESSAGE:
        return { ...state, messages: payload, loading: false, error: false };
      case MESSAGE_LOADING:
        return { ...state, loading: payload };
      case MESSAGE_ERROR:
        return { ...state, error: payload };
      default:
        return state;
    }
  };
