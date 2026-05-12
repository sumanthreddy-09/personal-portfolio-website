import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    projects: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("resumeData", JSON.stringify(formData));
    navigate("/preview");
  };

  return (
    <div className="form-container">
      <h1>Resume Form</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <textarea name="skills" placeholder="Skills" onChange={handleChange} />
        <textarea name="education" placeholder="Education" onChange={handleChange} />
        <textarea name="projects" placeholder="Projects" onChange={handleChange} />

        <button className="btn" type="submit">Generate Resume</button>
      </form>
    </div>
  );
}

export default ResumeForm;