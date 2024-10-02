import React from "react";
import "./GigCard.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt={item.desc} />
        <div className="info">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong!</p>
          ) : (
            <div className="user">
              <img src={data.img || "/img/noman.png"} alt={data.username} />
              <span className="username">{data.username}</span>
            </div>
          )}
          <p className="description">{item.desc}</p>
          <div className="star">
            <img src="./icons/star.png" alt="Star rating" />
            <span className="rating">
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./icons/heart.png" alt="Favorite" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>₹ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
