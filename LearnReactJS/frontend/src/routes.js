import HandleReduxForm from "./views/Redux-Form/HandleReduxForm";
import StripePayment from "./views/StripePayment/StripePayment";

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/redux-form",
    name: "Redux Form",
    component: HandleReduxForm,
    exact: true
  },
  {
    path: "/payment",
    name: "Payment",
    component: StripePayment,
    exact: true
  }
];

export default routes;
