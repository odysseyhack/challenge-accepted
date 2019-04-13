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

function mapStateToProps(state: any) {
    return {

    };
}

class Home extends Component<any, any> {
    render() {
        return (
            <div>                
                <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>Semantic UI React Fixed Template</Header>
                <p>This is a basic fixed menu template using fixed size containers.</p>
                <p>
                    A text container is used for the main container, which is useful for single column layouts.
                </p>

                <Image src='/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />
                <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
                <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
                <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
                <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
                <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
                <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
                </Container>                
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home);