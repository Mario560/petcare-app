import * as React from 'react';
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";
import Demo from "../components/Graph/Graph";
import {Button} from "reactstrap";

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

export default class Live extends React.Component {
    render() {
        return (
            <div>
                <HeaderComponent/>
                <Demo />
                <CurrentStats>
                    <p><span style={{paddingRight:"100px"}}>Current food left: 30g</span><span style={{paddingRight:"100px"}}>Ate today: 72g</span>Last time ate: 15:37</p>
                </CurrentStats>

                <RefillButtonContainer>
                    <Button outline color="primary" onClick={() => console.log("refill food")} style={{textAlign:"center"}}>Refill food</Button>
                </RefillButtonContainer>

            </div>
        );
    }
}