import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
  } from 'semantic-ui-react'
  import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

function mapStateToProps(state:any) {
    return {

    };
}

class FixedMenuLayout extends Component<any, any> {
    render() {
        return (
            <div>
                <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                    
                    Challenge Accepted
                    </Menu.Item>
                    <Link to="/"><Menu.Item className="inverted">Home</Menu.Item></Link>
                    <Link to="/create"><Menu.Item className="inverted">Create contract</Menu.Item></Link>
                </Container>
                </Menu>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(FixedMenuLayout);