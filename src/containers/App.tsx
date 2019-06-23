import {Route, Switch} from "react-router";
import * as React from "react";
import Food from "./Food";
import Water from "./Water";
import Temperature from "./Temperature";

export default class App extends React.Component<{}> {
    public render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/water" component={Water} />
                    <Route path="/temperature" component={Temperature} />
                    <Route path="/food" component={Food} />
                    <Route path="/" component={Food} />
                </Switch>
            </React.Fragment>
        );
    }
}