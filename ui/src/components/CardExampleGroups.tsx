import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { CurrentUser } from '../types/User';

const CardExampleGroups = (data: CurrentUser) => (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
        <Card.Header>{data.currentUser.firstName}</Card.Header>
        <Card.Meta>{data.currentUser.emailAddress}</Card.Meta>
        <Card.Description>
          <strong>{data.currentUser.externalID}</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>    
  </Card.Group>
)

export default CardExampleGroups;