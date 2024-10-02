import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.css";
import moment from "moment";
import MessageRow from "./MessageRow"; // New component for message rows

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        {isLoading ? (
          <p className="loading">Loading conversations...</p>
        ) : error ? (
          <p className="error">Something went wrong! Please try again later.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-conversations">No conversations found.</td>
                </tr>
              ) : (
                data.map((c) => (
                  <MessageRow
                    key={c.id}
                    conversation={c}
                    currentUser={currentUser}
                    handleRead={handleRead}
                    mutationLoading={mutation.isLoading}
                  />
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Messages;
