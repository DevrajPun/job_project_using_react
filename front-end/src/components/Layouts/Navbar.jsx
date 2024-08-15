import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogout = async () => {};
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-info ${
          isAuthorized ? "navbarShow" : "navbarHide"
        } `}
      >
        <h1>JOB PORTAL</h1>
        <ul
          className={`navbar-nav ms-auto ${
            show ? "show-menu  menu " : "menu"
          } `}
        >
          <li className="nav-item">
            <Link
              className="nav-link active"
              to={"/"}
              onClick={() => setShow(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              to={"/job/getAll"}
              onClick={() => setShow(false)}
            >
              All Job
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link active"
              to={"/job/me"}
              onClick={() => setShow(false)}
            >
              My Job Application
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              to={"/"}
              onClick={() => setShow(false)}
            >
              All Job
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link active"
              to={"/applications/me"}
              onClick={() => setshow(false)}
            >
              {user && user.role === "Employer"
                ? "Applications Applicant"
                : "My Applications"}
            </Link>
          </li>

          {user && user.role === "Employer" ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/job/post"}
                  onClick={() => setShow(false)}
                >
                  Post New Job
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/job/me"}
                  onClick={() => setShow(false)}
                >
                  View Your Job
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
