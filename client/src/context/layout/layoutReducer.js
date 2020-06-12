import { TOGGLE_SIDEBAR, CLOSE_SIDEBAR } from '../types';

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
        default:
            return state;
    }
};
