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
    FETCH_FOOD_STATS: 'FETCH_FOOD_STATS',
    REFILL_FOOD: 'REFILL_FOOD',
};


export const fetchFoodGraphData = (form: TimeframeForm) => (dispatch: any) => {
    api.post('/food/graph-stats', form)
        .then((res) => {
                console.log("response food",  res.data);
            dispatch({
                type: foodActions.FETCH_FOOD_GRAPH_DATA,
                payload: res.data,
            });
            console.log("dispatched successfull");
            })
        .catch((e) => {
            console.log("request failed ", e);
        });
};