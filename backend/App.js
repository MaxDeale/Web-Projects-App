// initialising express and file system variables
const express = require("express");
const fileSystem = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// using the public directory to serve static files
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.send("HOME PAGE");
});

// show projects
app.get("/api", function(req, res) {
  fileSystem.readFile("./src/webProjects.json", function(err, data) {
    if (err) throw err;
    // reading projects json file from disk and sending via a response
    let projects = JSON.parse(data);
    res.send(projects);
  });
});

// add project
app.post("/api", function(req, res) {
  // get arrray of json objects from webprojects file and save to variable
  fileSystem.readFile("./src/webProjects.json", function(err, projects) {
    if (err) {
      console.error(err);
    } else {
      let currentProjects = JSON.parse(projects);
      // get json stringify of query and save to variable
      let currentQuery = req.body;
      // push new project into json array variable
      currentProjects.push(currentQuery);
      currentProjects = JSON.stringify(currentProjects);
      console.log(req.body);
      // write file with the new variable
      fileSystem.writeFile("./src/webProjects.json", currentProjects, function(
        err
      ) {
        if (err) {
          console.error(err);
          res.redirect("/api");
        } else {
          res.send("Web Projects Updated Successfully.");
          res.status(201).json({
            status: "success"
          });
        }
      });
    }
  });
});

// delete project
app.delete("/api/:id", function(req, res) {
  fileSystem.readFile("./src/webProjects.json", function(err, projects) {
    if (err) {
      console.error(err);
      res.redirect("/api");
    } else {
      // get array of projects
      let currentProjects = JSON.parse(projects);
      // get json stringify of query and save to variable
      let currentQuery = req.params.id;
      currentQuery = Number(currentQuery);
      // console.log(currentProjects)
      // delete specific project
      currentProjects.splice(currentQuery - 1, 1);
      console.log(currentProjects);
      currentProjects = JSON.stringify(currentProjects);
      fileSystem.writeFile("./src/webProjects.json", currentProjects, function(
        err
      ) {
        if (err) {
          console.error(err);
          res.redirect("/api");
        } else {
          res.send("Web Project Deleted Successfully.");
          res.status(201).json({
            status: "success"
          });
        }
      });
    }
  });
});

// Edit Project

app.put("/api/:id", function(req, res) {
  // get specific project out via title in params
  fileSystem.readFile("./src/webProjects.json", function(err, projects) {
    if (err) {
      console.error(err);
      res.redirect("/api");
    } else {
      let currentProjects = JSON.parse(projects);
      const id = req.params.id;
      // change the new project to the request body
      let newProject = Object.assign(
        {
          id: id
        },
        req.body
      );
      // create new array with the updated project
      let updatedProjects = [];
      currentProjects.forEach(oldProject => {
        if (oldProject.id == id) {
          // push changed project back into projects Array
          updatedProjects.push(newProject);
        } else {
          updatedProjects.push(oldProject);
        }
      });
      currentProjects = updatedProjects;
      currentProjects = JSON.stringify(currentProjects);
      console.log(updatedProjects);
      // write new file to json
      fileSystem.writeFile("./src/webProjects.json", currentProjects, function(
        err
      ) {
        if (err) {
          console.error(err);
          res.redirect("/api");
        } else {
          res.send("Web Project Updated Successfully.");
          res.status(201).json({
            status: "success"
          });
        }
      });
    }
  });
});

// making the server listen in port 8080 using a variable
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
