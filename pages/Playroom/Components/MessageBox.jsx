import React from 'react';

const MessageBox = ({ message }) => {
  return (
    <div className={`message-box ${message.type}`}>
      {message.text}
    </div>
  );
};

export default MessageBox;