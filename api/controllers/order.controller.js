import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE);

export const intent = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100, // Convert price to cents
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    }).populate("gigId"); // Optionally populate gig details if needed

    res.status(200).json(orders); // Use .json() for consistency
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      },
      { new: true } // Return the updated document
    );

    if (!order) return next(createError(404, "Order not found!"));

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
