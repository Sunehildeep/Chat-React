import React from 'react';

const Timestamp = ({timestamp}) => {
    const dateObject = new Date(timestamp);
    const dateNumber = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const time = dateObject.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    const formattedTimestamp = `${dateNumber} ${month}, ${time}`;

    return <div>{formattedTimestamp}</div>;
}

export default Timestamp
