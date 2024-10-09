import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useTranslation } from "react-i18next"; // Import translation hook
import "./Review.css";

const Review = ({ review }) => {
  const { t } = useTranslation(); // Hook for translation

  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () => newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <div className="review">
      {isLoading ? (
        <p className="loading-text">{t("loading.loadingText")}</p> // Use translation for loading text
      ) : error ? (
        <p className="error-text">{t("error.errorLoadingData")}</p> // Use translation for error message
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noman.png"} alt="Profile" />
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
          <img src="/icons/star.png" alt={t("stars.starAlt")} key={i} /> // Use translation for star alt text
        ))}
        <span className="star-count">{review.star}</span>
      </div>
      <p className="review-desc">{review.desc}</p>
      <div className="helpful">
        <span>{t("helpful.helpfulQuestion")}</span> {/* Use translation for helpful question */}
        <button className="helpful-btn">
          <img src="/icons/like.png" alt={t("helpful.likeAlt")} />
          <span>{t("helpful.yes")}</span> {/* Use translation for Yes */}
        </button>
        <button className="helpful-btn">
          <img src="/icons/dislike.png" alt={t("helpful.dislikeAlt")} />
          <span>{t("helpful.no")}</span> {/* Use translation for No */}
        </button>
      </div>
    </div>
  );
};

export default Review;
