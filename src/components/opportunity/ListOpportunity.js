import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ListOpportunity.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_SAVED_OPPORTUNITIES = gql`
  {
    savedOpportunities {
      _id
      id_user
      id_opportunity
      comment
    }
  }
`;

class ListOpportunity extends Component {
  render() {
    return (
      <Query pollInterval={500} query={GET_SAVED_OPPORTUNITIES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Saved Opportunities</h3>
                  {/* <h4><Link to="/create">Add</Link></h4> */}
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Opportunity ID</th>
                        <th>Comment</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.savedOpportunities.map(
                        (savedOpportunity, index) => (
                          <tr key={index}>
                            <td>{savedOpportunity.id_user}</td>
                            <td>{savedOpportunity.id_opportunity}</td>
                            <td>{savedOpportunity.comment}</td>
                            <td>
                              <Link
                                className="btn btn-primary"
                                to={`/show/${savedOpportunity._id}`}
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <Link to="/" className="btn btn-success">
                  Query other Bio
                </Link>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ListOpportunity;
