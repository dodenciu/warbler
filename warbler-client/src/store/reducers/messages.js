import {LOAD_MESSAGES, REMOVE_MESSAGES} from "../actionTypes";

export default (state=[], action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGES:
            return [...action.messages];
        default:
            return state;
    }
}