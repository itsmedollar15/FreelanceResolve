import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./Review.css";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        newRequest.get(`/users/${review.userId}`).then((res) => res.data),
    }
  );

  return (
    <div className="review">
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : error ? (
        <p className="error-text">Error loading user data</p>
      ) : (
        <div className="user">
          <img
            className="pp"
            src={data.img || "/img/noman.png"}
            alt="Profile"
          />
          <div className="info">
            <span className="username">{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array.from({ length: review.star }, (_, i) => (
          <img src="/icons/star.png" alt="Star rating" key={i} />
        ))}
        <span className="star-count">{review.star}</span>
      </div>
      <p className="review-desc">{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <button className="helpful-btn">
          <img src="/icons/like.png" alt="Like" />
          <span>Yes</span>
        </button>
        <button className="helpful-btn">
          <img src="/icons/dislike.png" alt="Dislike" />
          <span>No</span>
        </button>
      </div>
    </div>
  );
};

export default Review;
