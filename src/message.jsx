import React, { Component } from 'react';
export default class Message extends Component {
  constructor (props){
    super(props);
    this.handleMessageType= this.handleMessageType.bind(this);
  }
  handleMessageType(){
    switch (this.props.type){
      case 'incomingMessage':
      return (
        <div className="message">
        <div className="username">
          <span className="message-username">{this.props.username}</span>
        </div>
        <div className="content">
          <span className="message-content">{this.props.content}</span>
        </div>
        </div>
      );
      case 'incomingNotification':
      return (
        <div className="notification-content">
          <span className="message system">{this.props.content}</span>
        </div>
      );
    }
  }

  render() {
    const props = this.props;
    return (
      <div className="message">
        {this.handleMessageType()}
      </div>
    );
  }
}
