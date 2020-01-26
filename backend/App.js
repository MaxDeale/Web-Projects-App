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

app.get("/", function (req, res) {
  res.send("HOME PAGE");
});

let projects = JSON.parse((fileSystem.readFileSync("./src/webProjects.json")));
// show projects
app.get("/api", function (req, res) {
  fileSystem.readFile("./src/webProjects.json", function (err, data) {
    if (err) throw err;
    // reading projects json file from disk and sending via a response
    projects = JSON.parse(data);
    res.send(projects);
  });
});

// add project
app.post("/api", function (req, res) {
  // get arrray of json objects from webprojects file and save to variable
  fileSystem.readFile("./src/webProjects.json", function (err) {
    if (err) {
      console.error(err);
    } else {
      const newId = projects[projects.length - 1].id + 1;
      const newPost = Object.assign({
        id: newId
      }, req.body);
      console.log(newPost)
      // push new project into json array variable
      projects.push(newPost);
      projects = JSON.stringify(projects);
      console.log(req.body);
      // write file with the new variable
      fileSystem.writeFile("./src/webProjects.json", projects, function (
        err
      ) {
        if (err) {
          console.error(err);
        } else {

          res.send("Web Projects Updated Successfully.");

        }
      });
    }
  });
});

// delete project
app.delete("/api/:id", function (req, res) {
  fileSystem.readFile("./src/webProjects.json", function (err) {
    if (err) {
      console.error(err);
      res.redirect("/api");
    } else {

      // get json stringify of query and save to variable
      let currentQuery = req.params.id;
      currentQuery = Number(currentQuery);
      // console.log(currentProjects)
      // delete specific project
      projects.splice(currentQuery - 1, 1);
      console.log(projects);
      projects = JSON.stringify(projects);
      fileSystem.writeFile("./src/webProjects.json", projects, function (
        err
      ) {
        if (err) {
          console.error(err);
        } else {
          res.send("Web Project Deleted Successfully.");

        }
      });
    }
  });
});

// Edit Project


app.put("/api/id:", function (req, res) {
  // get specific project out via title in params
  fileSystem.readFile("./src/webProjects.json", function (err) {
    if (err) {
      console.error(err);
    } else {
      const id = req.params.id * 1;
      // change the new project to the request body
      const newId = content[projects.length - 1].id + 1;

      let newProject = Object.assign({
          id: newId
        },
        req.body
      );
      // create new array with the updated project
      let updatedProjects = [];
      projects.forEach(oldProject => {
        if (oldProject.id == id) {
          // push changed project back into projects Array
          updatedProjects.push(newProject);
        } else {
          updatedProjects.push(oldProject);
        }
      });
      projects = updatedProjects;
      projects = JSON.stringify(projects)
      console.log(updatedProjects);
      // write new file to json
      fileSystem.writeFile("./src/webProjects.json", projects, function (err) {
        if (err) {
          console.error(err)
        } else {
          res.send("Web Project Updated Successfully.");

        }
      })
    }
  });
});
// making the server listen in port 8080 using a variable
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});