
import * as React from 'react';
import DatePicker from "react-datepicker";
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";
import Graph from "../components/Graph/Graph";
import {Button} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {
    fetchAteToday,
    fetchCurrentFoodWeight,
    fetchFoodGraphData,
    fetchLastTimeAte,
    refillFood
} from "../actions/foodActions";
import {RootState} from "../index";
import cropOnlyTime from "../utils/cropOnlyTime";

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
  color: #157ff7;
  text-align: center;
`;

const RefillButtonContainer = styled.div`
  padding-top: 30px;
  text-align: center;
`;

interface State {
    date: Date;
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & State;

class Food extends React.Component<Props, State> {
    private interval: number = 0;
    private refillDisabled: boolean = false;

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
        this.props.fetchAteToday();
        this.props.fetchLastTimeAte();
    }

    componentDidMount(){
        this.interval = setInterval(() => this.liveRefresh(), 1000);
    }
    componentWillUnmount() {
        clearInterval( this.interval);
    }

    liveRefresh(){
        if(new Date(this.state.date).getDate() == new Date().getDate()){
            let sendDate = new Date().toISOString();
            sendDate = sendDate.substr(0, 10);
            let start = sendDate.concat("T00:00:00");
            let end = sendDate.concat("T23:59:00");
            this.props.fetchGraphData({startTime: start, endTime: end});
            this.props.fetchCurrentWeight();
            this.props.fetchAteToday();
            this.props.fetchLastTimeAte();
        }
    }

    render() {
        if(this.props.foodGraphStats.length == 0){
            return (
                <div>
                    <HeaderComponent/>
                    <NoData>
                        <h1>No food data for selected date</h1>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChange}
                        />
                    </NoData>
                </div>

            );
        } else {
            this.props.foodGraphStats.forEach(x => {x.timestamp = cropOnlyTime(x.timestamp)});
            return (
                <div>
                    <HeaderComponent/>
                    <Graph data={this.props.foodGraphStats}/>
                    <DateConatiner>
                        Select date: <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChange}
                        />
                    </DateConatiner>
                    <CurrentStats>
                        <p><span style={{paddingRight: "100px"}}>Current food left: <span style={{color: "#ff0000"}}>{this.props.currentWeight}g</span></span><span
                            style={{paddingRight: "100px"}}>Ate today: <span style={{color: "#ff0000"}}>{this.props.ateToday}g</span></span>Last time ate: <span style={{color: "#ff0000"}}>{cropOnlyTime(this.props.lastTimeAteToday)}</span></p>
                    </CurrentStats>

                    <RefillButtonContainer>
                        <Button outline color="primary" disabled={this.refillDisabled} onClick={(e) => {

                            e.preventDefault();
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            console.log("refill food btn");
                            this.props.refillFood();
                          this.refillDisabled = true;
                            setTimeout(() => this.refillDisabled = false, 10000);

                        }}
                                style={{textAlign: "center"}}>Refill food</Button>
                    </RefillButtonContainer>

                </div>
            );
        }
    }
}

function mapStateToProps(state: RootState) {
    return {
        foodGraphStats: state.food.graphData,
        currentWeight: state.food.currentWeight,
        ateToday: state.food.ateToday,
        lastTimeAteToday: state.food.lastTimeAte,
    }
};
function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchGraphData: bindActionCreators(fetchFoodGraphData, dispatch),
        fetchCurrentWeight: bindActionCreators(fetchCurrentFoodWeight, dispatch),
        fetchLastTimeAte: bindActionCreators(fetchLastTimeAte, dispatch),
        fetchAteToday: bindActionCreators(fetchAteToday, dispatch),
        refillFood: bindActionCreators(refillFood, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Food);