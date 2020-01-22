import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export class ProjectForm extends Component {
  render() {
    return (
      <div>
        <h4>Add a new project:</h4>
        <Form className="projectForm">
          <Form.Group controlId="projectName">
            <Form.Label>Project Name:</Form.Label>
            <Form.Control
              type="projectName"
              placeholder="Enter the name of the project"
            />
          </Form.Group>
          <Form.Group controlId="projectDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="projectDescription"
              placeholder="Enter project description"
            />
          </Form.Group>
          <Form.Group controlId="projectURL">
            <Form.Label>URL:</Form.Label>
            <Form.Control type="projectURL" placeholder="Enter project URL" />
          </Form.Group>
          <button className="btn-submit" type="submit">
            Sumbit
          </button>
        </Form>
      </div>
    );
  }
}

export default ProjectForm;
