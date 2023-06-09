import React, { useEffect, useState } from 'react'
import '../styles/convobanner.css';

const ConvoBanner = ({ convo, onClick }) => { 

    const { name, avatar, last_message, id, userId, user1, user2 } = convo;

    return (
        <div className="convo-banner" onClick={() => onClick({name, avatar, id, userId, user1, user2 }) }>
            <img className="convo-avatar" src={avatar} alt={name} />
            <div className="convo-info">
                <h3 className="convo-name">{name}</h3>
                <p className="convo-last-message">{last_message}</p>
            </div>
        </div>
    );
}

export default ConvoBanner