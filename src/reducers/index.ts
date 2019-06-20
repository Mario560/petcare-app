import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import waterReducer from "./waterReducer";
import temperatureReducer from "./temperatureReducer";

const rootReducer = combineReducers({
    food: foodReducer,
    water: waterReducer,
    temperature: temperatureReducer,

});

export default rootReducer;
