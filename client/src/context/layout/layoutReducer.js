import {
    TOGGLE_SIDEBAR,
    CLOSE_SIDEBAR,
    TOGGLE_MENU,
    CLOSE_MENU
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen
            };
        case CLOSE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: false
            };
        case TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            };
        case CLOSE_MENU:
            return {
                ...state,
                isMenuOpen: false
            };
        default:
            return state;
    }
};
