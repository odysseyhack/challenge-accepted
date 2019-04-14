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
import Contracts from '../contracts';

function mapStateToProps(state: any) {
    return {
        users: state.users,
        contracts: state.contracts
    };
}

class Home extends Component<any, any> {
    render() {
        return (
            <div>                
                <Container text style={{ marginTop: '3em' }}>
                    <Contracts {...this.props.contracts.contracts} />
                </Container>                
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home);