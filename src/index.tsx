import * as React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom'
import history from './history';

import 'bootstrap/dist/css/bootstrap.css';

import App from "./containers/App";

ReactDOM.render((
    <Router history={history}>
        <App />
    </Router>
), document.getElementById('root'));