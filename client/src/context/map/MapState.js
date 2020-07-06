import React, { useReducer } from 'react';
import MapContext from './mapContext';
import mapReducer from './mapReducer'

import {
    SET_COORDS,
    SET_FIRST_LOCATION,
    SET_SECOND_LOCATION,
    SET_DAY
} from '../types';

const MapState = (props) => {
    const initialState = {
        currentCoords: [],
        firstLocation: null,
        secondLocation: null,
        day: null
    }

    const [state, dispatch] = useReducer(mapReducer, initialState);

    const setCoords = async (venues) => {
        dispatch({
            type: SET_COORDS,
            payload: venues
        })
    }

    const setFirstLocation = (venue) => {
        dispatch({
            type: SET_FIRST_LOCATION,
            payload: venue
        })
    }

    const setSecondLocation = (venue) => {
        dispatch({
            type: SET_SECOND_LOCATION,
            payload: venue
        })
    }

    const setDay = (day) => {
        dispatch({
            type: SET_DAY,
            payload: day
        })
    }

    return (
        <MapContext.Provider
            value={{
                currentCoords: state.currentCoords,
                firstLocation: state.firstLocation,
                secondLocation: state.secondLocation,
                day: state.day,
                setCoords,
                setFirstLocation,
                setSecondLocation,
                setDay
            }}
        >
        {props.children}
        </MapContext.Provider>
    )
}

export default MapState;
