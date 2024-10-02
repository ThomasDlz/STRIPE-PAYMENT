import stripePackage from "stripe";

const stripe = stripePackage(process.env.API_KEY_SECRET);

const calculateOrderAmount = (total_amount, shipping_fee) => {
  return total_amount + shipping_fee;
};

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(total_amount, shipping_fee),
    currency: "eur",
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
};

export { stripeController };
