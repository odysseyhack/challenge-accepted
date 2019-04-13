import React, { Component } from 'react';
import { Header, Table, Rating } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { any } from 'prop-types';
import Contract from 'web3/eth/contract';
import { AppState } from '../../store';
import { getUserById } from '../../ApiClient';

interface Props {
    contract: Contract,
    getUser: () => void;
}

class ContractLine extends Component<any, any> {

    getUser = (userId: number) => {
        getUserById(userId).then((data) => {
            this.setState({user: data})
        });
    }
    constructor(props: any) {
        super(props);
        this.getUser(this.props.deployedByUserId);
    }
    render() {
        return (
            <Table.Row>
                <Table.Cell>
                {new Intl.DateTimeFormat('en-GB', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: '2-digit' 
                }).format(Date.parse(this.props.timestamp))}
                </Table.Cell>
                <Table.Cell singleLine>{
                    this.state && this.state.user ?
                        <span>{this.state.user.firstName}</span> : null
                }</Table.Cell>
                <Table.Cell>
                    <Rating icon='star' defaultRating={3} maxRating={3} />
                </Table.Cell>
                <Table.Cell textAlign='right'>
                    80% <br />
                    <a href='#'>18 studies</a>
                </Table.Cell>
                <Table.Cell>
                    Creatine supplementation is the reference compound for increasing muscular creatine
                    levels; there is variability in this increase, however, with some nonresponders.
                    </Table.Cell>
            </Table.Row>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        
    }
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {

    }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractLine);