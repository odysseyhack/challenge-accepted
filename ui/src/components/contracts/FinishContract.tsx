import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state:any) {
    return {

    };
}

class FinishContract extends Component<any, any> {
    render() {
        return (
            <div>
            FinishContract
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(FinishContract);