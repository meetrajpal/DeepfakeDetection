import { FETCH_CUR_USER } from '../actions/types';

export default function (state = "", action) {
    switch (action.type) {
        case FETCH_CUR_USER:
            return action.payload;
        default:
            return state;
    }
}