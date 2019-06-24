import * as React from 'react';
import Background from '../utils/images/doggo.jpg';
import WaterDrop from '../utils/images/water.png';
import FoodIcon from '../utils/images/food.png';
import TemperatureIcon from '../utils/images/temperature.png';
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";
import {Button} from "reactstrap";
import history from "../history";
import Footer from "../components/Footer/Footer";

const isMobile = window.innerWidth <= 500;

const BackgroundImage = styled.div`
  background-image: url(${Background}) ;
  background-size: auto;
  color: black;
  width: 100%;
  height: 1500px; 
  clip-path: polygon(0 0, 100% 0, 100% 82%, 0% 100%);
`;

const Title = styled.div`
  padding-top: 30px;
  color: rgba(128,127,133,0.99);
  text-align: center;
  width: 100%;
  
`;

const About = styled.p`
  padding-top: 300px;
  font-size: 20px;
  color: rgba(128,127,133,0.99);
  text-align: justify;
  width: 30%;
  padding-left: 5%;
`;

const Controls = styled.div`
  background-color: #f7b71d;
  color: rgba(128,127,133,0.99);
  text-align: center;
  width: 100%;
  height: 450px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 72%);
  display: flex;
  justify-content: center;
`;

const waterButtonCss = {
    backgroundImage:`url(${WaterDrop})`,
    backgroundSize:"40% 40%",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    border:"5px solid white",
    borderRadius:"20%",
    width: isMobile ? "100px" : "200px",
    height: isMobile ? "100px" : "200px",
    marginLeft:"30px",
    marginRight:"30px",
};

const foodButtonCss = {
    backgroundImage:`url(${FoodIcon})`,
    backgroundSize:"50% 50%",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    border:"5px solid white",
    borderRadius:"20%",
    width: isMobile ? "100px" : "200px",
    height: isMobile ? "100px" : "200px",
    marginLeft:"30px",
    marginRight:"30px"
};


const temperatureButtonCss = {
    backgroundImage:`url(${TemperatureIcon})`,
    backgroundSize:"40% 40%",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    border:"5px solid white",
    borderRadius:"20%",
    width: isMobile ? "100px" : "200px",
    height: isMobile ? "100px" : "200px",
    marginLeft:"30px",
    marginRight:"30px"
};

export default class Home extends React.Component {

    private myRef: React.RefObject<any>;

    constructor(props: any) {
        super(props)
        this.myRef = React.createRef()   // Create a ref object
    }

    scrollToMyRef = () => window.scroll({top: this.myRef.current.offsetTop, left: 0, behavior: 'smooth'});

    render() {
        return (
            <div style={{backgroundColor:"#000000"}}>
                <div style={{backgroundColor:"#f7b71d"}}>
                    <BackgroundImage>
                        <HeaderComponent/>
                        <Title>
                            <h2>Welcome to Petcare, app to keep track of your pet</h2>
                        </Title>
                            <About style={{width: isMobile ? "95%" : "30%", paddingTop: isMobile ? "10px" : "300px"}}>
                                <strong style={{color: "#157FF7"}}>What can I do with Petcare
                                    platform?</strong><br/><br/>
                                Our platform allows you to monitor, store and analyze data regarding food and water
                                consumptions by your four-legged friends. Platform also enables you to add more food
                                remotely, meaning that wherever in this world you are, if you have internet acces, you
                                can feed your pet that is waiting for you at home.
                                <br/><br/>
                                <Button outline color="primary"
                                        style={{marginLeft: isMobile ? "0%" : "28%", textAlign: "center", width: isMobile ? "100%" : "200px"}}
                                        onClick={() => this.scrollToMyRef()}>Check it out!</Button>
                            </About>
                    </BackgroundImage>
                </div>
                <div ref={this.myRef}>
                    <Controls>
                        <Button outline color="primary" style={foodButtonCss}
                                onClick={() => history.push("/food")} />
                        <Button outline color="primary" style={waterButtonCss}
                                onClick={() => history.push("/water")} />
                        <Button outline color="primary" style={temperatureButtonCss}
                                onClick={() => history.push("/temperature")} />
                    </Controls>
                </div>
            <Footer/>
            </div>
        );
    }
}