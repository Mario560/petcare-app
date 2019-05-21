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

interface IDataItem {
    timestamp: string,
    weight: number
}

const chartData2: IDataItem[] = [
    {
        "timestamp": "2019-04-06T08:00:00",
        "weight": 50
    },
    {
        "timestamp": "2019-04-06T08:23:00",
        "weight": 48
    },
    {
        "timestamp": "2019-04-06T08:23:10",
        "weight": 46
    },
    {
        "timestamp": "2019-04-06T08:23:20",
        "weight": 43
    },
    {
        "timestamp": "2019-04-06T08:23:40",
        "weight": 40
    },
    {
        "timestamp": "2019-04-06T11:42:43",
        "weight": 39
    },
    {
        "timestamp": "2019-04-06T11:42:53",
        "weight": 38
    },
    {
        "timestamp": "2019-04-06T11:43:03",
        "weight": 36
    },
    {
        "timestamp": "2019-04-06T11:43:13",
        "weight": 34
    },
    {
        "timestamp": "2019-04-06T11:43:23",
        "weight": 31
    },
    {
        "timestamp": "2019-04-06T11:43:33",
        "weight": 29
    },
    {
        "timestamp": "2019-04-06T11:43:43",
        "weight": 26
    }
]

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

export default class Demo extends React.Component<object, object> {
    public render(): React.ReactNode {
        return (
            <Paper>
                <Chart
                    data={chartData2}
                >
                    <ValueScale name="weight" />

                    <ArgumentAxis />
                    <ValueAxis scaleName="weight" position="left" showGrid={true} showLine={true} showTicks={true} showLabels={true} />

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
                    <EventTracker />
                    <Tooltip />

                </Chart>
            </Paper>
        );
    }
}