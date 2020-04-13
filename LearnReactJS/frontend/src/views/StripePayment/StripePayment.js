import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class StripePayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      amount: ""
    };
  }

  handleChange = async e => {
    let nam = e.target.name;
    let val = e.target.value;

    await this.setState({ [nam]: val });
  };

  handleToken = async (token, addresses) => {
    let product = {
      name: this.state.name,
      amount: Number(this.state.amount)
    };

    const response = await axios.post("http://localhost:4000/charge", {
      token,
      product
    });
    const { status } = response.data;

    if (status === "success") {
      toast("Payment Done Successfully.", { type: "success" });
    } else {
      toast("Something Went Wrong! Please Try Again.", { type: "error" });
    }

    await this.setState({ name: "", amount: "" });
  };

  render() {
    return (
      <div className="row mt-2">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="mt-2 mb-4 col text-center">
            <b>Payment Using Stripe</b>
          </h1>

          <div class="form-group">
            <label htmlFor="name">
              <b>Product Name</b>
            </label>
            <input
              type="text"
              name="name"
              className="form-control shadow-none"
              placeholder="Product Name"
              required
              value={this.state.name}
              onChange={this.handleChange}
              id="name"
            />
          </div>

          <div class="form-group">
            <label htmlFor="amount">
              <b>Amount ($)</b>
            </label>
            <input
              type="number"
              name="amount"
              className="form-control shadow-none"
              placeholder="Amount ($)"
              id="amount"
              value={this.state.amount}
              required
              onChange={this.handleChange}
            />
          </div>
          <br />

          <StripeCheckout
            className="btn btn-primary shadow-none col text-center"
            stripeKey="pk_test_maURpi0WQmPLCfEL7DzVrlhq00C9FJB3nS"
            token={this.handleToken}
            amount={Number(this.state.amount)}
            name={this.state.name}
            billingAddress
            shippingAddress
            disabled={this.state.name && this.state.amount != "" ? false : true}
          />
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default StripePayment;
