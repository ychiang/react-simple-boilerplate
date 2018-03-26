import React, { Component } from 'react';
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: ''
    };
    //If no username entered, default = Bob 
    this.defaultUsername = 'Bob the duckling 🐥';
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.onKeypress = this.onKeypress.bind(this);
    this.onBlur = this.onBlur.bind(this);
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
      let props = this.props;
      let newUsername = this.state.username.replace(/\s/g, '').length <= 0 ? this.defaultUsername : this.state.username;
      props.newMessage('postMessage', newUsername, this.state.content);
      this.setState({
        content: ''
      });
    }
  }

  //Once user use either tab or clicking elsewhere (no more focus on input), fires the event of userA changed username to userB
  onBlur(event){
    let newUsername = event.target.value;
    newUsername = newUsername.replace(/\s/g, '').length <= 0 ? this.defaultUsername : newUsername;
    if (this.props.currentUser !== newUsername) {
      this.props.newMessage('postNotification', null, `${this.props.currentUser} changed name to ${newUsername}`);
      this.props.newUsername(this.state.username);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.defaultUsername} value={this.state.username} onChange={this.handleUsernameChange} onBlur={this.onBlur}/>
        <input className="chatbar-message" placeholder="Type a message and hit Enter" onKeyPress={this.onKeypress} onChange={this.handleContentChange} value={this.state.content} />
      </footer>
    );
  }
}

