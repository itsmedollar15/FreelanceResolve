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
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading user data</p>
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noman.png"} alt="Profile picture" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img src="/icons/star.png" alt="Star rating" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/icons/like.png" alt="Like" />
        <span>Yes</span>
        <img src="/icons/dislike.png" alt="Dislike" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
