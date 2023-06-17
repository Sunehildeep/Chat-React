import React from "react";
import MessageBox from "./MessageBox";

const Messages = ({ id, messages, currentUser, user1, user2, socket }) => {
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
					<MessageBox
						id={id}
						showSender={showSender}
						showTimestamp={showTimestamp}
						message={message}
            user1={user1}
            user2={user2}
            socket={socket}
						index={index}
						currentUser={currentUser}
						messageLength={messages.length}
					/>
				
				);
			})}
		</div>
	);
};

export default Messages;
