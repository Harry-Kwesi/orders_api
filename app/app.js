import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
import path from "path";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import productsRouter from "../routes/productsRoute.js";
import brandsRouter from "../routes/brandsRoute.js";
import categoriesRouter from "../routes/categoriesRoute.js";
import colorRouter from "../routes/colorsRoute.js";
import couponsRouter from "../routes/couponsRoute.js";
import orderRouter from "../routes/ordersRoute.js";
import reviewRouter from "../routes/reviewsRoute.js";
import Order from "../models/Order.js";

const app = express();

dotenv.config();

dbConnect();

const stripe = new Stripe(process.env.STRIPE_KEY);

const endpointSecret =
  "whsec_5c6fad83756650cad322d39d444364316e006d6fc21fdad3ec843ec2ec548fa9";

//Stripe webhook
//stripe instance

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    if (event.type === "checkout.session.completed") {
      //update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      //find the order
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus,
        },
        {
          new: true,
        }
      );
    } else {
      return;
    }
    response.send();
  }
);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"));
});
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productsRouter);
app.use("/api/v1/categories/", categoriesRouter);
app.use("/api/v1/brands/", brandsRouter);
app.use("/api/v1/colors/", colorRouter);
app.use("/api/v1/coupons/", couponsRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/reviews/", reviewRouter);

export default app;
