
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

const RefillButtonContainer = styled.div`
  padding-top: 30px;
  text-align: center;
`;

interface State {
    date: Date;
}

const isMobile = window.innerWidth <= 500;

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
        let end = sendDate.concat("T23:59:59");
        this.fetchAteThatDay(date);
        setTimeout(() => this.props.fetchGraphData({startTime: start, endTime: end}), 300);

        this.setState({
            date: date
        });

    }

    fetchAteThatDay(date: any){
        let sendDate = new Date(date).toISOString();
        sendDate = sendDate.substr(0, 10);
        let start = sendDate.concat("T00:00:00");
        let end = sendDate.concat("T23:59:59");

        this.props.fetchAteToday({startTime: start, endTime: end});

    }
    componentWillMount(){
        let sendDate = new Date().toISOString();
        sendDate = sendDate.substr(0, 10);
        let start = sendDate.concat("T00:00:00");
        let end = sendDate.concat("T23:59:59");
        this.props.fetchGraphData({startTime: start, endTime: end});
        this.props.fetchCurrentWeight();
        this.fetchAteThatDay(this.state.date);
        this.props.fetchLastTimeAte();
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
            let end = sendDate.concat("T23:59:59");
            this.props.fetchGraphData({startTime: start, endTime: end});
            this.props.fetchCurrentWeight();
            this.fetchAteThatDay(this.state.date);
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
                    {isToday(new Date(this.state.date)) ? <RefillButtonContainer>
                        <Button outline color="primary"  disabled={this.refillDisabled} onClick={(e) => {

                            e.preventDefault();
                            this.props.refillFood();
                            this.refillDisabled = true;
                            setTimeout(() => this.refillDisabled = false, 10000);

                        }}
                                style={{textAlign: "center"}}>Refill food</Button>
                    </RefillButtonContainer> : null }
                </div>

            );
        } else {
            this.props.foodGraphStats.forEach(x => {x.timestamp = cropOnlyTime(x.timestamp)});
            return (
                <div>
                    <HeaderComponent/>
                    <Graph data={this.props.foodGraphStats} title={"Food"}/>
                    <DateConatiner>
                        Select date: <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChange}
                        />
                    </DateConatiner>
                    {isToday(new Date(this.state.date)) ?
                        <CurrentStats>
                            <p><span style={{paddingRight: "100px"}}>Current food left: <span
                                style={{color: "#ff0000"}}>{this.props.currentWeight} g{isMobile ? <br/> : null}</span></span><span
                                style={{paddingRight: "100px"}}>Ate today: <span
                                style={{color: "#ff0000"}}>{this.props.ateToday} g{isMobile ?
                                <br/> : null}</span></span>Last time ate: <span
                                style={{color: "#ff0000"}}>{cropOnlyTime(this.props.lastTimeAteToday)}</span></p>
                        </CurrentStats> :
                        <CurrentStats>
                            <p>Ate that day: <span
                                style={{color: "#ff0000"}}>{this.props.ateToday} g{isMobile ?
                                <br/> : null}</span></p>
                        </CurrentStats>
                    }

                    {isToday(new Date(this.state.date)) ? <RefillButtonContainer>
                        <Button outline color="primary"  disabled={this.refillDisabled} onClick={(e) => {

                            e.preventDefault();
                            this.props.refillFood();
                            this.refillDisabled = true;
                            setTimeout(() => this.refillDisabled = false, 10000);

                        }}
                                style={{textAlign: "center"}}>Refill food</Button>
                    </RefillButtonContainer> : null }

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