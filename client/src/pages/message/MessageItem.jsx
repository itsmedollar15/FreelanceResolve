import React from "react";

const MessageItem = ({ message, isOwner, userImage }) => {
  return (
    <div className={`item ${isOwner ? "owner" : ""}`}>
      <img src={userImage} alt="User" />
      <p>{message.desc}</p>
    </div>
  );
};

export default MessageItem;
