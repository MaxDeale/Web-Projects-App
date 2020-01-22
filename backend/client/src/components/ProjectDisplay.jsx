import React from "react";
import Table from "react-bootstrap/Table";

const ProjectDisplay = () => {
  return (
    <div>
      <Table striped bordered hover variant="dark">
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
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>naas</td>
            <td>
              <i id="editButton" class="fas fa-edit fa-1.5x"></i>
            </td>
            <td>
              <i id = "deleteButton" class="fas fa-times fa-1.5x"></i>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectDisplay;
