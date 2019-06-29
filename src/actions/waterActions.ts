import {TimeframeForm} from "../types/TimeframeForm";
import api from "../utils/api";

export const waterActions = {
    FETCH_WATER_GRAPH_DATA: 'FETCH_WATER_GRAPH_DATA',
    FETCH_WATER_CURRENT_WEIGHT: 'FETCH_WATER_CURRENT_WEIGHT',
    FETCH_WATER_LAST_TIME_DRANK: 'FETCH_WATER_LAST_TIME_DRANK',
    FETCH_WATER_DRANK_TODAY: 'FETCH_WATER_DRANK_TODAY',
};


export const fetchWaterGraphData = (form: TimeframeForm) => (dispatch: any) => {
    api.post('/water/graph-stats', form)
        .then((res) => {
            dispatch({
                type: waterActions.FETCH_WATER_GRAPH_DATA,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("water graph stats request failed", e);
        });
};

export const fetchCurrentWaterWeight = () => (dispatch: any) => {
    api.get('/water/current')
        .then((res) => {
            dispatch({
                type: waterActions.FETCH_WATER_CURRENT_WEIGHT,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const fetchLastTimeDrank = () => (dispatch: any) => {
    api.get('/water/last-time-drank-today')
        .then((res) => {
            dispatch({
                type: waterActions.FETCH_WATER_LAST_TIME_DRANK,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const fetchDrankToday = (form: TimeframeForm) => (dispatch: any) => {
    api.post('/water/drank-today', form)
        .then((res) => {
            dispatch({
                type: waterActions.FETCH_WATER_DRANK_TODAY,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};