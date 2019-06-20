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

export const waterActions = {
    FETCH_WATER_GRAPH_DATA: 'FETCH_WATER_GRAPH_DATA',
    FETCH_WATER_STATS: 'FETCH_WATER_STATS',
};


export const fetchWaterGraphData = (form: TimeframeForm) => (dispatch: any) => {
    api.post('/water/graph-stats', form)
        .then((res) => {
            console.log("aadd", res.data);
            dispatch({
                type: waterActions.FETCH_WATER_GRAPH_DATA,
                payload: res.data,
            });
        })
        .catch(() => {
            console.log("request failed");
        });
};