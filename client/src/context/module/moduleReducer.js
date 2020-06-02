import {
    GET_MODULES,
    MODULE_ERROR,
    CONFIRM_MODULES,
    ADD_MODULE,
    DELETE_MODULE,
    UPDATE_RANKINGS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_MODULES:
            return {
                ...state,
                confirmedModules: action.payload,
                loading: false
            };
        case MODULE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CONFIRM_MODULES:
            return {
                ...state,
                confirmedModules: action.payload,
                loading: false
            };
        case ADD_MODULE:
            return {
                ...state,
                currentModules: [...state.modules, action.payload._id],
                loading: false
            };
        case DELETE_MODULE:
            return {
                ...state,
                currentModules: state.currentModules.filter(
                    (module) => module._id !== action.payload._id
                ),
                loading: false
            };
        case UPDATE_RANKINGS:
            return {
                ...state,
                currentModules: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
