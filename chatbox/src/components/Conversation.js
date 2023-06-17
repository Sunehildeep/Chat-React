import React, { useEffect, useState } from "react";
import "../styles/conversation.css";
import {
	getConversationHistory,
	postMessage,
	startConvo,
} from "../actions/conversationActions";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const Conversation = ({ selectedConversation, socket }) => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const currentUser = useSelector((state) => state.authentication?.user?.name);
	const currentId = useSelector((state) => state.authentication?.user?.id);
	const [isNewConversation, setIsNewConversation] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getConvo();
		setupWebSocket();

		// Cleanup WebSocket connection when the component unmounts
		return () => {
			// remove the event listener
			socket.off("message");
			socket.off("connect");
			socket.emit("leaveRoom", selectedConversation.id);
			console.log("Left room:", selectedConversation.id);
		};
	}, [selectedConversation]);

	useEffect(() => {
		if (loading) return;
		const convoBody = document.getElementById("convo-body");
		convoBody.scrollTop = convoBody.scrollHeight;
	}, [messages, loading]);

	const getConvo = async () => {
		if (selectedConversation?.userId) {
			// It means it is a new conversation
			setIsNewConversation(true);
		} else {
			const history = await getConversationHistory(selectedConversation.id);
			setMessages(history);
		}
		setLoading(false);
	};

	const setupWebSocket = () => {
		if (!selectedConversation.id) return;

		socket.emit("joinRoom", selectedConversation.id);
		console.log("Joined room:", selectedConversation.id);

		socket.on("message", (receivedMessage) => {
			console.log("Message received from server:", receivedMessage);
			setMessages((prevMessages) => [...prevMessages, receivedMessage]);
		});
	};

	const handleSendMessage = async () => {
		if (!message) return;
		// Limit to 300 characters
		if (message.length > 300) {
			alert("Message is too long (300 characters max)");
			return;
		}

		if (!socket || socket.disconnected) {
			console.log("WebSocket connection is not open");
			return;
		}

		if (isNewConversation) {
			setIsNewConversation(false);

			const convoId = await startConvo(
				currentId,
				selectedConversation.userId,
				message
			);
			selectedConversation.id = convoId;

			selectedConversation.user1 = currentId;
			selectedConversation.user2 = selectedConversation.userId;

			delete selectedConversation.userId;

			setupWebSocket();
		}

		const newMessage = {
			name: currentUser,
			message: message,
			time: new Date(),
			roomId: selectedConversation.id,
		};

		await postMessage(selectedConversation.id, currentId, message);

		socket.emit(
			"refresh",
			selectedConversation.user1,
			selectedConversation.user2
		);

		socket.emit("message", newMessage);
		setMessage("");
	};

	if (loading) {
		return <div className="conversation">Loading...</div>;
	}

	return (
		<div className="conversation">
			<div className="conversation-header">
				<img
					className="conversation-avatar"
					src={selectedConversation.avatar}
					alt={selectedConversation.name}
				/>
				<h3 className="conversation-name">{selectedConversation.name}</h3>
			</div>
			<div className="conversation-body" id="convo-body">
				<Messages messages={messages} currentUser={currentUser} />
			</div>
			<div className="conversation-footer">
				<input
					type="text"
					className="conversation-input"
					placeholder="Type your message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className="conversation-send" onClick={handleSendMessage}>
					Send
				</button>
			</div>
			<div className="conversation-characters">
				{message.length}/300 characters
				<br />
			</div>
		</div>
	);
};

export default Conversation;
