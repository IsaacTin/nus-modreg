import React, { useReducer } from 'react';
import modalertReducer from './modalertReducer';
import ModalertContext from './modalertContext';
import { SET_CONFLICT, REMOVE_CONFLICT, GET_CONFLICTS } from '../types';

const ModalertState = (props) => {
    const initialState = {
        conflicts: [[], [], [], [], []]
    };

    const [state, dispatch] = useReducer(modalertReducer, initialState);

    const setConflict = (conflict) => {
        dispatch({
            type: SET_CONFLICT,
            payload: conflict
        });
    };

    const removeConflict = (conflict) => {
        dispatch({
            type: REMOVE_CONFLICT,
            payload: conflict
        });
    };

    const getConflicts = (modules, day) => {
        dispatch({
            type: GET_CONFLICTS,
            payload: { modules, day }
        });
    };

    return (
        <ModalertContext.Provider
            value={{
                conflicts: state.conflicts,
                setConflict,
                removeConflict,
                getConflicts
            }}
        >
            {props.children}
        </ModalertContext.Provider>
    );
};

export default ModalertState;
