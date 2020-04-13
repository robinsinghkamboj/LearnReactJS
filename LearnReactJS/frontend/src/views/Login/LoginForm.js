import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "../../common/renderField";
import { validateReduxForm } from "../../common/validations";
import { connect } from "react-redux";

class LoginForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="formContainer">
        <h2>Login Form</h2>

        <form onSubmit={handleSubmit} className="reduxForm">
          <div class="form-group">
            <Field
              type="email"
              component={renderField}
              name="email"
              className="form-control shadow-none"
              label="Email"
              id="email"
            />
          </div>
          <div class="form-group">
            <Field
              type="password"
              component={renderField}
              name="password"
              className="form-control shadow-none"
              label="Password"
              id="password"
            />
          </div>
          <br></br>

          <button
            type="submit"
            class="btn btn-primary shadow-none"
            // disabled={pristine || submitting}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: props.initialValues // retrieve data from redux store
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "LoginForm", // a unique identifier for this form
    enableReinitialize: true,
    validate: validateReduxForm
  })(LoginForm)
);
