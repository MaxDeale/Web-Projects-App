import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Footer from "./components/Footer";
import Header from "./components/Header";

class App extends Component {
  state = {
    projects: [],
    newProjectModal: false,
    editProjectModal: false,
    newProjectData: {
      title: "",
      description: "",
      URL: ""
    },
    editProjectData: {
      id: "",
      title: "",
      description: "",
      URL: ""
    }
  };

  // fetching the json projects data from the /api endpoint in componentDidMount method using proxy
  componentDidMount() {
    axios.get("/api").then(res => {
      // console.log(res);
      // console.log(res.data);
      this.setState({ projects: res.data });
    });
  }

  // sets the form modal to the opposite of what it currently is in display in order to toggle
  toggleNewProjectModal() {
    this.setState({
      newProjectModal: !this.state.newProjectModal
    });
  }

  toggleEditProjectModal() {
    this.setState({
      editProjectModal: !this.state.editProjectModal
    });
  }

  // add projects function, uses axios post request to api using form data from state
  addProject() {
    axios.post("/api", this.state.newProjectData).then(res => {
      let { projects } = this.state;
      projects.push(res.data);

      this.setState({
        projects,
        newProjectModal: false,
        // resetting the new project data back to empty strings for next project add
        newProjectData: {
          title: "",
          description: "",
          URL: ""
        }
      });
      // calling componentDidMount method in order to refresh the data from the api
      this.componentDidMount();
    });
  }

  // edit project function, takes info from form and and it to state in edit variable

  editProject(id, title, description, URL) {
    this.setState({
      editProjectData: {
        id,
        title,
        description,
        URL
      },
      editProjectModal: !this.state.editProjectModal
    });
  }

  // update project function, runs when update button is clicked - makes a put request to proxy api to update project with specific id and new info

  updateProject() {
    let { title, description, URL } = this.state.editProjectData;
    axios
      // adding the selected project id onto the put request URL
      .put("/api/" + this.state.editProjectData.id, {
        title,
        description,
        URL
      })
      .then(res => {
        this.componentDidMount();
        console.log(res.data);

        this.setState({
          editProjectModal: false,
          editProjectData: {
            title: "",
            description: "",
            URL: ""
          }
        });
      });
  }

  // delete project function, sends a delete request to api with the selected project id
  deleteProject(id) {
    axios.delete("/api/" + id).then(res => {
      this.componentDidMount();
    });
  }

  render() {
    // saving project from state to array and mapping over them to produce a new table row
    let projects = this.state.projects.map(project => {
      // returning a new table row for every time a project gets added
      return (
        <tr key={project.id}>
          <td>{project.id}</td>
          <td>{project.title}</td>
          <td>{project.description}</td>
          <td>{project.URL}</td>

          <td>
            <i
              onClick={this.editProject.bind(
                this,
                project.id,
                project.title,
                project.description,
                project.URL
              )}
              className="fas fa-edit fa-1.5x"
              id="editButton"
            ></i>
          </td>
          <td>
            <i
              onClick={this.deleteProject.bind(this, project.id)}
              className="fas fa-times fa-1.5x"
              id="deleteButton"
            ></i>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <Header />

        <div className="mainContainer">
          <Button
            id="addButton"
            color="primary"
            // binding the toggle modal function to the add new project button
            onClick={this.toggleNewProjectModal.bind(this)}
          >
            Add New Project
          </Button>
          {/* NEW PROJECT MODAL FORM */}
          <Modal
            isOpen={this.state.newProjectModal}
            toggle={this.toggleNewProjectModal.bind(this)}
          >
            <ModalHeader toggle={this.toggleNewProjectModal.bind(this)}>
              Add New Project
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.newProjectData.title}
                  // function to get data from inputs, sets the state to the form values
                  onChange={e => {
                    let { newProjectData } = this.state;
                    // setting the value of the input for title to state
                    newProjectData.title = e.target.value;

                    this.setState({ newProjectData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  id="description"
                  value={this.state.newProjectData.description}
                  onChange={e => {
                    let { newProjectData } = this.state;

                    newProjectData.description = e.target.value;

                    this.setState({ newProjectData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="URL">URL</Label>
                <Input
                  id="URL"
                  value={this.state.newProjectData.URL}
                  onChange={e => {
                    let { newProjectData } = this.state;

                    newProjectData.URL = e.target.value;

                    this.setState({ newProjectData });
                  }}
                ></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.addProject.bind(this)}>
                Add Project
              </Button>{" "}
              {/* cancel button for modal, sets modal state for open/close */}
              <Button
                color="danger"
                onClick={this.toggleNewProjectModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* EDIT PROJECT MODAL FORM */}

          <Modal
            isOpen={this.state.editProjectModal}
            toggle={this.toggleEditProjectModal.bind(this)}
          >
            <ModalHeader toggle={this.toggleEditProjectModal.bind(this)}>
              Edit Project
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.editProjectData.title}
                  // function to get data from inputs, sets the state to the form values
                  onChange={e => {
                    let { editProjectData } = this.state;
                    // setting the value of the input for title to state
                    editProjectData.title = e.target.value;

                    this.setState({ editProjectData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  id="description"
                  value={this.state.editProjectData.description}
                  onChange={e => {
                    let { editProjectData } = this.state;

                    editProjectData.description = e.target.value;

                    this.setState({ editProjectData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="URL">URL</Label>
                <Input
                  id="URL"
                  value={this.state.editProjectData.URL}
                  onChange={e => {
                    let { editProjectData } = this.state;

                    editProjectData.URL = e.target.value;

                    this.setState({ editProjectData });
                  }}
                ></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.updateProject.bind(this)}>
                Update Project
              </Button>{" "}
              {/* cancel button for modal, sets modal state for open/close */}
              <Button
                color="danger"
                onClick={this.toggleEditProjectModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Table className="projectTable" bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Project URL</th>
                <th>Edit Project</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{projects}</tbody>
          </Table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
