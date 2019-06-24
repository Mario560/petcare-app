import styled from "styled-components";
import * as React from "react";
import {Link} from "react-router-dom";

const Title = styled.h3`
  font-family: "Bauhaus 93";
  color:white;
  text-align: center;
  margin-top:10px;
`;

const FooterStyle = styled.div`
  background-color: #000000;
  color: #FFF;
  text-align: center;
  width: 100%;
  height: 350px;
`;

const WhiteLine = styled.div`
  margin-top: 20px;
  background-color: #FFF;
  width:100%;
  height: 1px;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

export default class Footer extends React.Component {
    render() {
        return (
            <FooterStyle>
                <FooterContent>
                    <div style={{paddingRight:"22%"}}>
                        <Title>Reach us</Title>
                        <Link to={"#"}>Vrbik 8</Link><br/>
                        <Link to={"#"}>Zagreb, 10000</Link><br/>
                        <Link to={"#"}>Croatia</Link><br/>
                        <Link to={"#"}>mlukec@tvz.hr</Link>
                    </div>

                    <div style={{paddingRight:"20%"}}>
                        <Title>Legal</Title>
                        <Link to={"#"}>Terms & conditions</Link><br/>
                        <Link to={"#"}>Privacy policy</Link><br/>
                        <Link to={"#"}>Cookies policy</Link>
                    </div>

                    <div>
                        <Title>Social media</Title>
                        <Link to={"#"}>Instagram</Link><br/>
                        <Link to={"#"}>Facebook</Link><br/>
                        <Link to={"#"}>Twitter</Link><br/>
                        <Link to={"#"}>YouTube</Link>
                    </div>
                </FooterContent>
                <WhiteLine/>
                <Title><Link to={"/"} style={{textDecoration:"none", color:"white"}}>PETCARE</Link></Title>
                <p style={{color:"white"}}>mlukec@tvz.hr</p>
            </FooterStyle>
        );
    }
}