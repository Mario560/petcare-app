import * as React from 'react';
import CanvasJS from 'canvasjs';
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";
import Graph from "../components/Graph/Graph";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: blue;
`;


export default class Live extends React.Component {
    render() {
        return (
            <div>
                <HeaderComponent/>
                <Graph />
            </div>
        );
    }
}