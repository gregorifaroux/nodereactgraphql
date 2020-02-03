/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// Components
import EmployeeListTable from "./EmployeeListTable";

const USER_PAGINATION = gql`
  query UserPagination(
    $page: Int!
    $perPage: Int!
    $filter: FilterFindManyUserInput!
    $sort: SortFindManyUserInput!
  ) {
    userPagination(
      page: $page
      perPage: $perPage
      filter: $filter
      sort: $sort
    ) {
      count
      items {
        firstname
        lastname
        email
        department
        _id
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const EmployeeList = props => {
  const [pageLocation, setPageLocation] = useState({
    page: 0,
    sizePerPage: 10,
    filter: {},
    sort: "FIRSTNAME_ASC"
  });
  const { loading, error, data } = useQuery(USER_PAGINATION, {
    fetchPolicy: "network-only",
    variables: {
      page: pageLocation.page,
      perPage: pageLocation.sizePerPage,
      filter: pageLocation.filter,
      sort: pageLocation.sort
    }
  });
  const { setLoading } = props;

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const onTableChange = (
    _type,
    { page, sizePerPage, searchText, sortField, sortOrder }
  ) => {
    let filter = {};
    if (searchText) {
      filter = { search: searchText };
    }
    const sort = !sortField
      ? "FIRSTNAME_ASC"
      : `${sortField.toUpperCase()}_${sortOrder.toUpperCase()}`;

    setPageLocation({ page, sizePerPage, filter, sort });
  };

  if (error) return <p>Error : {error.message}</p>;
  const { sizePerPage, page } = pageLocation;

  return (
    <div className="content container">
      {data && (
        <EmployeeListTable
          data={data.userPagination}
          page={page}
          sizePerPage={sizePerPage}
          onTableChange={onTableChange}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

EmployeeList.propTypes = {
  setLoading: PropTypes.func.isRequired
};

export default EmployeeList;

// const USERS = gql`
//   {
//     userMany {
//       firstname
//       lastname
//       email
//       department
//       _id
//     }
//   }
// `;
