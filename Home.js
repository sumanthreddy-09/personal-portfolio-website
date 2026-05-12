import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>AI Resume Builder</h1>
      <p>Create professional resumes easily with a smart resume generator.</p>

      <Link to="/form">
        <button className="btn">Build Resume</button>
      </Link>
    </div>
  );
}

export default Home;