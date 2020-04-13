import React from "react";

const renderField = ({
  input,
  label,
  className,
  required,
  disabled,
  type,
  name,
  id,
  meta: { touched, error, warning }
}) => (
  <div>
    {type == "checkbox" ? (
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className={className}
          required={required}
          disabled={disabled}
          name={name}
          id={id}
        />{" "}<label htmlFor={id}>{label}</label>
        {touched &&
          ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-danger">{warning}</span>))}
      </div>
    ) : (
      <div>
        <label htmlFor={id}>{label}</label>
        <div>
          <input
            {...input}
            placeholder={label}
            type={type}
            className={className}
            required={required}
            disabled={disabled}
            name={name}
            id={id}
          />
          {touched &&
            ((error && <span className="text-danger">{error}</span>) ||
              (warning && <span className="text-danger">{warning}</span>))}
        </div>
      </div>
    )}
  </div>
);

export default renderField;
