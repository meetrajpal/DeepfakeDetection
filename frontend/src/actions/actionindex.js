import axios from "axios";
import urls from "../config/url.json";
import { FETCH_CUR_USER } from "./types";

export const fetchCurUser = (user_id) => async (dispatch) => {
  const uri = urls.find((data) => data.operationType === "getUser")?.url;
  if (uri == null) {
    window.alert("No uri found for getUser in fetchCurUser.");
    return;
  }
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  const res = await axios.get(
    process.env.REACT_APP_API_URL + uri + `?user_id=${user_id}`
  );
  dispatch({ type: FETCH_CUR_USER, payload: res.data });
};
