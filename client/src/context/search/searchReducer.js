import { FILTER_MODULES, FILTER_ERROR, CLEAR_FILTER } from '../types';

export default (state, action) => {
    switch (action.type) {
        case FILTER_MODULES:
            return {
                ...state,
                filtered: action.payload
            };
        case FILTER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
                error: null
            };
        default:
            return state;
    }
};
