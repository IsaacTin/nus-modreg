import {
    GET_MODULES,
    MODULE_ERROR,
    CONFIRM_MODULES,
    CLEAR_MODULES,
    ADD_MODULES,
    DELETE_MODULE,
    UPDATE_RANKINGS,
    SET_CURRENT_MODULES,
    SET_DISPLAYED_MODULES
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_MODULES:
            return {
                ...state,
                confirmedModules: action.payload
            };
        case MODULE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CONFIRM_MODULES:
            return {
                ...state,
                confirmedModules: action.payload
            };
        case CLEAR_MODULES:
            return {
                ...state,
                currentModules: null,
                displayedModules: null,
                confirmedModules: null,
                error: null
            };
        case ADD_MODULES:
            return {
                ...state,
                currentModules: [
                    ...new Set([...state.currentModules, ...action.payload])
                ],
                displayedModules: null
            };
        case DELETE_MODULE:
            return {
                ...state,
                currentModules: state.currentModules.filter(
                    (module) => module !== action.payload
                ),
                displayedModules: state.displayedModules.filter(
                    (module) => module._id !== action.payload
                )
            };
        case UPDATE_RANKINGS:
            return {
                ...state,
                currentModules: action.payload
            };
        case SET_CURRENT_MODULES:
            return {
                ...state,
                currentModules: action.payload
            };
        case SET_DISPLAYED_MODULES:
            return {
                ...state,
                displayedModules: action.payload
            };
        default:
            return state;
    }
};
