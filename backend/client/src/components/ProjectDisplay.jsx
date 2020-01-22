import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

export class ProjectDisplay extends Component {
    state = {
        projects: []
    };

    componentDidMount() {
        axios.get("http://localhost:8080/api").then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({projects: res.data});
        });
    }

    render() {
        let projects = this.state.projects.map(project => {
            return (
                <tr key={
                    project.id
                }>
                    <td>{
                        project.id
                    }</td>
                    <td>{
                        project.title
                    }</td>
                    <td>{
                        project.description
                    }</td>
                    <td>{
                        project.url
                    }</td>

                    <td>
                        <i class="fas fa-edit fa-1.5x" id="editButton"></i>
                    </td>
                    <td>
                        <i class="fas fa-times fa-1.5x" id="deleteButton"></i>
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <div>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Project Name</th>
                                <th>Project Description</th>
                                <th>Project URL</th>
                                <th>Edit Project</th>
                                <th>Delete Project</th>
                            </tr>
                        </thead>
                        <tbody>{projects}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default ProjectDisplay;
