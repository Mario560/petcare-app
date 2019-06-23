import {Reading} from "../types/Reading";
import {temperatureActions} from "../actions/temperatureActions";

export interface TemperatureState {
    graphData: Reading[],
    maxToday: number,
    minToday: number,
    currentTemp: number;
}

const initialState: TemperatureState = {
    graphData: [],
    maxToday: 0,
    minToday: 0,
    currentTemp: 0,
};


// @ts-ignore
export default function (state = initialState, action) {
    switch (action.type) {
        case temperatureActions.FETCH_TEMPERATURE_GRAPH_DATA:
            return {
                ...state,
                graphData: action.payload
            };
        case temperatureActions.FETCH_TEMPERATURE_CURRENT:
            return {
                ...state,
                currentTemp: action.payload
            };
        case temperatureActions.FETCH_TEMPERATURE_MAX:
            return {
                ...state,
                maxToday: action.payload
            };
        case temperatureActions.FETCH_TEMPERATURE_MIN:
            return {
                ...state,
                minToday: action.payload
            };
        default:
            return initialState;
    }
}