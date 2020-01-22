import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectForm from "./components/ProjectForm";
import ProjectDisplay from "./components/ProjectDisplay";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div>
          <ProjectForm />
        </div>
        <div>
          <ProjectDisplay />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
