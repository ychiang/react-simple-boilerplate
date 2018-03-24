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
      messages: []
    }
    this.newUsername = this.newUsername.bind(this);
    this.newMessage = this.newMessage.bind(this);
    //this.defaultUser = this.defaultUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (evt) => this.onMessageHandler(evt);
  }

  onMessageHandler(event) {
    const msgs = this.state.messages.concat(JSON.parse(event.data));
    this.setState({ messages: msgs });
  }

  newMessage(type,username, content) {
    const currentMessage = {type, username, content };
    console.log(currentMessage);
    this.socket.send(JSON.stringify(currentMessage));
  }

  newUsername(name){
    console.log('nidaye', name, this);
    this.setState({currentUser:{name:name}});
    console.log(this.state.currentUser)
  }

  render() {
    const currentUser = this.state.currentUser.name;
    const messages = this.state.messages;
    return (
      <div className="entire-app">
        <div className="navbar">
          <NavBar />
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

