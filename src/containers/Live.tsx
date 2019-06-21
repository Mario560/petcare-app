
import * as React from 'react';
import DatePicker from "react-datepicker";
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";
import Food from "../components/Graph/Graph";
import {Button} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {fetchFoodGraphData} from "../actions/foodActions";
import {RootState} from "../index";

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
    date: any;
}

// type DispatchProps =  ReturnType<typeof mapDispatchToProps>;
// type StateProps = ReturnType<typeof mapStateToProps>;
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & State;

class Live extends React.Component<Props, State> {
    private interval: number = 0;

    constructor(props: Props) {
        super(props);
        this.state = {
            date: new Date()
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
    }

    componentDidMount(){
        this.interval = setInterval(() => this.liveRefresh(), 1000);
    }
    componentWillUnmount() {
        clearInterval( this.interval);
    }

    liveRefresh(){
        let sendDate = new Date().toISOString();
        sendDate = sendDate.substr(0, 10);
        let start = sendDate.concat("T00:00:00");
        let end = sendDate.concat("T23:59:00");
        this.props.fetchGraphData({startTime: start, endTime: end});
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
            return (
                <div>
                    <HeaderComponent/>
                    <Food data={this.props.foodGraphStats}/>
                    <DateConatiner>
                        Select date: <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChange}
                        />
                    </DateConatiner>
                    <CurrentStats>
                        <p><span style={{paddingRight: "100px"}}>Current food left: 30g</span><span
                            style={{paddingRight: "100px"}}>Ate today: 72g</span>Last time ate: 15:37</p>
                    </CurrentStats>

                    <RefillButtonContainer>
                        <Button outline color="primary" onClick={() => console.log("refill food")}
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
    }
};
function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchGraphData: bindActionCreators(fetchFoodGraphData, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Live);