import React from 'react';
import Timestamp from './Timestamp';

const Messages = ({ messages, currentUser }) => {
  let previousSender = null;
  let previousTimestamp = null;
  let showSender = false;
  let showTimestamp = true;
  let currentTimestamp = null;
  let currentSender = null;
  let timeDifference = null;
  let nextMessage = null;
  let nextSender = null;

  return (
    <div>
      {messages.map((message, index) => {
        currentSender = message.name;
        currentTimestamp = new Date(message.time);
        nextMessage = messages[index + 1];
        nextSender = nextMessage ? nextMessage.name : null;

        showSender = false;
        showTimestamp = true;

        if (previousSender !== currentSender) {
          showSender = true;
        }

        if (nextSender === currentSender) {
          showTimestamp = false;
          timeDifference = currentTimestamp - new Date(previousTimestamp);
          if (timeDifference < 6 * 60 * 60 * 1000) {
            showTimestamp = false;
          } else {
            showTimestamp = true;
          }
        }

        previousSender = currentSender;
        previousTimestamp = message.time;

        return (
          <div
            key={index}
            className={`conversation-message ${message.name === currentUser ? 'right' : 'left'}`}
          >
            {showSender && (
              <div className={`${message.name === currentUser ? 'sender' : 'receiver'}`}>
                {message.name}
              </div>
            )}
            <div className="message">{message.message}</div>
            {showTimestamp && (
              <div className={`${message.name === currentUser ? 'timestamp-right' : 'timestamp-left'}`}>
                <Timestamp timestamp={message.time} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
