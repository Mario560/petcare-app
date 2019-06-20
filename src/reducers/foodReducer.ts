import {Reading} from "../types/Reading";
import {foodActions} from "../actions/foodActions";

export interface FoodState {
    graphData: Reading[],
    ateToday: number,
    lastTimeAte: string,
    currentWeight: number;
}

const initialState: FoodState = {
    graphData: [],
    ateToday: 0,
    lastTimeAte: '-',
    currentWeight: 0
};


// @ts-ignore
export default function (state = initialState, action) {
    switch (action.type) {
        case foodActions.FETCH_FOOD_GRAPH_DATA:
            return {
                ...state,
                graphData: action.payload
            }

            return state;

        case foodActions.FETCH_FOOD_STATS:
            console.log("reduer ", action.payload);
            return state;
        default:
            return initialState;
    }
}
