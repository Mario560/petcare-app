import {Route, Switch} from "react-router";
import * as React from "react";
import Food from "./Food";
import Water from "./Water";
import Temperature from "./Temperature";
import Home from "./Home";

export default class App extends React.Component<{}> {
    public render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/water" component={Water} />
                    <Route path="/temperature" component={Temperature} />
                    <Route path="/food" component={Food} />
                    <Route path="/" component={Home} />
                </Switch>
            </React.Fragment>
        );
    }
}