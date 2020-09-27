import * as React from 'react';
import { Query   , Subscription} from 'react-apollo';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import PushNotification from './PushNotification';
import 'react-toastify/dist/ReactToastify.css';

const APP_QUERY = gql`
  query{
    getFriends{
      firstName
      lastName
    }
  }
`;



const FRIEND_ADDED_SUBSCRIPTION = gql`
  subscription{
    friendAdded{
      firstName
    
    }

  } 
`;

export class App extends React.Component {

  componentWillReceiveProps({ data: { friendAdded: { firstName } } }) {
    toast(firstName);
  }
  

  render() {

     
    return <div className="App">

      <Subscription
          subscription={FRIEND_ADDED_SUBSCRIPTION}
        >
          {({ data, loading }) => (
            <h4>New friend: {!loading && data.friendAdded.firstName}</h4>
          )}
      </Subscription>
      <Query query={APP_QUERY}>
      {({ loading, error, data }) => {

        if (loading) return 'Loading...';
        if (error) return 'Error...';
        var text="";
        data.getFriends.forEach(element => {
          text+=element.firstName+",";
          
        });
        return <div>Friend List : {text}</div>;
      }}
    </Query>

    <div className="App-intro">
          <PushNotification/>
    </div> 
    </div>
  }
}

