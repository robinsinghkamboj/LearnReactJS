import React from "react";
import LoginForm from "./LoginForm";
import * as utility from "../../utility";
import { reset } from "redux-form";
import auth from "../../common/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "learn.react@gmail.com",
      password: "123456",
      errorMsg: ""
    };
  }

  componentDidMount() {
    let loginData = {
      email: "learn.react@gmail.com",
      password: "123456"
    };

    utility.setItemLocalStorage("loginData", loginData);
  }

  handleSubmit = async (values, dispatch) => {
    await dispatch(reset("LoginForm"));
    let loginData = await utility.readLocalStorage("loginData");
    if (
      loginData["email"] == values["email"] &&
      loginData["password"] == values["password"]
    ) {
      this.setState({ errorMsg: "" });
      await auth.login(() => {
        utility.navigateTo(this.props, "/redux-form");
      });
    } else {
      this.setState({ errorMsg: "Wrong credentials!" });
    }
  };

  render() {
    return (
      <div className="row mr-0 ml-0 mt-2">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <LoginForm onSubmit={this.handleSubmit} initialValues={this.state} />
          <p className="text-danger col text-center mt-2">
            {this.state.errorMsg}
          </p>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
  }
}

export default Login;
