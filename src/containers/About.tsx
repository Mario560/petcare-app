import * as React from 'react';
import {Button} from "reactstrap";

export default class About extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, about</h1>
                <Button outline color="primary" onClick={() => console.log("aaa")} style={{textAlign:"center"}}>Refill food</Button>

            </div>
        );
    }
}