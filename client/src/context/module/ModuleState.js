import React, { useReducer } from 'react';
import axios from 'axios';
import ModuleContext from './moduleContext';
import moduleReducer from './moduleReducer';
import setAuthToken from '../../utils/setAuthToken';
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

const ModuleState = (props) => {
    const initialState = {
        currentModules: [{
            moduleCode: "CS2100",
            title: "Computer Organisation",
            lessonType: "Lecture",
            classNo: "08",
            size: 30,
            timing: [{
                startTime: "1500",
                endTime: "1600",
                day: "Friday",
                venue: "COM1-0208"
                },
                {
                startTime: "1100",
                endTime: "1200",
                day: "Monday",
                venue: "COM1-0208"
                }]
        },
        {
            moduleCode: "CS2100",
            title: "Computer Organisation",
            lessonType: "Tutorial",
            classNo: "18",
            size: 30,
            timing: [{
                startTime: "1300",
                endTime: "1400",
                day: "Friday",
                venue: "COM1-0209"
            }]
            },
            {
                moduleCode: "CS2030",
                title: "Computer Methodology II",
                lessonType: "Laboratory",
                classNo: "18",
                size: 30,
                timing: [{
                    startTime: "1700",
                    endTime: "1800",
                    day: "Friday",
                    venue: "COM1-0211"
            }]
        }, 
        {
            moduleCode: "CS2030",
            title: "Computer Methodology II",
            lessonType: "Laboratory",
            classNo: "20",
            size: 30,
            timing: [{
                startTime: "1400",
                endTime: "1500",
                day: "Tuesday",
                venue: "COM1-0211"
        }]
    }],
        displayedModules: [],
        confirmedModules: null,
        error: null
    };

    const [state, dispatch] = useReducer(moduleReducer, initialState);

    // get all the confirmed modules that the user already has in the database; could return an empty array if there are no modules
    const getModules = async () => {
        try {
            // impt to have this if the token is required
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            const res = await axios.get('api/user-modules');
            dispatch({
                type: GET_MODULES,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: MODULE_ERROR,
                // potentially buggy
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

    // add an array of modules to the currentModules array
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
            payload: modules
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

    const setCurrentModules = (modules) => {
        dispatch({
            type: SET_CURRENT_MODULES,
            payload: modules
        });
    };

    const clearCurrentModules = () => {
        dispatch({
            type: CLEAR_CURRENT_MODULES
        });
    };

    const setDisplayedModules = (modules) => {
        dispatch({
            type: SET_DISPLAYED_MODULES,
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
                setCurrentModules,
                clearCurrentModules,
                setDisplayedModules
            }}
        >
            {props.children}
        </ModuleContext.Provider>
    );
};

export default ModuleState;
