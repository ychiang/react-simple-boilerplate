import React, { Component } from 'react';
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.currentUser || '',
      content: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.onKeypress = this.onKeypress.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  onKeypress(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.username.replace(/\s/g, '').length <= 0 ? 'Bob the duckling 🐥' : this.state.username, this.state.content);
      this.setState({
        content: ''
      });
    }
  }

  render() {
    //Needs to implement if no username entered, defaultValue = Bob. 
    let props = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Bob the duckling 🐥" value={this.state.username} onChange={this.handleUsernameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit Enter" onKeyPress={this.onKeypress} onChange={this.handleContentChange} value={this.state.content} />
      </footer>
    );
  }
}

