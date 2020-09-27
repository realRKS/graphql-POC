import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PushNotification extends Component {
  state = { firstName: '' , lastName: ''}
 
  render() {
    return (
      <div>
        <input
          value={this.state.firstName}
          onChange={e => this.setState({ firstName: e.target.value })}
          type="text"
          placeholder="First Name"
        />
        <input
          value={this.state.lastName}
          onChange={e => this.setState({ lastName: e.target.value })}
          type="text"
          placeholder="Last Name"
        />
        <button onClick={() => this._pushNotification()}>Submit</button>
      </div>
    )
  }
  _pushNotification = async () => {
    const { firstName , lastName } = this.state
    
    await this.props.pushNotificationMutation({
      variables: {
        input:{firstName:firstName , lastName:lastName}
      }
    })
    this.setState({ firstName: '' , lastName: '' });
  }
}

const POST_MUTATION = gql `
mutation createFriend($input:FriendInput){
createFriend(input: $input ){
    firstName
    lastName
  }
}
`;

export default graphql(POST_MUTATION, { name: 'pushNotificationMutation' })(PushNotification)