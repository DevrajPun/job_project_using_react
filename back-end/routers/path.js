const express = require("express");
const checkUseAuth = require("../middlewares/auth");
const JobController = require("../controllers/JobController");
const UserController = require("../controllers/UserController");
const route = express.Router();

route.post("/insert", UserController.insertUser);
route.get("/login", UserController.veryLogin);
route.get("/getAll", checkUseAuth, UserController.getAll);
route.get("/getOne/:id", checkUseAuth, UserController.getOne);
route.get("/logout/:id", UserController.logout);

route.get("/home", UserController.home);

// jobs routes
route.post("/jobInsert", JobController.insertJob)
route.get("/viewJobs", JobController.viewJobs)
route.get("/viewJob/:id", JobController.viewJobById)
route.get("/delete/:id", JobController.deleteJob)

module.exports = route;
