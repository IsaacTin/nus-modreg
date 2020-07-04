import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import {
    FILTER_MODULES,
    FILTER_ERROR,
    CLEAR_FILTER,
    ADD_SELECTION,
    DELETE_SELECTION,
    CLEARALL_SELECTION,
    IS_SEARCHED_TRUE,
    IS_SEARCHED_FALSE,
    ADD_TIME_FILTER,
    DELETE_TIME_FILTER,
    CLEAR_ALL_TIME_FILTERS
} from '../types';

const SearchState = (props) => {
    const initialState = {
        filtered: null,
        timeFilter: [
            { startTime: [], endTime: [] },
            { startTime: [], endTime: [] },
            { startTime: [], endTime: [] },
            { startTime: [], endTime: [] },
            { startTime: [], endTime: [] }
        ],
        selection: [],
        searchLoading: true,
        isSearched: false,
        error: null
    };

    const [state, dispatch] = useReducer(searchReducer, initialState);

    // filter modules from database
    const filterModules = async (text) => {
        try {
            console.log(`/api/search-modules/${text}`);
            const res = await axios.get(`/api/search-modules/${text}`);
            dispatch({
                type: FILTER_MODULES,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: FILTER_ERROR,
                payload: error.response.msg
            });
        }
    };

    const addTimeFilter = (day, startTime, endTime) => {
        dispatch({
            type: ADD_TIME_FILTER,
            payload: [day, startTime, endTime]
        });
    };

    const deleteTimeFilter = (day, startTime, endTime) => {
        dispatch({
            type: DELETE_TIME_FILTER,
            payload: [day, startTime, endTime]
        });
    };

    const clearAllTimeFilters = () => {
        dispatch({
            type: CLEAR_ALL_TIME_FILTERS
        });
    };

    // clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    };

    const isSearchedTrue = () => {
        dispatch({
            type: IS_SEARCHED_TRUE
        });
    };

    const isSearchedFalse = () => {
        dispatch({
            type: IS_SEARCHED_FALSE
        });
    };

    // add module to selection array from the filter
    const addSelection = (module) => {
        dispatch({
            type: ADD_SELECTION,
            payload: module
        });
    };

    // delete module from selection array
    const deleteSelection = (module) => {
        dispatch({
            type: DELETE_SELECTION,
            payload: { moduleCode: module.moduleCode, classNo: module.classNo }
        });
    };

    // clear selections
    const clearSelection = () => {
        dispatch({
            type: CLEARALL_SELECTION
        });
    };

    return (
        <SearchContext.Provider
            value={{
                filtered: state.filtered,
                timeFilter: state.timeFilter,
                selection: state.selection,
                searchLoading: state.searchLoading,
                isSearched: state.isSearched,
                error: state.error,
                filterModules,
                addTimeFilter,
                deleteTimeFilter,
                clearAllTimeFilters,
                clearFilter,
                addSelection,
                deleteSelection,
                clearSelection,
                isSearchedTrue,
                isSearchedFalse
            }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};

export default SearchState;
