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
}

export default class Graph extends React.Component<Props, object> {
    public render(): React.ReactNode {
        if(this.props.data.length == 0){
            console.log("prazno");
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
                        <ValueScale name="weight"/>

                        <ArgumentAxis/>
                        <ValueAxis scaleName="weight" position="left" showGrid={true} showLine={true} showTicks={true}
                                   showLabels={true}/>

                        <LineSeries
                            name="Food amount"
                            valueField="weight"
                            argumentField="timestamp"
                            scaleName="weight"
                            color="red"
                            seriesComponent={Line}
                        />
                        <Title
                            text="Food"
                        />
                        <EventTracker/>
                        <Tooltip/>

                    </Chart>
                </Paper>
            );
        }
    }
}