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
      <h2 className="reviews-title">Reviews</h2>
      {isLoading ? (
        <p className="loading-text">Loading reviews...</p>
      ) : error ? (
        <p className="error-text">Something went wrong! Please try again later.</p>
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}
      <hr className="divider" />
      <div className="add-review">
        <h3 className="add-review-title">Add a Review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <label htmlFor="description">Your Opinion:</label>
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
          <button type="submit" className="submit-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
