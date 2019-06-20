import * as React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom'
import history from './history';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';

import 'bootstrap/dist/css/bootstrap.css';

import App from "./containers/App";
import {FoodState} from "./reducers/foodReducer";
import {WaterState} from "./reducers/waterReducer";
import {TemperatureState} from "./reducers/temperatureReducer";
const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
    reducers,
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

const persistor = persistStore(store);

interface StoreEnhancerState {}

interface AppState extends StoreEnhancerState {
    food: FoodState;
    water: WaterState,
    temperature: TemperatureState
}

export interface RootState extends AppState { }


ReactDOM.render((
    <Router history={history}>
        <App />
    </Router>
), document.getElementById('root'));