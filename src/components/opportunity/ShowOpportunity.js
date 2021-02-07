import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_SAVED_OPPORTUNITY = gql`
  query savedOpportunity($savedOpportunityId: String) {
    savedOpportunity(id: $savedOpportunityId) {
      _id
      id_user
      id_opportunity
      comment
    }
  }
`;

const DELETE_SAVED_OPPORTUNITY = gql`
  mutation removeSavedOpportunity($id: String!) {
    removeSavedOpportunity(id: $id) {
      _id
    }
  }
`;

class ShowOpportunity extends Component {
  render() {
    return (
      <Query
        pollInterval={500}
        query={GET_SAVED_OPPORTUNITY}
        variables={{ savedOpportunityId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>
                    <Link to="/">Saved Opportunities List</Link>
                  </h4>
                  <h3 className="panel-title">{data.savedOpportunity.title}</h3>
                </div>
                <div className="panel-body">
                  <dl>
                    <dt>ID User:</dt>
                    <dd>{data.savedOpportunity.id_user}</dd>
                    <dt>ID Opportunity:</dt>
                    <dd>{data.savedOpportunity.id_opportunity}</dd>
                    <dt>Comentario:</dt>
                    <dd>{data.savedOpportunity.comment}</dd>
                  </dl>
                  <Mutation
                    mutation={DELETE_SAVED_OPPORTUNITY}
                    key={data.savedOpportunity._id}
                    onCompleted={() => this.props.history.push("/list")}
                  >
                    {(removeSavedOpportunity, { loading, error }) => (
                      <div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            removeSavedOpportunity({ variables: { id: data.savedOpportunity._id } });
                          }}
                        >
                          <Link
                            to={`/edit/${data.savedOpportunity._id}`}
                            className="btn btn-success"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <button type="submit" className="btn btn-danger">
                            Delete
                          </button>
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again</p>}
                      </div>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ShowOpportunity;
