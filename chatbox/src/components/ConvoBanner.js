import React from 'react'

const ConvoBanner = ({ name, avatar, lastMessage, onClick, id }) => {
    return (
        <div className="convo-banner" onClick={() => onClick({name, avatar, id }) }>
            <img className="convo-avatar" src={avatar} alt={name} />
            <div className="convo-info">
                <h3 className="convo-name">{name}</h3>
                <p className="convo-last-message">{lastMessage}</p>
            </div>
        </div>
    );
}

export default ConvoBanner