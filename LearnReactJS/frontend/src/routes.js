import HandleReduxForm from "./views/Redux-Form/HandleReduxForm";
import StripePayment from "./views/StripePayment/StripePayment";
import CRUDWithMySQL from "./views/CRUDWithMySQL/CRUDWithMySQL";
import TwilioChat from "./views/TwilioChat/TwilioChat";

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/crud-with-mysql",
    name: "CRUD With MySQL",
    component: CRUDWithMySQL,
    exact: true
  },
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
  },
  {
    path: "/twilio-chat",
    name: "Twilio Chat",
    component: TwilioChat,
    exact: true
  }
];

export default routes;
