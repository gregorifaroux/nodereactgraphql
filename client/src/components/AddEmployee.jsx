import React, { useEffect } from "react";
import PropTypes from "prop-types";

// API
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// UI
import { toast } from "react-toastify";

// Components
import EmployeeForm from "./EmployeeForm";

const USER_CREATE_ONE = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $department: EnumUserDepartment!
  ) {
    userCreateOne(
      record: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        department: $department
      }
    ) {
      record {
        _id
        firstname
        lastname
      }
    }
  }
`;
const AddEmployee = props => {
  const [userCreateOne, { loading }] = useMutation(USER_CREATE_ONE);
  const { setLoading } = props;

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const onSubmit = async values => {
    const { firstname, lastname, email, department } = values;

    try {
      const response = await userCreateOne({
        variables: { firstname, lastname, email, department }
      });
      props.history.push("/");
      toast.success(
        `Employee ${response.data.userCreateOne.record.firstname} created !`
      );
    } catch (e) {
      console.log(JSON.stringify(e));
      let errorMessage = e.message;
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        errorMessage = e.graphQLErrors[0].message;
      } else if (e.networkError.result && e.networkError.result.errors[0]) {
        errorMessage = e.networkError.result.errors[0].message;
      }
      toast.error(`Error saving employee  ${errorMessage}`);
      props.setLoading(false);
    }
  };

  return (
    <div className="content container">
      <div className="docs-example">
        <EmployeeForm callback={onSubmit} />
      </div>
    </div>
  );
};

AddEmployee.propTypes = {
  setLoading: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default AddEmployee;
