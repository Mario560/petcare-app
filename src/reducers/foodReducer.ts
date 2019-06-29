import {Reading} from "../types/Reading";
import {foodActions} from "../actions/foodActions";

export interface FoodState {
    graphData: any[],
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
            };
        case foodActions.FETCH_FOOD_ATE_TODAY:
            return {
                ...state,
                ateToday: action.payload
            };
        case foodActions.FETCH_FOOD_LAST_TIME_ATE:
            return {
                ...state,
                lastTimeAte: action.payload
            };
        case foodActions.FETCH_FOOD_CURRENT_WEIGHT:
            return {
                ...state,
                currentWeight: action.payload
            };
        default:
            return initialState;
    }
}
