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

export const temperatureActions = {
    FETCH_TEMPERATURE_GRAPH_DATA: 'FETCH_TEMPERATURE_GRAPH_DATA',
    FETCH_TEMPERATURE_STATS: 'FETCH_TEMPERATURE_STATS',
};


export const fetchTemperatureGraphData = (form: TimeframeForm) => (dispatch: any) => {
    api.post('/temperature/graph-stats', form)
        .then((res) => {
            dispatch({
                type: temperatureActions.FETCH_TEMPERATURE_GRAPH_DATA,
                payload: res.data,
            });
        })
        .catch(() => {
            console.log("request failed");
        });
};