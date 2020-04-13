require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.Secret_Key); //require('stripe')("ENTER_STRIPE_SECRET_KEY").
const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res, next) => {
  res.send({
    version: "v1.0.1"
  });
});

app.post("/charge", async (req, res, next) => {
  let error;
  let status;

  try {
    const { product, token } = req.body;
    const idempotencyKey = uuidv4(); // Unique user id to remove payment ambeguity for single user.

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const charge = await stripe.charges.create(
      {
        amount: product.amount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );

    if (charge.status == "succeeded") {
      status = "success";
    } else {
      status = "";
    }
  } catch (error) {
    status = "failure";
  }

  res.json({ error, status });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
