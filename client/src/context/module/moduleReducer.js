import { GET_MODULES, MODULE_ERROR } from '../types';

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
        default:
            return state;
    }
};
