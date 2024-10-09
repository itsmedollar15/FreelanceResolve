import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.css";
import { useTranslation } from "react-i18next"; // Import translation hook

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(); // Hook for translation

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
      <h2 className="reviews-title">{t("reviews.title")}</h2>
      {isLoading ? (
        <p className="loading-text">{t("reviews.loadingText")}</p>
      ) : error ? (
        <p className="error-text">{t("reviews.errorMessage")}</p> 
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}
      <hr className="divider" />
      <div className="add-review">
        <h3 className="add-review-title">{t("reviews.addReviewTitle")}</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <label htmlFor="description">{t("reviews.yourOpinionLabel")}</label> 
          <input
            id="description"
            name="description"
            type="text"
            placeholder={t("reviews.opinionPlaceholder")}
            required
          />
          <label htmlFor="rating">{t("reviews.ratingLabel")}</label> {/* Use translation for rating label */}
          <select id="rating" name="rating" required>
            <option value="" disabled>{t("reviews.selectRating")}</option> {/* Use translation for select rating */}
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-button">{t("reviews.sendButton")}</button> {/* Use translation for button text */}
        </form>
      </div>
    </div>
  );
};

export default Reviews;
