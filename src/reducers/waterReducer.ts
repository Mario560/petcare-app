import {Reading} from "../types/Reading";
import {waterActions} from "../actions/waterActions";

export interface WaterState {
    graphData: Reading[],
    drankToday: number,
    lastTimeDrank: string,
    currentWeight: number;
}

const initialState: WaterState = {
    graphData: [],
    drankToday: 0,
    lastTimeDrank: '-',
    currentWeight: 0
};


// @ts-ignore
export default function (state = initialState, action) {
    switch (action.type) {
        case waterActions.FETCH_WATER_GRAPH_DATA:
            return {
                ...state,
                graphData: action.payload
            };
        case waterActions.FETCH_WATER_DRANK_TODAY:
            return {
                ...state,
                drankToday: action.payload
            };
        case waterActions.FETCH_WATER_LAST_TIME_DRANK:
            return {
                ...state,
                lastTimeDrank: action.payload
            };
        case waterActions.FETCH_WATER_CURRENT_WEIGHT:
            return {
                ...state,
                currentWeight: action.payload
            };
        default:
            return initialState;
    }
}
