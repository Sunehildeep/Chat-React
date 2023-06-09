import { React, useEffect, useState } from 'react'
import '../styles/chatbox.css'
import '../styles/convobanner.css';
import ConvoBanner from '../components/ConvoBanner';
import Conversation from '../components/Conversation';
import { getConversationsList, getAllUsers } from '../actions/conversations';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../actions/authentication';
const Chatbox = ({socket}) => {
    const [selectedConversation, setSelectedConversation] = useState(null); 
    const [conversations, setConversations] = useState();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const userId = useSelector((state) => state.authentication?.user?.id);

    if (!isAuthenticated()) {
        window.location.href = '/';
    }

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
    };

    useEffect(() => {
        loadConversations(userId);
        loadUsers();
    }, []);

    const loadConversations = async (userId) => {
        try {
            const convos = await getConversationsList(userId);
            setConversations(convos);
            setLoading(false);
        }
        catch (error) {
            console.log(error)
        }
    }

    const loadUsers = async () => {
        try {
            const users = await getAllUsers();
            setUsers(users);
        }
        catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chatbox-container">
            <div className="left-bar">
                <h2>
                    Conversations
                </h2>
                <div className="search-box">
                    <input type="text" className="search-input" placeholder="Search for people..." />
                </div>
                <div className="past-convos">
                    {/* Past conversations go here */}
                    {
                        conversations.map((conversation) => (
                            <ConvoBanner
                                key={conversation.id}
                                onClick={handleConversationClick}
                                name={conversation.name}
                                avatar={conversation.avatar}
                                lastMessage={conversation.last_message}
                                id={conversation.id}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="chatbox">
                <div className="chatbox-header">
                    <h2 className="chatbox-title">Chatbox</h2>
                </div>
                <div className="chatbox-body">
                    {/* Chat messages go here */}
                    {selectedConversation ? (
                        <Conversation socket={socket} selectedConversation={selectedConversation} />
                    ) : (
                        <div className="chatbox-placeholder">Select a conversation</div>
                    )}

                </div>
                <div className="chatbox-footer">
                    <input type="text" className="chatbox-input" placeholder="Type your message..." />
                    <button className="chatbox-send">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox