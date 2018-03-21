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
      this.newMessage('Mimi the pigglet 🐷', 'hello there world!')
    }, 2000);
  }

  newMessage(username, content) {
    const messages = this.state.message.concat({username, content, id: Date.now()});
    this.setState({message: messages});
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

