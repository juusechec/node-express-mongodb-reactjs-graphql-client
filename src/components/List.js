import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

class List extends Component {

  render() {
    return (
      <Query pollInterval={500} query={GET_SAVED_OPPORTUNITIES}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
    
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Saved Opportunities
                  </h3>
                  {/* <h4><Link to="/create">Add</Link></h4> */}
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th></th>
                        <th>User ID</th>
                        <th>Opportunity ID</th>
                        <th>Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.savedOpportunities.map((savedOpportunity, index) => (
                        <tr key={index}>
                          <td><Link to={`/show/${savedOpportunity._id}`}>See</Link></td>
                          <td>{savedOpportunity.id_user}</td>
                          <td>{savedOpportunity.id_opportunity}</td>
                          <td>{savedOpportunity.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default List;
