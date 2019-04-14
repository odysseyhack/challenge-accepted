import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
import CardExampleGroups from './components/CardExampleGroups';
import { usersMe, getUsers } from './ApiClient';
import { CurrentUser } from './types/User';
import { getAllUsers, getMe } from './store/users/actions'
import { connect } from "react-redux";
import { AppState } from "./store";
import Contracts from './components/contracts'
import { getAllContracts } from './store/contracts/actions';
import './App.scss';
import logo from './logo.svg';
import Home from './components/home'
import CreateContract from './components/contracts/CreateContract';
import AcceptContract from './components/contracts/AcceptContract';
import FinishContract from './components/contracts/FinishContract';
import InspectContract from './components/contracts/InspectContract';
import FixedMenuLayout from './components/layout/FixedMenuLayout';

// Resource Group:
// Ethereum_PoA_Consortium

// VM User:
// parityadmin
// qsu9O6K7XcH%G4M6Nk2$

// Consortium Member Id:
// 101

// Network ID:
// 10000001

// Admin Ethereum Address:
// 0x83F201D0198a218f95843C0710A947Ee0889B2E6

// METAMASK Admin:
// Telefax1
// source attend enjoy carpet owner opera paper sing wait exercise crunch path

// Remix Endpoint:
// http://ethf763on-dns-reg1.westeurope.cloudapp.azure.com:8540

interface Props {
  users: any,
  contracts: any,
  getUsersMe: () => void;
  getAllUsers: () => void;
  getAllContracts: () => void;
}
interface State {

}
class App extends Component<Props, State> {

  constructor(props: any) {
    super(props);

    //this.props.getUsersMe();
    this.props.getAllUsers();
    this.props.getAllContracts();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
          <FixedMenuLayout />
            {/* <img src={logo} className="App-logo" alt="logo" /> 
            <p>
              Challenge Accepted , bitch!
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              enter BlockChain
          </a>
            {
              this.props && this.props.users && this.props.users.currentUser ?
                <CardExampleGroups {...this.props.users.currentUser} /> : null
            }

            {
              this.props && this.props.contracts && this.props.contracts.contracts ?
                <Contracts {...this.props.contracts.contracts} /> : null
            }
            <div className="ui button">View</div>
            <div className="ui primary button">
              <i className="shop icon"></i>Add to Cart
          </div>*/}
          </header>

          <Route exact path="/" component={Home} />
          <Route path="/create" component={CreateContract} />
          <Route path="/accept" component={AcceptContract} />
          <Route path="/finish" component={FinishContract} />
          <Route path="/inspect" component={InspectContract} />
        </div>
        <footer>
            <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
                <Container textAlign='center'>
                    <Grid divided inverted stackable>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Group 1' />
                        <List link inverted>
                        <List.Item as='a'>Link One</List.Item>
                        <List.Item as='a'>Link Two</List.Item>
                        <List.Item as='a'>Link Three</List.Item>
                        <List.Item as='a'>Link Four</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Group 2' />
                        <List link inverted>
                        <List.Item as='a'>Link One</List.Item>
                        <List.Item as='a'>Link Two</List.Item>
                        <List.Item as='a'>Link Three</List.Item>
                        <List.Item as='a'>Link Four</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Group 3' />
                        <List link inverted>
                        <List.Item as='a'>Link One</List.Item>
                        <List.Item as='a'>Link Two</List.Item>
                        <List.Item as='a'>Link Three</List.Item>
                        <List.Item as='a'>Link Four</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>                      
                        <p>
                                               
                        </p>
                    </Grid.Column>
                    </Grid>

                    <Divider inverted section />
                    <p style={{textAlign: 'center'}}>Challenge Accepted</p>
                    <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='#'>
                        Site Map
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Contact Us
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Terms and Conditions
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Privacy Policy
                    </List.Item>
                    </List>
                </Container>
                </Segment>
        </footer>
      </Router>
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
    getUsersMe: () => dispatch(getMe()),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllContracts: () => dispatch(getAllContracts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
