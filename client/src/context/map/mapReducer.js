import {
    SET_COORDS,
    SET_FIRST_LOCATION,
    SET_FIRST_NEAREST,
    SET_SECOND_LOCATION,
    SET_SECOND_NEAREST,
    SET_DAY,
    GET_BUS_STOPS,
    SET_LOADED
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SET_COORDS: 
            return {
                ...state,
                currentCoords: action.payload
            };
        case SET_FIRST_LOCATION:
            return {
                ...state,
                firstLocation: action.payload
            }
        case SET_SECOND_LOCATION:
            return {
                ...state,
                secondLocation: action.payload
            }
        case SET_DAY:
            return {
                ...state,
                day: action.payload
            }
        case GET_BUS_STOPS:
            return {
                ...state,
                busStops: action.payload
            }
        case SET_FIRST_NEAREST:
            return {
                ...state,
                firstNearest: action.payload
            }
        case SET_SECOND_NEAREST:
            return {
                ...state,
                secondNearest: action.payload
            }
        case SET_LOADED:
            return {
                ...state,
                loaded: action.payload
            }
        default:
            return state;
    }
}