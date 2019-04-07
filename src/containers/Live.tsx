import * as React from 'react';
import SideMenu from "../components/SideMenu/SideMenu";
import {Button} from "reactstrap";
import styled from "styled-components";
import HeaderComponent from "../components/Navbar/HeaderComponent";

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
            </div>
        );
    }
}