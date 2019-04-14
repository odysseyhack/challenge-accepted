import React, { Component } from 'react';
import { Header, Table, Rating, Form, Select, Modal, Button, TextArea, Input } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { any } from 'prop-types';
import Contract from 'web3/eth/contract';
import { AppState } from '../../store';
import { getUserById, getActions, getUsers, postAction } from '../../ApiClient';
import { getAllUsers } from '../../store/users/actions';

interface Props {
    contract: Contract,
    getUser: () => void;
}

const StateType = ["Active", "Committed", "WorkFinished", "Cancelled", "Approved", "Rejected", "Completed"]

class ContractLine extends Component<any, any> {

    show = () => { this.setState({ size: 'mini', open: true }) };
    close = () => this.setState({ open: false })
    clickAction = (e, a) => {
        console.log('CLICKED', e, a.value);
        if (a && a.value && a.options) {
            for (let option of a.options) {
                if (option.value === a.value) {
                    this.setState({ option: option })
                    this.show();
                }
            }
        }
    }
    doAction = (e, a) => {
        console.log('Doing action', this.state.option);

        switch (this.state.option.value) {
            case 'CommitToWork':
            case 'FinishWork':
            case 'Cancel': {
                postAction(this.props.id, this.state.option.key, [])
                break;
            }
            default: {

            }
        }
        console.log('closing');
        this.close();
    }

    getUser = (userId: number) => {
        getUserById(userId).then((data) => {
            this.setState({ user: data })
        });
    }
    getAllUsers = () => {
        getUsers().then((data) => {
            console.info('GOT USERS', data)
            let items = [] as Array<any>;
            items.push(
                { key: '', text: '', value: '' }
            )
            for (let item of data.users) {
                items.push(
                    { key: item.userId, text: item.firstName, value: item.userId }
                )
            }
            this.setState({ userList: items })
        });
    }
    getActions = () => {
        getActions(this.props.id).then((actions) => {
            if (actions) {
                console.log('ACTIONS', actions);
                let items = [] as Array<any>;
                items.push(
                    { key: '', text: '', value: '' }
                )
                for (let item of actions.workflowFunctions) {
                    items.push(
                        { key: item.id, text: item.displayName, value: item.name, params: item.parameters }
                    )
                }
                this.setState({ actions: items })
            }
        });
    }
    constructor(props: any) {
        super(props);
        this.state = { open: false }
        this.getAllUsers();
        this.getUser(this.props.deployedByUserId);
        this.getActions();
    }
    render() {

        return (
            <React.Fragment>
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
                        {this.props.contractProperties[0].value}
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        {this.props.contractProperties[4].value}
                    </Table.Cell>
                    <Table.Cell>
                        {this.props.contractProperties[5].value}
                    </Table.Cell>
                    <Table.Cell>
                        {StateType[this.props.contractProperties[7].value]}
                    </Table.Cell>
                    <Table.Cell>
                        {
                            this.state && this.state.actions ?
                                <Form.Field
                                    control={Select}
                                    options={this.state.actions}
                                    placeholder='Choose'
                                    onChange={this.clickAction}
                                /> : null
                        }
                    </Table.Cell>
                </Table.Row>
                <Modal size="mini" open={this.state.open} onClose={this.close} dimmer="blurring">
                    <Modal.Header>{this.state && this.state.option ? this.state.option.text : null}</Modal.Header>
                    <Modal.Content>
                        {
                            this.state && this.state.option ?
                                <React.Fragment>
                                    <Form>
                                        {
                                            this.state.option.params.map((param: any, i: number) => {
                                                if (param.type.name === 'user') {
                                                    return (
                                                        <Form.Field key={`user-${i}`}
                                                            control={Select}
                                                            options={this.state.userList}
                                                            placeholder='Choose'
                                                        />
                                                    )
                                                } else {
                                                    return (
                                                        <Form.Field key={`${param.type.name}-${i}`}>
                                                            <label>{param.type.name} {param.displayName}</label>
                                                            <input placeholder={''} key={`input-${i}`} />
                                                        </Form.Field>
                                                    )
                                                }
                                            })
                                        }
                                    </Form>
                                </React.Fragment> : null
                        }
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>No</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.doAction} />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        users: state.users,
        contracts: state.contracts
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