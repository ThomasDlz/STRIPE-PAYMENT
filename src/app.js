import express from "express";
import "dotenv/config";
const app = express();
import notFound from "./middleware/not-found.middleware.js";
import errorHandler from "./middleware/error-handler.middleware.js";
import { stripeController } from "./controllers/stripe.controller.js";

app.use(express.static("public"));
app.use(express.json());

app.post("/create-payment-intent", stripeController);

app.use(notFound);
app.use(errorHandler);

export default app;
