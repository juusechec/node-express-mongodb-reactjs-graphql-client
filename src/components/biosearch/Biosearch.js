import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import Modal from "../modal/Modal";
import "./Biosearch.css";

class Biosearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bio: {},
      value: "",
      modal: false,
      modalTitle: "",
      modalSubtitle: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  getBioData(username) {
    this.modalOpen("", "Loading Bio...");
    const apiUrl = `${config.bioEndpoint}?username=${username}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.modalClose();
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
        this.modalOpen(
          "Error",
          "Please report the error to jorgenator2@yahoo.es"
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

  modalOpen(modalTitle, modalSubtitle) {
    this.setState({
      modal: true,
      modalTitle: modalTitle,
      modalSubtitle: modalSubtitle,
    });
  }

  modalClose() {
    this.setState({
      modal: false,
    });
  }

  render() {
    const customModal = (
      <Modal show={this.state.modal}>
        <h2>{this.state.modalTitle}</h2>
        <p>{this.state.modalSubtitle}</p>
        {this.state.modalTitle !== "" && (
          <button className="btn btn-success" onClick={this.modalClose}>
            Close
          </button>
        )}
      </Modal>
    );
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
                  <div className="error">Error: {this.state.error}</div>
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
          {customModal}
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
                <li>
                  Summary:{" "}
                  {this.state.bio.person.summaryOfBio ||
                    this.state.bio.person.professionalHeadline}
                </li>
              </ul>
              <Link
                to={`/opportunities/${this.state.value}`}
                className="btn btn-success"
              >
                See job opportunities!
              </Link>
            </div>
          </div>
          {customModal}
        </div>
      );
    }
  }
}

export default Biosearch;
