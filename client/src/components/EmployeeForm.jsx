/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router";

// UI
import { useForm } from "react-hook-form";
import { Label, FormGroup, Button } from "reactstrap";

const EmployeeForm = props => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    props.callback(values);
  };
  const { existingEmployee } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {existingEmployee._id && (
        <input
          name="_id"
          ref={register({
            required: "Required"
          })}
          className="form-control"
          disabled
          value={existingEmployee._id}
          hidden
          readOnly
        />
      )}
      <FormGroup>
        <Label for="exampleEmail" className="required">
          Email
        </Label>
        <input
          name="email"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address"
            }
          })}
          className="form-control"
          disabled={existingEmployee.email}
          defaultValue={existingEmployee.email}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </FormGroup>
      <FormGroup>
        <Label for="firstname" className="required">
          Firstname
        </Label>
        <input
          name="firstname"
          defaultValue={existingEmployee.firstname}
          ref={register({
            required: "Required",
            minLength: {
              value: 3,
              message: "Must be at least 3 characters long"
            },
            maxLength: {
              value: 20,
              message: "Must be under 20 characters long"
            },
            pattern: {
              value: /^[A-Za-z \\-]+$/i,
              message: "No special characters or numbers"
            }
          })}
          className="form-control"
        />
        {errors.firstname && (
          <p className="text-danger">{errors.firstname.message} </p>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="lastname" className="required">
          Lastname
        </Label>
        <input
          name="lastname"
          defaultValue={existingEmployee.lastname}
          ref={register({
            required: "Required",
            minLength: {
              value: 3,
              message: "Must be at least 2 characters long"
            },
            maxLength: {
              value: 20,
              message: "Must be under 30 characters long"
            },
            pattern: {
              value: /^[A-Za-z \\-]+$/i,
              message: "No special characters or numbers"
            }
          })}
          className="form-control"
        />
        {errors.lastname && (
          <p className="text-danger">{errors.lastname.message} </p>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="department" className="required">
          Department
        </Label>
        <select
          ref={register}
          name="department"
          defaultValue={existingEmployee.department}
          className="form-control"
        >
          <option value="Engineers">Engineers</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>
      </FormGroup>
      <Button color="secondary" onClick={() => props.history.push("/")}>
        Cancel
      </Button>
      <Button type="submit" color="primary" style={{ float: "right" }}>
        Save
      </Button>
    </form>
  );
};

EmployeeForm.defaultProps = {
  existingEmployee: {}
};

EmployeeForm.propTypes = {
  callback: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  existingEmployee: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};
export default withRouter(EmployeeForm);
