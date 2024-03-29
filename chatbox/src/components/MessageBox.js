import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Timestamp from "./Timestamp";
import { updateMessage } from "../actions/conversationActions";
import { useSelector } from "react-redux";

export default function MessageBox({
	id,
	showSender,
	showTimestamp,
	message,
	index,
	currentUser,
	messageLength,
    socket,
    user1,
    user2
}) {
	const { ref, inView } = useInView({ triggerOnce: false });
	const currentId = useSelector((state) => state.authentication?.user?.id);

	const markAsRead = async (message) => {
		await updateMessage(id, message, true);
        socket.emit(
			"refresh",
			user1,
			user2
		);
	};

	if (
		!message.is_read &&
		index === messageLength - 1 &&
		currentUser != message.name &&
		inView
	) {
		message.is_read = 1;
		markAsRead(message.message);
	}

	return (
		<div
			ref={ref}
			className={`conversation-message ${
				message.name === currentUser ? "right" : "left"
			}`}
		>
			{showSender && (
				<div
					className={`${message.name === currentUser ? "sender" : "receiver"}`}
				>
					{message.name === currentUser ? "You" : message.name}
				</div>
			)}
			<div className="message">{message.message}</div>
			{showTimestamp && (
				<div
					className={`${
						message.name === currentUser ? "timestamp-right" : "timestamp-left"
					}`}
				>
					<Timestamp timestamp={message.time} />
					{/* Show seen or not if its last msg and its currentUser */}
					{message.name === currentUser && index === messageLength - 1 && (
						<div className="seen">{message.is_read ? "Seen" : "Delivered"}</div>
					)}
				</div>
			)}
		</div>
	);
}
