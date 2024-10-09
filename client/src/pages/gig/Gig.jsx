import "./Gig.css";
import  Marquee  from "react-fast-marquee";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  const calculateRating = (totalStars, starNumber) => {
    if (starNumber === 0) return 0;
    return Math.round(totalStars / starNumber);
  };

  const renderStars = (rating) => {
    return Array(rating).fill().map((_, i) => (
      <img src="/icons/star.png" alt="star" key={i} />
    ));
  };

  const renderUserInfo = () => (
    <div className="user">
      <img className="pp" src={dataUser.img || "/img/noman.png"} alt="User" />
      <span>{dataUser.username}</span>
      <div className="stars">
        {renderStars(calculateRating(data.totalStars, data.starNumber))}
        <span>{calculateRating(data.totalStars, data.starNumber)}</span>
      </div>
    </div>
  );

  return (
    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              SkillShareMarket {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <>
                {renderUserInfo()}
                <Marquee className="marquee" speed={50}>
                  {data.images.map((img) => (
                    <img key={img} src={img} alt="Gig" />
                  ))}
                </Marquee>
                <h2>About This Gig</h2>
                <p>{data.desc}</p>
                <div className="seller">
                  <h2>About The Seller</h2>
                  {renderUserInfo()}
                  <button>Contact Me</button>
                  <div className="box">
                    <div className="items">
                      <div className="item">
                        <span className="title">From</span>
                        <span className="desc">{dataUser.country}</span>
                      </div>
                      <div className="item">
                        <span className="title">Member since</span>
                        <span className="desc">Aug 2022</span>
                      </div>
                      <div className="item">
                        <span className="title">Avg. response time</span>
                        <span className="desc">4 hours</span>
                      </div>
                      <div className="item">
                        <span className="title">Last delivery</span>
                        <span className="desc">1 day</span>
                      </div>
                      <div className="item">
                        <span className="title">Languages</span>
                        <span className="desc">English</span>
                      </div>
                    </div>
                    <hr />
                    <p>{dataUser.desc}</p>
                  </div>
                </div>
                <Reviews gigId={id} />
              </>
            )}
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>₹ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/icons/clock.png" alt="Clock" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/icons/recycle.png" alt="Revisions" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/icons/greencheck.png" alt="Feature" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
