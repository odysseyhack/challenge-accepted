import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state:any) {
    return {

    };
}

class AcceptContract extends Component<any, any> {
    render() {
        return (
            <div>
            AcceptContract
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(AcceptContract);