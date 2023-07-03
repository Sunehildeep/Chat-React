import React, { useEffect, useState } from 'react'
import '../styles/convobanner.css';
import { useSelector } from 'react-redux';

const ConvoBanner = ({ convo, onClick }) => { 
	const currentId = useSelector((state) => state.authentication?.user?.id);

    const { name, avatar, last_message, id, userId, user1, user2, is_read, last_sender } = convo;
    return (
        <div className="convo-banner" onClick={() => onClick({name, avatar, id, userId, user1, user2, is_read }) }>
            <img className="convo-avatar" src={avatar} alt={name} />
            <div className="convo-info">
                <h3 className="convo-name">{name}</h3>
                <p className="convo-last-message">{!is_read && last_sender != currentId ? <span className="unseenMsg">{last_message}</span> : <span>{last_message}</span> }</p>
            </div>
        </div>
    );
}

export default ConvoBanner