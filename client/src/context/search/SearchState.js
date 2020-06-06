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
    CLEARALL_SELECTION
} from '../types';

const SearchState = (props) => {
    const initialState = {
        filtered: null,
        selection: [],
        error: null
    };

    const [state, dispatch] = useReducer(searchReducer, initialState);

    // filter modules from database
    const filterModules = async (text) => {
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // };

        try {
            const res = await axios.get(`api/search-modules/${text}`);
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

    // clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    };

    // add module to selection array from the filter
    const addSelection = (module) => {
        dispatch({
            type: ADD_SELECTION,
            payload: module._id
        });
    };

    // delete module from selection array
    const deleteSelection = (module) => {
        dispatch({
            type: DELETE_SELECTION,
            payload: module._id
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
                selection: state.selection,
                error: state.error,
                filterModules,
                clearFilter,
                addSelection,
                deleteSelection,
                clearSelection
            }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};

export default SearchState;
