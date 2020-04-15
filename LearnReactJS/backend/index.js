require("dotenv").config();
const service = require("./service");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.Secret_Key); //require('stripe')("ENTER_STRIPE_SECRET_KEY").
const port = 4000;
const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // to support URL-encoded bodies
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async (req, res, next) => {
  res.send({
    version: "v1.0.1"
  });
  res.end();
});

app.get("/get-all-users", async (req, res, next) => {
  try {
    await service.GetAllUsers(cb => {
      res.send(cb);
      res.end();
    });
  } catch (err) {
    res.send(err);
    res.end();
  }
});

app.get("/get-user/:id", async (req, res, next) => {
  try {
    let userId = req.params.id;

    await service.GetUserById(userId, cb => {
      res.send(cb);
      res.end();
    });
  } catch (err) {
    res.send(err);
    res.end();
  }
});

app.post("/save-user", async (req, res, next) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let rememberMe = req.body.remember_me;

    await service.SaveUser(name, email, password, rememberMe, cb => {
      res.send(cb);
      res.end();
    });
  } catch (err) {
    res.send(err);
    res.end();
  }
});

app.post("/update-user/:id", async (req, res, next) => {
  try {
    let userId = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let rememberMe = req.body.remember_me;

    await service.UpdateUser(userId, name, email, password, rememberMe, cb => {
      res.send(cb);
      res.end();
    });
  } catch (err) {
    res.send(err);
    res.end();
  }
});

app.get("/delete-user/:id", async (req, res, next) => {
  try {
    let userId = req.params.id;

    await service.DeleteUser(userId, cb => {
      res.send(cb);
      res.end();
    });
  } catch (err) {
    res.send(err);
    res.end();
  }
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
