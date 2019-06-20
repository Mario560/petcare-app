import React from "react";
import Sidebar from "react-sidebar";
import {MdMenu, MdLiveTv, MdHistory, MdInsertChart} from 'react-icons/md';
import {Button, Label} from "reactstrap";
import {Link} from "react-router-dom";
import styled from "styled-components";

interface SideMenuState {
    sidebarOpen: boolean
}

const ButtonStyle = styled.div`
  border: 0px;
  color: #99a4ad;
  padding: 10px 24px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
  font-weight: bold;
  &:hover {
    background-color: rgba(105,108,100,0.69);
    color:red;
  }
  & > svg {
    color: white;
    font-size: 1.3rem;
    vertical-align: bottom !important;
  }
`;

const LinkTo = styled(Link)`
   &:hover {
    text-decoration: none;
    font-weight: bold;
  }
`

class SideMenu extends React.Component<{},SideMenuState> {
    constructor(props: any) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open: any) {
        this.setState({ sidebarOpen: open });
    }

    render() {
        return (
            <Sidebar
                sidebar={
                    <div>
                    <LinkTo to={"/live"} onClick={() => this.onSetSidebarOpen(false)}>
                        <ButtonStyle>
                            <MdLiveTv /> Live
                        </ButtonStyle>
                     </LinkTo>

                    <LinkTo to={"/history"} onClick={() => this.onSetSidebarOpen(false)}>
                        <ButtonStyle>
                            <MdHistory /> History
                        </ButtonStyle>
                    </LinkTo>

                    <LinkTo to={"/stats"} onClick={() => this.onSetSidebarOpen(false)}>
                        <ButtonStyle>
                            <MdInsertChart /> Stats
                        </ButtonStyle>
                    </LinkTo>
                    </div>

                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "rgb(7, 71, 166)" }, root: { right: "80%" }}}
            >
                <Button color="primary" onClick={() => this.onSetSidebarOpen(true)}>
                    <MdMenu />
                </Button>


            </Sidebar>
        );
    }
}

export default SideMenu;