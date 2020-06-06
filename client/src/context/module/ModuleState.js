import React, { useReducer } from 'react';
import axios from 'axios';
import ModuleContext from './moduleContext';
import moduleReducer from './moduleReducer';
import {
    GET_MODULES,
    MODULE_ERROR,
    CONFIRM_MODULES,
    CLEAR_MODULES,
    ADD_MODULES,
    DELETE_MODULE,
    UPDATE_RANKINGS,
    SET_MODULES
} from '../types';

const ModuleState = (props) => {
    const initialState = {
        currentModules: null,
        displayedModules: null,
        confirmedModules: null,
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
    const confirmModules = async (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `api/user-modules/${id}`,
                state.currentModules,
                config
            );
            dispatch({
                type: CONFIRM_MODULES,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: MODULE_ERROR,
                payload: error.response.msg
            });
        }
    };

    // clear modules from current state
    const clearModules = () => {
        dispatch({
            type: CLEAR_MODULES
        });
    };

    // add a single module to the currentModules array
    // NOTE!! adds the id to the array
    // note: this function does not deal with the API; rather it deals with the global state
    const addModules = (modules) => {
        if (!modules) {
            dispatch({
                type: MODULE_ERROR,
                payload: 'No modules provided'
            });
        }

        dispatch({
            type: ADD_MODULES,
            payload: module
        });
    };

    // delete specified module
    const deleteModule = (module) => {
        if (!module) {
            dispatch({
                type: MODULE_ERROR,
                payload: 'No module specified to delete'
            });
        }

        dispatch({
            type: DELETE_MODULE,
            payload: module
        });
    };

    // update ranking of currentModules; takes in the array of modules that have been sorted according to their new order
    const updateModuleRankings = (modules) => {
        if (!modules) {
            dispatch({
                type: MODULE_ERROR,
                payload: 'No modules provided'
            });
        }

        dispatch({
            type: UPDATE_RANKINGS,
            payload: modules
        });
    };

    const setModules = (modules) => {
        dispatch({
            type: SET_MODULES,
            payload: modules
        });
    };

    return (
        <ModuleContext.Provider
            value={{
                currentModules: state.currentModules,
                displayedModules: state.displayedModules,
                confirmedModules: state.confirmedModules,
                loading: state.loading,
                error: state.error,
                getModules,
                confirmModules,
                clearModules,
                addModules,
                deleteModule,
                updateModuleRankings,
                setModules
            }}
        >
            {props.children}
        </ModuleContext.Provider>
    );
};

export default ModuleState;
