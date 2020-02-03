import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

// API
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// UI
import { Jumbotron, Button } from "reactstrap";
import { toast } from "react-toastify";

const USER_REMOVE_ONE = gql`
  mutation RemoveUser($_id: MongoID!) {
    userRemoveOne(filter: { _id: $_id }) {
      record {
        _id
        email
        firstname
        lastname
      }
    }
  }
`;
const DeleteEmployee = props => {
  const [userRemoveOne, { loading }] = useMutation(USER_REMOVE_ONE);

  const { setLoading } = props;

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const { location } = props;
  if (!location.state || !location.state.existingEmployee) {
    return <Redirect to="/" />;
  }

  const onDelete = async values => {
    try {
      const { _id } = values;
      const response = await userRemoveOne({
        // eslint-disable-next-line no-underscore-dangle
        variables: { _id }
      });
      props.history.push("/");
      toast.success(
        `Employee ${response.data.userRemoveOne.record.firstname} deleted !`
      );
    } catch (e) {
      toast.error(`Error deleting the employee  ${e.message}`);
      props.setLoading(false);
    }
  };

  const { existingEmployee } = location.state;
  return (
    <div className="content container">
      <Jumbotron>
        <h1 className="h1">
          Delete the employee{" "}
          <strong className="text-secondary">
            {existingEmployee.firstname} {existingEmployee.lastname}{" "}
          </strong>
          ?{" "}
        </h1>
        <p className="lead">{existingEmployee.department}</p>
        <hr className="my-2" />
        <p>{existingEmployee.email}</p>
        <p className="lead">
          <Button color="secondary" onClick={() => props.history.push("/")}>
            Cancel
          </Button>
          <Button
            color="danger"
            style={{ float: "right" }}
            onClick={() => onDelete(existingEmployee)}
          >
            Delete
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

DeleteEmployee.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
  ).isRequired,
  setLoading: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(DeleteEmployee);
