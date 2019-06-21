// import {createStandardAction} from "typesafe-actions";
// import {TimeframeForm} from "../types/TimeframeForm";
//
// export const foodActions = {
//
//     fetchFoodGraphData: createStandardAction('FETCH_FOOD_GRAPH_DATA')<TimeframeForm>(),
//     fetchFoodStats: createStandardAction('FETCH_FOOD_GRAPH_DATA')<{date: string}>(),
//
// };

import {TimeframeForm} from "../types/TimeframeForm";
import api from "../utils/api";

export const foodActions = {
    FETCH_FOOD_GRAPH_DATA: 'FETCH_FOOD_GRAPH_DATA',
    FETCH_FOOD_CURRENT_WEIGHT: 'FETCH_FOOD_CURRENT_WEIGHT',
    FETCH_FOOD_LAST_TIME_ATE: 'FETCH_FOOD_LAST_TIME_ATE',
    FETCH_FOOD_ATE_TODAY: 'FETCH_FOOD_ATE_TODAY',
    REFILL_FOOD: 'REFILL_FOOD',
};


export const fetchFoodGraphData = (form: TimeframeForm) => (dispatch: any) => {
    api.post('/food/graph-stats', form)
        .then((res) => {
            dispatch({
                type: foodActions.FETCH_FOOD_GRAPH_DATA,
                payload: res.data,
            });
            })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const fetchCurrentFoodWeight = () => (dispatch: any) => {
    api.get('/food/current')
        .then((res) => {
            dispatch({
                type: foodActions.FETCH_FOOD_CURRENT_WEIGHT,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const fetchLastTimeAte = () => (dispatch: any) => {
    api.get('/food/last-time-ate-today')
        .then((res) => {
            dispatch({
                type: foodActions.FETCH_FOOD_LAST_TIME_ATE,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const fetchAteToday = () => (dispatch: any) => {
    api.get('/food/ate-today')
        .then((res) => {
            dispatch({
                type: foodActions.FETCH_FOOD_ATE_TODAY,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const refillFood = () => (dispatch: any) => {
    api.get('/food/refill')
        .catch((e) => {
            console.log("request failed ", e);
        });
};

