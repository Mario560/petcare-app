// import * as React from 'react';
// import DatePicker from "react-datepicker";
// import styled from "styled-components";
// import HeaderComponent from "../components/Navbar/HeaderComponent";
// import Demo from "../components/Graph/Graph";
// import {Button} from "reactstrap";
//
// import "react-datepicker/dist/react-datepicker.css";
// import {connect} from "react-redux";
// import {bindActionCreators, Dispatch} from "redux";
// import {fetchFoodGraphData} from "../actions/foodActions";
// import {RootState} from "../index";
// import {Reading} from "../types/Reading";
//
// const CurrentStats = styled.div`
//   padding-top: 30px;
//   font-size: 20px;
//   color: black;
//   text-align: center;
// `;
//
// const RefillButtonContainer = styled.div`
//   padding-top: 30px;
//   text-align: center;
// `;
//
// interface State {
//     startDate: any;
// }
//
// type DispatchProps =  ReturnType<typeof mapDispatchToProps>;
// type StateProps = ReturnType<typeof mapStateToProps>;
// type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & State;
//
// class Live extends React.Component<Props, State> {
//
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             startDate: new Date(),
//         };
//         this.handleChange = this.handleChange.bind(this);
//     }
//
//     handleChange(date: any) {
//         console.log("date ", date);
//         this.setState({
//             startDate: date
//         });
//     }
//
//     render() {
//         return (
//             <div>
//                 <HeaderComponent/>
//                 <Demo />
//                 <DatePicker
//                     selected={this.state.startDate}
//                     onChange={this.handleChange}
//                 />
//                 <CurrentStats>
//                     <p><span style={{paddingRight: "100px"}}>Current food left: 30g</span><span
//                         style={{paddingRight: "100px"}}>Ate today: 72g</span>Last time ate: 15:37</p>
//                 </CurrentStats>
//
//                 <RefillButtonContainer>
//                     <Button outline color="primary" onClick={() => console.log("refill food")}
//                             style={{textAlign: "center"}}>Refill food</Button>
//                 </RefillButtonContainer>
//
//             </div>
//         );
//     }
// }
//
// function mapStateToProps(state: RootState) {
//     return {
//         foodGraphStats: state.food.graphData,
//     }
// };
// function mapDispatchToProps(dispatch: Dispatch) {
//     return {
//         fetchGraphData: bindActionCreators(fetchFoodGraphData, dispatch),
//     };
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Live);

import * as React from 'react';
import {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";
import Demo from "../components/Graph/Graph";
import {Button} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {fetchFoodGraphData} from "../actions/foodActions";
import {RootState} from "../index";
import {Reading} from "../types/Reading";

const CurrentStats = styled.div`
  padding-top: 30px;
  font-size: 20px;
  color: black;
  text-align: center;
`;

const RefillButtonContainer = styled.div`
  padding-top: 30px;
  text-align: center;
`;

interface State {
    startDate: any;
    foodGraphStats: Reading[];
}

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;



const Live = (props: StateProps & DispatchProps) => {

    // new Date() -> initial value
    const [startDate, setStartDate] = useState(new Date());
    // FIXME još ne koristiš??
    const [foodGraphStats, setFoodGraphStats] = useState([]);

    const handleChange = (date: any) => {
        console.log("date ", date);
        setStartDate(date)
    };

    return (
        <div>
            <HeaderComponent/>
            <Demo />
            <DatePicker
                selected={startDate}
                onChange={handleChange}
            />
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
};

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
