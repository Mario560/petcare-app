import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Chart,
    LineSeries,
    Tooltip, Title
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';
import {line, curveStep, curveStepAfter} from "d3-shape";
import { EventTracker } from '@devexpress/dx-react-chart';
import {Button} from "reactstrap";
import {Reading} from "../../types/Reading";


// @ts-ignore
const Line = (props) => (
    <LineSeries.Path
        {...props}
        path={line()
        // @ts-ignore
            .x(({ x }) => x)
        // @ts-ignore
            .y(({ y }) => y)
            .curve(curveStepAfter)}
    />
);

interface Props {
    data: Reading[];
    title: string;
}

export default class Graph extends React.Component<Props, object> {
    public render(): React.ReactNode {

        if(this.props.data.length == 0){
            return (
                <div>
                    <h1>No data for selected date</h1>
                </div>
            );
        } else {
            return (
                <Paper>
                    <Chart
                        data={this.props.data}
                    >
                        <ValueScale name="value"/>

                        <ArgumentAxis/>
                        <ValueAxis scaleName="value" position="left" showGrid={true} showLine={true} showTicks={true}
                                   showLabels={true}/>

                        {this.props.title == "Temperature" ?
                        <LineSeries
                            name="amount"
                            valueField="value"
                            argumentField="timestamp"
                            scaleName="value"
                            color="red"
                            seriesComponent={Line}
                        /> : <LineSeries
                                name="amount"
                                valueField="weight"
                                argumentField="timestamp"
                                scaleName="value"
                                color="red"
                                seriesComponent={Line}
                            /> }

                        <Title
                            text={this.props.title}
                        />
                        <EventTracker/>
                        <Tooltip/>

                    </Chart>
                </Paper>
            );
        }
    }
}