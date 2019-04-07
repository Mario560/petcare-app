import {Route, Switch} from "react-router";
import * as React from "react";
import Live from "./Live";
import About from "./About";

export default class App extends React.Component<{}> {
    public render() {
        return (
            <React.Fragment>
                {/*<ToastContainer />*/}
                <Switch>
                    <Route path="/stats" component={About} />
                    <Route path="/history" component={About} />
                    <Route path="/" component={Live} />
                </Switch>
            </React.Fragment>
        );
    }
}