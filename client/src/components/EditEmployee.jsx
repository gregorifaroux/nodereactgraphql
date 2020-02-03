import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

// API
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// UI
import { toast } from "react-toastify";
import EmployeeForm from "./EmployeeForm";

const USER_UPDATE_ONE = gql`
  mutation UpdateUser(
    $_id: MongoID!
    $firstname: String!
    $lastname: String!
    $email: String!
    $department: EnumUserDepartment!
  ) {
    userUpdateOne(
      filter: { _id: $_id }
      record: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        department: $department
      }
    ) {
      record {
        _id
        email
        firstname
        lastname
      }
    }
  }
`;
const EditEmployee = props => {
  const [userUpdateOne, { loading }] = useMutation(USER_UPDATE_ONE);
  const { setLoading } = props;

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const onSubmit = async values => {
    try {
      const { _id, firstname, lastname, email, department } = values;
      const response = await userUpdateOne({
        variables: { _id, firstname, lastname, email, department }
      });
      toast.success(
        `Employee ${response.data.userUpdateOne.record.firstname} updated !`
      );
      props.history.push("/");
    } catch (e) {
      toast.error(`Error updating the employee  ${e.message}`);
      props.setLoading(false);
    }
  };

  const { location } = props;
  if (!location.state || !location.state.existingEmployee) {
    return <Redirect to="/" />;
  }
  return (
    <div className="content container">
      <div className="docs-example">
        <EmployeeForm
          callback={onSubmit}
          existingEmployee={location.state.existingEmployee}
        />
      </div>
    </div>
  );
};

EditEmployee.propTypes = {
  setLoading: PropTypes.func.isRequired,
  location: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};
export default withRouter(EditEmployee);
