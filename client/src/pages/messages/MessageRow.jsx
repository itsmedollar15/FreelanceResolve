import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MessageRow = ({ conversation, currentUser, handleRead, mutationLoading }) => {
  const isActive =
    (currentUser.isSeller && !conversation.readBySeller) ||
    (!currentUser.isSeller && !conversation.readByBuyer);

  return (
    <tr className={isActive ? "active" : ""}>
      <td>{currentUser.isSeller ? conversation.buyerId : conversation.sellerId}</td>
      <td>
        <Link to={`/message/${conversation.id}`} className="link">
          {conversation?.lastMessage?.substring(0, 100)}...
        </Link>
      </td>
      <td>{moment(conversation.updatedAt).fromNow()}</td>
      <td>
        {isActive && (
          <button
            onClick={() => handleRead(conversation.id)}
            disabled={mutationLoading}
          >
            {mutationLoading ? "Marking as Read..." : "Mark as Read"}
          </button>
        )}
      </td>
    </tr>
  );
};

export default MessageRow;
