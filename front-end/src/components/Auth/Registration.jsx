import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../main";

function Registration() {
  const users = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const [data, setData] = useState(users);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const navigate = useNavigate();

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/insert", data);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-left",
          message: "Register Success",
        });
        setData(users);
        setIsAuthorized(true);
        navigate("/home"); // Redirect to home page after successful registration
      } else {
        console.error("Failed to insert data");
      }
    } catch (error) {
      console.error("Error inserting data", error);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/home"} />;
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="shadow-lg rounded p-5">
              <h1 className="text-center">Registration</h1>
              <form onSubmit={submitData} className="mt-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={data.name}
                    onChange={inputHandler}
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={data.email}
                    onChange={inputHandler}
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={data.phone}
                    onChange={inputHandler}
                    name="phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={data.password}
                    onChange={inputHandler}
                    name="password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm your password"
                    value={data.confirmPassword}
                    onChange={inputHandler}
                    name="confirmPassword"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Role"
                    value={data.role}
                    onChange={inputHandler}
                    name="role"
                  />
                </div>
                <button type="submit" className="btn btn-info w-60 mx-auto">
                  Submit
                </button>
              </form>
              <br />
              <p className="uppercase">
                Already have an account
                <span>
                  <Link to="/">Login</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default Registration;
