import { React, useEffect, useState } from 'react'
import '../styles/chatbox.css'
import ConvoBanner from '../components/ConvoBanner';
import Conversation from '../components/Conversation';
import { getConversationsList, getAllUsers } from '../actions/conversationActions';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../actions/authenticationActions';

const Chatbox = ({socket}) => {
    const [selectedConversation, setSelectedConversation] = useState(null); 
    const [conversations, setConversations] = useState();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [info, setInfo] = useState('Start a conversation by searching for a user');
    const userId = useSelector((state) => state.authentication?.user?.id);

    if (!isAuthenticated()) {
        window.location.href = '/';
    }

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
    };

    useEffect(() => {

        // connectId
        socket.emit('connectId', userId);

        // If socket emits refresh from backend, refresh the conversations list
        socket.on('refresh', () => {
            console.log('Refreshing conversations list');
            loadConversations(userId);
        });

        loadConversations(userId);

        return () => {
            socket.off('refresh');
        }

    }, []);

    const loadConversations = async (userId) => {
        try {
            const convos = await getConversationsList(userId);
            console.log("Time is :", new Date().toLocaleTimeString());
            console.log(convos);
            setConversations(convos);
            setFilteredUsers(convos)
            setLoading(false);
        }
        catch (error) {
            console.log(error)
        }
    }

    const loadUsers = async () => {
        try {
            const users = await getAllUsers();
            return users;
        }
        catch (error) {
            console.log(error)
        }
    }

    const searchForUser = async (event) => {

        if (event.key != 'Enter')  return;
        if (search == '') {
            setFilteredUsers(conversations);
            setInfo(conversations.length == 0 ? 'Start a conversation by searching for a user' : '');
            return;
        } 

        const users = await loadUsers();
        const filteredUsers = users.filter((user) => {
            // Filter out the current user
            if (user.userId == userId) return false;

            return user.name.toLowerCase().includes(search.toLowerCase());
        });

        if(filteredUsers.length == 0) setInfo('No results found')
        else setInfo('');

        console.log(filteredUsers);

        // Check if the userId in filteredUsers is in conversations.user1 or conversations.user2
        // If it is, then replace that index in filteredUsers with the conversation object
        for (let i = 0; i < filteredUsers.length; i++) {
            const user = filteredUsers[i];
            const conversation = conversations.find((conversation) => {
                return conversation.user1 == user.userId || conversation.user2 == user.userId;
            });

            if (conversation) {
                filteredUsers[i] = conversation;
            }
        }

        setFilteredUsers(filteredUsers);
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
                    <input type="text" className="search-input" placeholder="Search for people..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => searchForUser(e)}/>
                </div>
                <div className="past-convos">
                    {/* Past conversations go here */}
                    {
                        filteredUsers.length > 0 ? filteredUsers.map((conversation, index) => (
                            <ConvoBanner
                                key={conversation.id ? conversation.id : conversation.userId}
                                onClick={handleConversationClick}
                                convo={conversation}
                            />
                        )) : <div className="sidebar-info">{info}</div>
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