import React, {Component} from 'react';
import NavBar from './nav-bar.jsx';
import MessageList from './messagelist.jsx';
import Footer from './footer.jsx';

export default class App extends Component {
  //Set initial state
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob the duckling 🐥'},
      message: [{
        id: 1,
        username: 'Puff the bunny 🐰',
        content: 'dreaming about strawberries...yum!'
      },
      {
        id: 2,
        username: 'Bob the duckling 🐥',
        content: 'I won\'t be impressed with technology until I can download food'
      }]
    }
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      let newMessage = { id: 3, username: 'Mimi the pigglet 🐷', content: 'Hello there!' };
      const messages = this.state.message.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ message: messages })
    }, 2000);
  }

  newChatLine() {
    setTimeout(() => {
      let newMessage = { id: 4, username: ''}
      let newMessageList = this.state.message.concat(newMessage)
      this.setState({ message: newMessageList }) 
      }, 1000);
  }

  render() {
    const currentUser = this.state.currentUser.name;
    const messages = this.state.message;
    return (
      <div className="entire-app">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="container">
          <MessageList messages={messages}/>
        </div>
        <div className="chatbar">
          <Footer currentUser={currentUser} />
        </div>
      </div>
    );
  }
}

