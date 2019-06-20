import {Reading} from "../types/Reading";
import {temperatureActions} from "../actions/temperatureActions";

export interface TemperatureState {
    graphData: Reading[],
    maxToday: number,
    currentTemp: number;
}

const initialState: TemperatureState = {
    graphData: [],
    maxToday: 24,
    currentTemp: 22
};


// @ts-ignore
// export const foodReducer = produce<ReadingsState, AppAction>((state, action) => {
export default function (state = initialState, action) {
    switch (action.type) {
        case temperatureActions.FETCH_TEMPERATURE_GRAPH_DATA:
            console.log("reduer");
            return;

        case temperatureActions.FETCH_TEMPERATURE_STATS:
            console.log("reduer");
            return;
        default:
            return initialState;
    }
}
// }, initialState);
