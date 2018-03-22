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
      currentUser: { name: 'Bob the duckling 🐥'},
      message: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (evt) => this.onMessageHandler(evt);
  }

  onMessageHandler(event) {
    const msgs = this.state.message.concat(JSON.parse(event.data));
    this.setState({ message: msgs });
  }

  newMessage(username, content) {
    const currentMessage = { username, content };
    this.socket.send(JSON.stringify(currentMessage));
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
          <MessageList messages={messages} />
        </div>
        <div className="chatbar">
          <Footer newMessage={this.newMessage.bind(this)} />
        </div>
      </div>
    );
  }
}

