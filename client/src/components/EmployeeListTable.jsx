/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";

// UI
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ReactTooltip from "react-tooltip";

import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";

// Components
import { withRouter } from "react-router";

const { SearchBar, ClearSearchButton } = Search;

const EmployeeListTable = props => {
  const { history } = props;
  const { setLoading } = props;

  function rankFormatter(_cell, row) {
    return (
      <div>
        <Button
          size="sm"
          outline
          color="danger"
          onClick={() =>
            props.history.push({
              pathname: "/delete",
              state: {
                existingEmployee: row,
                setLoading
              }
            })
          }
          data-tip
          data-for="tooltipDelete"
        >
          <FaTrash />
        </Button>
        <ReactTooltip id="tooltipDelete" place="bottom" type="error">
          <span>Delete</span>
        </ReactTooltip>{" "}
        <Button
          size="sm"
          outline
          color="primary"
          onClick={() =>
            props.history.push({
              pathname: "/edit",
              state: {
                existingEmployee: row,
                setLoading
              }
            })
          }
          data-tip
          data-for="tooltipEdit"
        >
          <FaEdit />
        </Button>
        <ReactTooltip id="tooltipEdit" place="bottom" type="info">
          <span>Edit Information</span>
        </ReactTooltip>
      </div>
    );
  }
  const columns = [
    {
      text: "Firstname",
      dataField: "firstname",
      sort: true
    },
    {
      text: "Lastname",
      dataField: "lastname",
      sort: true
    },
    {
      text: "Department",
      dataField: "department",
      sort: true
    },
    {
      dataField: "_id",
      text: "Actions",
      sort: false,
      formatter: rankFormatter,
      headerAttrs: { width: 100 }
    }
  ];
  const { sizePerPage, page, data, onTableChange } = props;

  return (
    <div className="content container">
      {data && (
        <ToolkitProvider
          keyField="_id"
          data={data.items}
          columns={columns}
          search
        >
          {toolkitprops => (
            <div>
              <SearchBar {...toolkitprops.searchProps} />
              <ClearSearchButton {...toolkitprops.searchProps} />
              <Button
                size="sm"
                outline
                style={{ float: "right" }}
                color="success"
                onClick={() =>
                  history.push({
                    pathname: "/add",
                    state: { setLoading }
                  })
                }
                data-tip
                data-for="tooltipAdd"
              >
                <FaPlus />
              </Button>
              <ReactTooltip id="tooltipAdd" place="bottom" type="success">
                <span>Add a new employee</span>
              </ReactTooltip>
              <BootstrapTable
                // eslint-disable-next-line react/prop-types
                {...toolkitprops.baseProps}
                bootstrap4
                remote
                condensed
                striped
                bordered={false}
                pagination={paginationFactory({
                  page,
                  sizePerPage,
                  sizePerPageList: [
                    {
                      text: "10",
                      value: 10
                    },
                    {
                      text: "20",
                      value: 20
                    },
                    {
                      text: "50",
                      value: 50
                    }
                  ],
                  totalSize: data.count
                })}
                onTableChange={onTableChange}
              />
            </div>
          )}
        </ToolkitProvider>
      )}
      <code> Total: {data && data.count} </code>
    </div>
  );
};

EmployeeListTable.propTypes = {
  setLoading: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
  data: PropTypes.shape(
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired
      })
    ),
    PropTypes.number.isRequired
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(EmployeeListTable);
