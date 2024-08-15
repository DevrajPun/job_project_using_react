import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    country: "",
    city: "",
    location: "",
    fixedSalary: "",
    salaryFrom: "",
    salaryTo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/jobInsert", formData, {
        withCredentials: true, // Include cookies (for token)
      });

      if (response.status === 201) {
        alert("Job posted successfully");
        // Reset form fields
        setFormData({
          title: "",
          desc: "",
          category: "",
          country: "",
          city: "",
          location: "",
          fixedSalary: "",
          salaryFrom: "",
          salaryTo: "",
        });
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job");
    }
  };

  return (
    <>
      <div className="section">
        <div className="col-5 mx-auto">
          <br />
          <h4 className="text-center">Add Job Details</h4>
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="form-control"
            />
            <br />
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Job Description"
              className="form-control"
            />
            <br />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="form-control"
            />
            <br />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="form-control"
            />
            <br />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="form-control"
            />
            <br />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="form-control"
            />
            <br />
            <input
              type="number"
              name="fixedSalary"
              value={formData.fixedSalary}
              onChange={handleChange}
              placeholder="Fixed Salary"
              className="form-control"
            />
            <br />
            <input
              type="number"
              name="salaryFrom"
              value={formData.salaryFrom}
              onChange={handleChange}
              placeholder="Salary From"
              className="form-control"
            />
            <br />
            <input
              type="number"
              name="salaryTo"
              value={formData.salaryTo}
              onChange={handleChange}
              placeholder="Salary To"
              className="form-control"
            />
            <br />
            <br />
            <button className="btn btn-success col-12" type="submit">
              Post Job
            </button>
          </form>
          <br />
          <Link to="/job/details">For all Jobs click here</Link>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default PostJob;
