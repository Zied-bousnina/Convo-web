import { SEARCH_RESULT } from "Redux/types";
import { SEARCH_ERROR } from "Redux/types";
import { SEARCH_LOADING } from "Redux/types";


export const searhcLoding = (payload) => ({ type: SEARCH_LOADING, payload });
export const searchError = (payload) => ({ type: SEARCH_ERROR, payload });
export const searchResult = (payload) => ({ type: SEARCH_RESULT, payload });

export const makeSearchApi = (search) => async (dispatch) => {
  searhcLoding(true);
  const user = JSON.parse(localStorage.getItem("userInfo")) || {};
  const url = `https://messanger-br6c.onrender.com/auth?search=${search}`;
  try {
    let res = await fetch(url, {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    let data = await res.json();
    dispatch(searchResult(data));
  } catch (err) {
    dispatch(searchError(true));
    console.log(err.message);
  }
};
