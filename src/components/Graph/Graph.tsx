import * as React from 'react';

import CanvasJS from 'canvasjs';
/*

[
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

 */
class Graph extends React.Component<{}, {}> {
    render() {
        const options = {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: true,
            title:{
                text: "Stock Movement"
            },
            axisY:{
                title: "Stock In Hand",
                includeZero: false
            },
            data: [{
                type: "stepLine",
                xValueFormatString: "MMM YYYY",
                markerSize: 5,
                dataPoints: [
                    { x: new Date("2017- 01- 01"), y: 1792 },
                    { x: new Date("2017- 02- 20"), y: 1526 },
                    { x: new Date("2017- 03- 11"), y: 1955 },
                    { x: new Date("2017- 04- 05"), y: 1727 },
                    { x: new Date("2017- 05- 04"), y: 1523 },
                    { x: new Date("2017- 06- 21"), y: 1257 },
                    { x: new Date("2017- 07- 05"), y: 1520 },
                    { x: new Date("2017- 08- 03"), y: 1853 },
                    { x: new Date("2017- 09- 11"), y: 1738 },
                    { x: new Date("2017- 10- 03"), y: 1754 }
                ]
            }]
        }
        return (
            <div>
                {/*<CanvasJS.Chart options = {options}*/}
                    {/*/* onRef={ref => this.chart = ref} */*/}
                {/*/>*/}
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default Graph;