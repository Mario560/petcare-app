import * as React from 'react';
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";
import Demo from "../components/Graph/Graph";

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
                <Demo />
            </div>
        );
    }
}