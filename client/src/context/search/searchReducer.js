import {
    FILTER_MODULES,
    FILTER_ERROR,
    CLEAR_FILTER,
    ADD_SELECTION,
    CLEARALL_SELECTION,
    DELETE_SELECTION,
    IS_SEARCHED_TRUE,
    IS_SEARCHED_FALSE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case FILTER_MODULES:
            return {
                ...state,
                filtered: action.payload,
                searchLoading: false
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
                error: null,
                searchLoading: true
            };
        case IS_SEARCHED_TRUE:
            return {
                ...state,
                isSearched: true
            };
        case IS_SEARCHED_FALSE:
            return {
                ...state,
                isSearched: false
            };
        case ADD_SELECTION:
            return {
                ...state,
                selection: [...state.selection, action.payload]
            };
        case DELETE_SELECTION:
            return {
                ...state,
                selection: state.selection.filter(
                    (module) => module !== action.payload.toString()
                )
            };
        case CLEARALL_SELECTION:
            return {
                ...state,
                selection: []
            };
        default:
            return state;
    }
};
