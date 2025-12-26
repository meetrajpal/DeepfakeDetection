import { FETCH_HISTORY } from '../actions/types';

export default function (state = "", action) {
    switch (action.type) {
        case FETCH_HISTORY:
            return action.payload;
        default:
            return state;
    }
}