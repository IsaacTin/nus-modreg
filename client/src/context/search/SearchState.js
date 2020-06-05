import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import { FILTER_MODULES, FILTER_ERROR, CLEAR_FILTER } from '../types';

const SearchState = (props) => {
    const initialState = {
        filtered: null,
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

    return (
        <SearchContext.Provider
            value={{
                filtered: state.filtered,
                error: state.error,
                filterModules,
                clearFilter
            }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};

export default SearchState;
