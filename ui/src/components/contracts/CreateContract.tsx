import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContractForm from '../forms/ContractForm';

function mapStateToProps(state:any) {
    return {

    };
}

class CreateContract extends Component<any, any> {
    render() {
        return (
            <div>
                <ContractForm />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(CreateContract);