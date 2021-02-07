import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import config from "../../config";
import "./AddOpportunity.css";
import { Link } from "react-router-dom";

const ADD_SAVED_OPPORTUNITY = gql`
  mutation AddSavedOpportunity(
    $id_user: String!
    $id_opportunity: String!
    $comment: String!
  ) {
    addSavedOpportunity(
      id_user: $id_user
      id_opportunity: $id_opportunity
      comment: $comment
    ) {
      _id
    }
  }
`;

class AddOpportunity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      oportunities: [],
      criteria: [],
      value: "",
      userId: "",
    };
  }

  async componentDidMount() {
    // console.log("styles", styles);
    const bio = JSON.parse(sessionStorage.getItem("bio"));
    this.setState({
      userId: bio.person.publicId
    });
    const summaryOfBio = bio.person.summaryOfBio;
    const keywords = await this.getKeywords(summaryOfBio);
    console.log("keywords", keywords);
    this.getOpportunities(keywords.keywords);
  }

  getKeywords(summaryOfBio) {
    const url = config.extractEndpoint;
    const body = {
      data: summaryOfBio,
      word_qty: 10,
    };
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  }

  getOpportunities(keywords) {
    const apiUrl = `${config.postEndpoint}/opportunities/_search/?currency=USD%24&page=0&periodicity=hourly&lang=en&size=20&aggregate=false&offset=0`;
    const criteria = [];
    for (let index = 0; index < keywords.length; index++) {
      const word = keywords[index].parsed_value;
      criteria.push({
        "skill/role": {
          text: word,
          experience: "potential-to-develop",
        },
      });
    }
    console.log("criteria", criteria);
    const body = {
      or: criteria,
    };
    console.log("getOpportunities api url", apiUrl);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("OPPORTUNITIES DATA", data);
        if (!data.results) {
          this.setState({
            error: "That link isn't exists!",
            isLoaded: false,
          });
        } else {
          this.setState({
            isLoaded: true,
            oportunities: data.results,
            criteria: criteria,
            error: null,
          });
        }
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Cargando...</h3>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Mutation
          mutation={ADD_SAVED_OPPORTUNITY}
          onCompleted={() => {
            console.log("OK!!!!!!");
            // this.props.history.push("/")
          }}
        >
          {(addSavedOpportunity, { loading, error }) => (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">That's your work selection</h3>
                  <h4>Opportunities</h4>
                </div>
                <div className="panel-body">
                  <ul>
                    {this.state.oportunities.map((opportunity, index) => (
                      <div key={`opportunity${index}`}>
                        <a
                          href={`https://torre.co/jobs/${opportunity.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text"
                        >
                          <li>{opportunity.objective}</li>
                        </a>
                        <div
                          className="star"
                          onClick={() => {
                            addSavedOpportunity({
                              variables: {
                                id_user: this.state.userId,
                                id_opportunity: opportunity.id,
                                comment: opportunity.objective,
                              },
                            });
                            alert("Saved opportunity!");
                          }}
                        ></div>
                      </div>
                    ))}
                  </ul>
                  <br />
                  <h4>Some keywords detected for you bio</h4>
                  <ul>
                    {this.state.criteria.map((crit, index) => (
                      <li key={`criteria${index}`}>
                        {crit["skill/role"].text}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/list"
                    className="btn btn-success"
                  >
                    See saved opportunities
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Mutation>
      );
    }
  }
}

export default AddOpportunity;
