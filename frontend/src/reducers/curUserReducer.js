import { FETCH_CUR_USER } from "../actions/types";

const currentUserReducer = (state = "", action) => {
  switch (action.type) {
    case FETCH_CUR_USER:
      return action.payload;
    default:
      return state;
  }
};

export default currentUserReducer;
