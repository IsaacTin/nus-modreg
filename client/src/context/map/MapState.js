import React, { useReducer } from 'react';
import MapContext from './mapContext';
import mapReducer from './mapReducer';
import axios from 'axios';

import {
    SET_COORDS,
    SET_FIRST_LOCATION,
    SET_SECOND_LOCATION,
    SET_DAY,
    GET_BUS_STOPS,
} from '../types';

const MapState = (props) => {
    const initialState = {
        currentCoords: [],
        firstLocation: null,
        secondLocation: null,
        busStops: [],
        day: null
    }

    const [state, dispatch] = useReducer(mapReducer, initialState);

    const setCoords = async (venues) => {
        dispatch({
            type: SET_COORDS,
            payload: venues
        })
    }

    const getBusStops = async () => {
        const res = await axios.get('/api/bus-stops');
        console.log(res.data);
        dispatch({
            type: GET_BUS_STOPS,
            payload: res.data
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
                busStops: state.busStops,
                day: state.day,
                setCoords,
                setFirstLocation,
                setSecondLocation,
                setDay,
                getBusStops
            }}
        >
        {props.children}
        </MapContext.Provider>
    )
}

export default MapState;
