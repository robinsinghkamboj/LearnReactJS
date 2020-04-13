import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "../../common/renderField";
import { validateReduxForm } from "../../common/validations";
import InplaceConfirm from "../../common/inplaceConfirm";
import { connect } from "react-redux";

class ReduxForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      deleteUser,
      flashEdit
    } = this.props;

    return (
      <div className="formContainer">
        <h2>Redux Form</h2>

        <form onSubmit={handleSubmit} className="reduxForm">
          <div class="form-group">
            <Field
              type="text"
              component={renderField}
              name="name"
              className="form-control shadow-none"
              label="Name"
              id="name"
            />
          </div>
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
          <div class="form-check">
            <Field
              type="checkbox"
              component={renderField}
              name="rememberMe"
              className="form-check-input shadow-none"
              label="Remember Me"
              id="rememberMe"
            />
          </div>
          <br></br>

          <div className="row">
            <div className="col-md-10">
              <button
                type="submit"
                class="btn btn-primary shadow-none"
                disabled={pristine || submitting}
              >
                {flashEdit ? "Update" : "Submit"}
              </button>
            </div>
            <div className="col-md-2">
              {flashEdit ? (
                <div className="delete-icon">
                  <span>
                    <InplaceConfirm delete={deleteUser} />
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: props.initialValues // retrieve name from redux store
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "ReduxForm", // a unique identifier for this form
    enableReinitialize: true,
    validate: validateReduxForm
  })(ReduxForm)
);
