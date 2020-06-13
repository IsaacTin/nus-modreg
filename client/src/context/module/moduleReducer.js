import {
    GET_MODULES,
    MODULE_ERROR,
    CONFIRM_MODULES,
    CLEAR_MODULES,
    ADD_MODULES,
    DELETE_MODULE,
    UPDATE_RANKINGS,
    SET_CURRENT_MODULES,
    CLEAR_CURRENT_MODULES,
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
        // lai this one for localStorage
        case ADD_MODULES:
            const updatedModules = [
                ...new Set([...state.currentModules, ...action.payload])
            ];
            localStorage.setItem(
                'currentModules',
                JSON.stringify(updatedModules)
            );
            return {
                ...state,
                currentModules: JSON.parse(
                    localStorage.getItem('currentModules')
                ),
                displayedModules: null
            };
        // lai this one for localStorage
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
            localStorage.setItem(
                'currentModules',
                JSON.stringify(action.payload)
            );
            return {
                ...state,
                currentModules: JSON.parse(
                    localStorage.getItem('currentModules')
                )
            };
        // return {
        //     ...state,
        //     currentModules: action.payload
        // };
        case CLEAR_CURRENT_MODULES:
            localStorage.removeItem('currentModules');
            return {
                ...state,
                currentModules: null
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
