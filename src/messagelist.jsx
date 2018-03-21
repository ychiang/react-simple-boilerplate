import React, { Component } from 'react';
import Message from './message.jsx';

export default class MessageList extends Component {
  render() {
    const props = this.props;
    const messages = props.messages.map(({ id, username, content }) => (
      <Message
        key={id}
        username={username}
        content={content} />
    ))
    return (
      <main className="messages">
        {messages}
        <div className="message system">
          Bob changed his name to nomnom.
        </div>
      </main>
    );
  }
}
