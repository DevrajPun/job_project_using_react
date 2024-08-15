import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitData = async (e) => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      navigate("/home");
      toast.success(response.data.message, {
        position: "top right",
        message: "You have loged In",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <div className="row">
          <div className="col-7">
            <img
              src="https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg"
              alt=""
              className="w-100"
            />
          </div>
          <div className="col-5">
            <br />
            <h4 className="text-center">Sign In</h4>
            <br />
            <form action="" onSubmit={submitData}>
              <input
                type="text"
                placeholder="Your Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <br />
              <input
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
              <br />
            </form>
            <br />
            <Button variant="contained" type="submit">
              Login In
            </Button>
            <br />
            already have an account, Click here for
            <Link to="/registration">&nbsp;&nbsp;login</Link>
          </div>
        </div>
      </section>
    </>
  );
}
