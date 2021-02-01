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

const UPDATE_SAVED_OPPORTUNITY = gql`
  mutation updateSavedOpportunity(
    $id: String!
    $id_user: String!
    $id_opportunity: String!
    $comment: String!
  ) {
    updateSavedOpportunity(
      id: $id
      id_user: $id_user
      id_opportunity: $id_opportunity
      comment: $comment
    ) {
      updated_date
    }
  }
`;

class Edit extends Component {
  render() {
    let id_user, id_opportunity, comment;
    return (
      <Query
        query={GET_SAVED_OPPORTUNITY}
        variables={{ savedOpportunityId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation
              mutation={UPDATE_SAVED_OPPORTUNITY}
              key={data.savedOpportunity._id}
              onCompleted={() => this.props.history.push(`/list`)}
            >
              {(updateBook, { loading, error }) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">EDIT SAVED OPPORTUNITY</h3>
                    </div>
                    <div className="panel-body">
                      <h4>
                        <Link to="/list" className="btn btn-primary">
                          Saved Opportunities List
                        </Link>
                      </h4>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateBook({
                            variables: {
                              id: data.savedOpportunity._id,
                              id_user: id_user.value,
                              id_opportunity: id_opportunity.value,
                              comment: comment.value,
                            },
                          });
                          id_user.value = "";
                          id_opportunity.value = "";
                          comment.value = "";
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="id_user">ID USER:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="id_user"
                            ref={(node) => {
                              id_user = node;
                            }}
                            placeholder="ID_USER"
                            defaultValue={data.savedOpportunity.id_user}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="title">ID Opportunity:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="id_opportunity"
                            ref={(node) => {
                              id_opportunity = node;
                            }}
                            placeholder="ID_OPPORTUNITY"
                            defaultValue={data.savedOpportunity.id_opportunity}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="comment">Comment:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="comment"
                            ref={(node) => {
                              comment = node;
                            }}
                            placeholder="Author"
                            defaultValue={data.savedOpportunity.comment}
                          />
                        </div>
                        <button type="submit" className="btn btn-success">
                          Submit
                        </button>
                      </form>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Edit;
