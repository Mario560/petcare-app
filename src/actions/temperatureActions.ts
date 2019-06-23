import {TimeframeForm} from "../types/TimeframeForm";
import api from "../utils/api";

export const temperatureActions = {
    FETCH_TEMPERATURE_GRAPH_DATA: 'FETCH_TEMPERATURE_GRAPH_DATA',
    FETCH_TEMPERATURE_CURRENT: 'FETCH_TEMPERATURE_CURRENT',
    FETCH_TEMPERATURE_MAX: 'FETCH_TEMPERATURE_MAX',
    FETCH_TEMPERATURE_MIN: 'FETCH_TEMPERATURE_MIN',
};


export const fetchTemperatureGraphData = (form: TimeframeForm) => (dispatch: any) => {
    api.post('/temperature/graph-stats', form)
        .then((res) => {
            dispatch({
                type: temperatureActions.FETCH_TEMPERATURE_GRAPH_DATA,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const fetchCurrentTemperature = () => (dispatch: any) => {
    api.get('/temperature/current')
        .then((res) => {
            dispatch({
                type: temperatureActions.FETCH_TEMPERATURE_CURRENT,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const fetchMaxTemperature = () => (dispatch: any) => {
    api.get('/temperature/max')
        .then((res) => {
            dispatch({
                type: temperatureActions.FETCH_TEMPERATURE_MAX,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};

export const fetchMinTemperature = () => (dispatch: any) => {
    api.get('/temperature/min')
        .then((res) => {
            dispatch({
                type: temperatureActions.FETCH_TEMPERATURE_MIN,
                payload: res.data,
            });
        })
        .catch((e) => {
            console.log("request failed ", e);
        });
};