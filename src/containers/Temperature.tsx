import * as React from 'react';
import DatePicker from "react-datepicker";
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";
import Graph from "../components/Graph/Graph";

import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";

import {RootState} from "../index";
import cropOnlyTime from "../utils/cropOnlyTime";
import isToday from "../utils/isToday";
import {
    fetchCurrentTemperature,
    fetchMaxTemperature,
    fetchMinTemperature,
    fetchTemperatureGraphData
} from "../actions/temperatureActions";

const CurrentStats = styled.div`
  padding-top: 30px;
  font-size: 20px;
  color: black;
  text-align: center;
`;

const NoData = styled.div`
  padding-top: 30px;
  color: black;
  text-align: center;
`;

const DateConatiner = styled.div`
  padding-top: 30px;
  color: #0275d8;
  text-align: center;
`;

interface State {
    date: Date;
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & State;

class Temperature extends React.Component<Props, State> {
    private interval: number = 0;

    constructor(props: Props) {
        super(props);
        this.state = {
            date: new Date(),
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date: any) {
        let sendDate = new Date(date).toISOString();
        sendDate = sendDate.substr(0, 10);
        let start = sendDate.concat("T00:00:00");
        let end = sendDate.concat("T23:59:00");
        this.props.fetchGraphData({startTime: start, endTime: end});
        this.setState({
            date: date
        });
    }

    componentWillMount(){
        let sendDate = new Date().toISOString();
        sendDate = sendDate.substr(0, 10);
        let start = sendDate.concat("T00:00:00");
        let end = sendDate.concat("T23:59:00");
        this.props.fetchGraphData({startTime: start, endTime: end});
        this.props.fetchCurrentTemperature();
        this.props.fetchMaxTemperature();
        this.props.fetchMinTemperature();
    }

    componentDidMount(){
        this.interval = setInterval(() => this.liveRefresh(), 1000);
    }
    componentWillUnmount() {
        clearInterval( this.interval);
    }

    liveRefresh(){
        if(isToday(new Date(this.state.date))){
            let sendDate = new Date().toISOString();
            sendDate = sendDate.substr(0, 10);
            let start = sendDate.concat("T00:00:00");
            let end = sendDate.concat("T23:59:00");
            this.props.fetchGraphData({startTime: start, endTime: end});
            this.props.fetchCurrentTemperature();
            this.props.fetchMaxTemperature();
            this.props.fetchMinTemperature();
        }
    }


    render() {
        if(this.props.temperatureGraphStats.length == 0){
            return (
                <div>
                    <HeaderComponent/>
                    <NoData>
                        <h1>No water data for selected date</h1>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChange}
                        />
                    </NoData>
                </div>

            );
        } else {
            this.props.temperatureGraphStats.forEach(x => {x.timestamp = cropOnlyTime(x.timestamp)});
            return (
                <div>
                    <HeaderComponent/>
                    <Graph data={this.props.temperatureGraphStats} title={"Temperature"}/>
                    <DateConatiner>
                        Select date: <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChange}
                    />
                    </DateConatiner>
                    <CurrentStats>
                        <p><span style={{paddingRight: "100px"}}>Current temperature: <span style={{color: "#ff0000"}}>{this.props.current} °C</span></span><span
                            style={{paddingRight: "100px"}}>Maximum temperature today: <span style={{color: "#ff0000"}}>{this.props.max} °C</span></span>Minimum temperature today: <span style={{color: "#ff0000"}}>{this.props.min} °C</span></p>
                    </CurrentStats>
                </div>
            );
        }
    }
}


function mapStateToProps(state: RootState) {
    return {
        temperatureGraphStats: state.temperature.graphData,
        current: state.temperature.currentTemp,
        max: state.temperature.maxToday,
        min: state.temperature.minToday,
    }
};
function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchGraphData: bindActionCreators(fetchTemperatureGraphData, dispatch),
        fetchCurrentTemperature: bindActionCreators(fetchCurrentTemperature, dispatch),
        fetchMaxTemperature: bindActionCreators(fetchMaxTemperature, dispatch),
        fetchMinTemperature: bindActionCreators(fetchMinTemperature, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Temperature);