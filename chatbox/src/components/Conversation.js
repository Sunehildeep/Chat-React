import React, { useEffect, useState } from "react";
import "../styles/conversation.css";
import { getConversationHistory, postMessage } from "../actions/conversations";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Conversation = ({ selectedConversation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.authentication?.user?.name);
  const currentId = useSelector((state) => state.authentication?.user?.id);
  const [message, setMessage] = useState("");
  const socket = io('http://localhost:8000');

  useEffect(() => {
    getConvo();
  }, []);

  useEffect(() => {
    if (loading) return;
    const convoBody = document.getElementById("convo-body");
    convoBody.scrollTop = convoBody.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    setupWebSocket();
    // Cleanup WebSocket connection when the component unmounts
    return () => {
      if (socket) {
        // rmeove the event listener
        socket.off("message");
        socket.off("connect");
        socket.emit("leaveRoom", selectedConversation.id);
        // also remove from the room
      }
    };
  }, []); // Empty dependency array to ensure it's called only once

  const getConvo = async () => {
    const history = await getConversationHistory(selectedConversation.id);
    console.log("Conversation history:", history);
    setMessages(history);
    setLoading(false);
  };

  const setupWebSocket = () => {

    socket.connect();

    socket.on("connect", () => {
      console.log("WebSocket connection established");
      socket.emit("joinRoom", selectedConversation.id);
    });

    socket.on("message", (receivedMessage) => {
      console.log("Message received from server:", receivedMessage);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

  };

  const handleSendMessage = () => {
    if (!socket || socket.disconnected) {
      console.log("WebSocket connection is not open");
      return;
    }
    const newMessage = {
      name: currentUser,
      message: message,
      time: new Date(),
      roomId: selectedConversation.id,
    };

    postMessage(selectedConversation.id, currentId, message);

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
    </div>
  );
};

export default Conversation;
