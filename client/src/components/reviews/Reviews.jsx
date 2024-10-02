import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.css";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => newRequest.post("/reviews", review),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target.elements.description.value;
    const star = e.target.elements.rating.value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p>Something went wrong! Please try again later.</p>
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}
      <div className="add">
        <h3>Add a review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <label htmlFor="description">Write your opinion:</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Write your opinion"
            required
          />
          <label htmlFor="rating">Rating:</label>
          <select id="rating" name="rating" required>
            <option value="" disabled>Select a rating</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
