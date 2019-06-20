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
// export const foodReducer = produce<ReadingsState, AppAction>((state, action) => {
export default function (state = initialState, action) {
    switch (action.type) {
        case waterActions.FETCH_WATER_GRAPH_DATA:
            console.log("reduer ", action.payload);
            return;

        case waterActions.FETCH_WATER_STATS:
            console.log("reduer", action.payload);
            return;
        default:
            return initialState;
    }
}
// }, initialState);
