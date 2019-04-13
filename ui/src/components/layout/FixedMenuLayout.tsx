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
                    <Image size='tiny' src={logo} style={{ marginRight: '1.5em' }} />
                    Challenge Accepted
                    </Menu.Item>
                    <Link to="/"><Menu.Item className="inverted">Home</Menu.Item></Link>

                    <Dropdown item simple text='Actions'>
                    <Dropdown.Menu>
                    <Dropdown.Item><Link to="/create">Create contract</Link></Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Submenu</span>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Container>
                </Menu>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(FixedMenuLayout);