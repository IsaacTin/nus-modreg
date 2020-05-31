import React, { useReducer } from 'react';
import axios from 'axios';
import ModuleContext from './authContext';
import moduleReducer from './authReducer';
import { GET_MODULES, MODULE_ERROR } from '../types';

const ModuleState = (props) => {
    const initialState = {
        currentModules: null,
        displayedModules: null,
        confirmedModules: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(moduleReducer, initialState);

    // get all the confirmed modules that the user already has in the database; could return an empty array if there are no modules
    const getModules = async () => {
        try {
            const res = await axios.get('/api/user-modules');
            dispatch({
                type: GET_MODULES,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: MODULE_ERROR,
                payload: error.response.msg
            });
        }
    };

    // confirms the current module selection and stores them in the database
    const confirmModules = async (modules, id) => {};

    return (
        <ModuleContext.Provider>
            value=
            {{
                currentModules: state.currentModules,
                displayedModules: state.displayedModules,
                confirmedModules: state.confirmedModules,
                loading: state.loading,
                error: state.error,
                getModules
            }}
        </ModuleContext.Provider>
    );
};
