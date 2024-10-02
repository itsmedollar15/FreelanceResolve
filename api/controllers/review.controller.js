import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller) {
    return next(createError(403, "Sellers can't create a review!"));
  }

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const existingReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (existingReview) {
      return next(createError(403, "You have already created a review for this gig"));
    }

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).json(savedReview); // Use .json() for consistency
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).json(reviews); // Use .json() for consistency
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId, // Ensure the review belongs to the user
    });

    if (!review) {
      return next(createError(404, "Review not found or you are not authorized to delete this review"));
    }

    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    res.status(200).send("Review has been deleted.");
  } catch (err) {
    next(err);
  }
};
