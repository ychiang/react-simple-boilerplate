import React, {Component} from 'react';
import NavBar from './nav-bar.jsx';
import MessageList from './messagelist.jsx';
import Footer from './footer.jsx';

export default class App extends Component {
  //Set initial state
  constructor(props) {
    super(props);
    this.socket = '';
    this.state = {
      currentUser: {name: 'Bob the duckling 🐥'},
      userCount: 0,
      messages: []
    }
    this.newUsername = this.newUsername.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (evt) => this.onMessageHandler(evt);
   
  }

  // onUserCount(event) {
  //   const usersOnline = event.data;
  //   this.setState({ userCount: usersOnline });
  // }

  onMessageHandler(event) {
    let newMessage = JSON.parse(event.data);
    const msgs = this.state.messages.concat(newMessage);
    if (newMessage.type === 'userCount') {
      this.setState({ userCount: newMessage.connected })
    } else {
    this.setState({ messages: msgs });
    }
  }

  newMessage(type, username, content) {
    const currentMessage = {type, username, content };
    // console.log(currentMessage);
    this.socket.send(JSON.stringify(currentMessage));
  }

  newUsername(name){
    this.setState({currentUser:{name:name}});
  }

  render() {
    const currentUser = this.state.currentUser.name;
    const messages = this.state.messages;
    return (
      <div className="entire-app">
        <div className="navbar">
          <NavBar userCount={this.state.userCount} />
        </div>
        <div className="container">
          <MessageList messages={messages} />
        </div>
        <div className="chatbar">
          <Footer newMessage={this.newMessage} newUsername={this.newUsername} currentUser={currentUser} />
        </div>
      </div>
    );
  }
}

