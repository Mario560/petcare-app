import * as React from 'react';
import {Button, Container, Navbar} from "reactstrap";
import SideMenu from "../SideMenu/SideMenu";
import styled from "styled-components";
import {Link} from "react-router-dom";



const Header = styled.div`
  display: inline-block;
  width: 100%;
  height: 50px;
  background-color: rgb(21,127,247);
  padding: 10px;
  text-align: left;
`;

const Title = styled.h3`
  font-family: "Bauhaus 93";
  color:white;
  text-align: center;
`

export default class HeaderComponent extends React.Component {
    render() {
        return (
            <Header>
                <SideMenu />
                <Title>PETCARE</Title>
            </Header>
        );
    }
}