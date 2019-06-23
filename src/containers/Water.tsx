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
import {
    fetchCurrentWaterWeight,
    fetchDrankToday,
    fetchLastTimeDrank,
    fetchWaterGraphData
} from "../actions/waterActions";
import isToday from "../utils/isToday";

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

class Water extends React.Component<Props, State> {
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
        this.props.fetchCurrentWeight();
        this.props.fetchDrankToday();
        this.props.fetchLastTimeDrank();
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
            this.props.fetchCurrentWeight();
            this.props.fetchDrankToday();
            this.props.fetchLastTimeDrank();
        }
    }


    render() {
        if(this.props.waterGraphStats.length == 0){
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
            this.props.waterGraphStats.forEach(x => {x.timestamp = cropOnlyTime(x.timestamp)});
            return (
                <div>
                    <HeaderComponent/>
                    <Graph data={this.props.waterGraphStats} title={"Water"}/>
                    <DateConatiner>
                        Select date: <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChange}
                    />
                    </DateConatiner>
                    <CurrentStats>
                        <p><span style={{paddingRight: "100px"}}>Current water left: <span style={{color: "#ff0000"}}>{this.props.currentWeight} ml</span></span><span
                            style={{paddingRight: "100px"}}>Drank today: <span style={{color: "#ff0000"}}>{this.props.drankToday} ml</span></span>Last time drank: <span style={{color: "#ff0000"}}>{cropOnlyTime(this.props.lastTimeDrankToday)}</span></p>
                    </CurrentStats>
                </div>
            );
        }
    }
}



function mapStateToProps(state: RootState) {
    return {
        waterGraphStats: state.water.graphData,
        currentWeight: state.water.currentWeight,
        drankToday: state.water.drankToday,
        lastTimeDrankToday: state.water.lastTimeDrank,
    }
};
function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchGraphData: bindActionCreators(fetchWaterGraphData, dispatch),
        fetchCurrentWeight: bindActionCreators(fetchCurrentWaterWeight, dispatch),
        fetchLastTimeDrank: bindActionCreators(fetchLastTimeDrank, dispatch),
        fetchDrankToday: bindActionCreators(fetchDrankToday, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Water);