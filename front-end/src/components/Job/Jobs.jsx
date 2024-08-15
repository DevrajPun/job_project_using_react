import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]); // State to hold the data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Function to fetch data from the API
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/viewJobs", {
          withCredentials: true, // Include cookies if needed (e.g., for authentication)
        });
        setJobs(response.data); // Set the retrieved data in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchJobs(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <section style={{ background: "#0066b2" }} className="py-5">
        <br />
        <h3 className="text-center text-white">Get a job with jobportal</h3>
        <br />
        <div className="col-10 mx-auto">
          <div className="row">
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Job Type..."
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Location..."
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Desired Salary..."
              />
            </div>
            <div className="col-3">
              <button
                style={{ background: "#6CB4EE" }}
                className="btn col-12 text-white"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
      </section>

      <section className="px-4">
        <div className="job-list">
          <h4 className="text-center py-4">Job Listings</h4>
          {jobs.length > 0 ? (
            <div className="row">
              {jobs.map((job) => (
                <div key={job.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title text-center">{job.title}</h5>
                      <p className="card-text">Job Description: {job.desc}</p>
                      <p className="card-text">Job Category: {job.category}</p>
                      <p className="card-text">
                        Location: {job.city}, {job.country}
                      </p>
                      <p className="card-text">
                        Salary:{" "}
                        {job.fixedSalary ||
                          `${job.salaryFrom} - ${job.salaryTo}`}
                      </p>
                      <Link to="/job">more...</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center" style={{ textDecoration: "none" }}>
              No jobs available
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Jobs;
