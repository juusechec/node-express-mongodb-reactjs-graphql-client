import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import "./Biosearch.css";

class Biosearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bio: {},
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getBioData(username) {
    const apiUrl = `${config.bioEndpoint}?username=${username}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("BIO DATA", data);
        if (!data.person) {
          this.setState({
            error: "That bio isn't exists!",
            isLoaded: false,
          });
        } else {
          sessionStorage.setItem("bio", JSON.stringify(data));
          this.setState({
            isLoaded: true,
            bio: data,
            error: null,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          "Something was wrong with service, please contact with the admin."
        );
      });
  }

  handleSubmit(event) {
    console.log("A name was submitted: " + this.state.value);
    event.preventDefault();
    this.getBioData(this.state.value);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">What's your bio?</h3>
            </div>
            <div className="panel-body">
              {this.state.error && (
                <label>
                  <div>Error: {this.state.error}</div>
                </label>
              )}
              <form onSubmit={this.handleSubmit}>
                <label>
                  BioId:
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">That's your bio</h3>
              <h4>Bio</h4>
            </div>
            <div className="panel-body">
              <ul>
                <li>Fullname: {this.state.bio.person.name}</li>
                <li>Summary: {this.state.bio.person.summaryOfBio}</li>
              </ul>
              <Link
                to={`/opportunities/${this.state.value}`}
                className="btn btn-success"
              >
                See job opportunities!
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Biosearch;
