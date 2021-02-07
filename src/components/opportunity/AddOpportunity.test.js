import React from "react";
import ReactDOM from "react-dom";
import AddOpportunity from "./AddOpportunity";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddOpportunity />, div);
  ReactDOM.unmountComponentAtNode(div);
});
