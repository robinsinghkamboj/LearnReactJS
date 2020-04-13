export const validateReduxForm = values => {
  const errors = {};

  if (!values.name && values.name == "") {
    errors.name = "*Name is required.";
  }

  if (!values.email && values.email == "") {
    errors.email = "*Email is required.";
  }

  if (!values.password && values.password == "") {
    errors.password = "*Password is required.";
  }

  return errors;
};