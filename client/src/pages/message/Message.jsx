import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.css";
import MessageItem from "./MessageItem"; // New component for individual messages

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    if (message.trim()) {
      mutation.mutate({
        conversationId: id,
        desc: message,
      });
      e.target[0].value = ""; // Clear the textarea after submission
    }
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} SidTauseef {">"}
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <div className="error">Something went wrong! Please try again later.</div>
        ) : (
          <div className="messages">
            {data.map((m) => (
              <MessageItem 
                key={m._id} 
                message={m} 
                isOwner={m.userId === currentUser._id} 
                userImage={m.userId === currentUser._id ? currentUser.img : "/public/img/noman.png"} 
              />
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Write a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
