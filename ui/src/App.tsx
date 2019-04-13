import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import CardExampleGroups from './components/CardExampleGroups';
import { usersMe, getUsers } from './ApiClient';
import { CurrentUser } from './types/User';
import { getAllUsers, getMe } from './store/users/actions'
import { connect } from "react-redux";
import { AppState } from "./store";
import Contracts from './components/contracts'
import { getAllContracts } from './store/contracts/actions';


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

    // usersMe().then((data: CurrentUser) => {
    //   console.log('API:ME', data);
    //   console.log(`You are ${data.currentUser.firstName} - ${data.currentUser.emailAddress}`)

    //   this.setState({user: data});
    // });

    // getUsers().then((data) => {
    //   console.log('API:USERS', data);
    // });

    //this.props.getUsersMe();
    //this.props.getAllUsers();
    this.props.getAllContracts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
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
          </div>
        </header>
      </div>
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
