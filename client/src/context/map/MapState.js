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
    SET_FIRST_NEAREST,
    SET_SECOND_NEAREST,
    SET_LOADED
} from '../types';

const MapState = (props) => {
    const initialState = {
        currentCoords: [],
        firstLocation: null,
        firstNearest: null,
        secondLocation: null,
        secondNearest: null,
        busStops: [],
        day: null,
        loaded: false
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

    const setFirstNearest = (BusStop) => {
        dispatch({
            type: SET_FIRST_NEAREST,
            payload: BusStop
        })
    }

    const setSecondNearest = (BusStop) => {
        dispatch({
            type: SET_SECOND_NEAREST,
            payload: BusStop
        })
    }

    const setLoaded = (Boolean) => {
        dispatch({
            type: SET_LOADED,
            payload: Boolean
        })
    }

    return (
        <MapContext.Provider
            value={{
                currentCoords: state.currentCoords,
                firstLocation: state.firstLocation,
                firstNearest: state.firstNearest,
                secondLocation: state.secondLocation,
                secondNearest: state.secondNearest,
                busStops: state.busStops,
                day: state.day,
                loaded: state.loaded,
                setCoords,
                setFirstLocation,
                setSecondLocation,
                setDay,
                getBusStops,
                setFirstNearest,
                setSecondNearest,
                setLoaded
            }}
        >
        {props.children}
        </MapContext.Provider>
    )
}

export default MapState;
