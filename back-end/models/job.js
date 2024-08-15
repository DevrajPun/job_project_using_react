const mongoose = require("mongoose");
const UserModel = require("./user")

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    fixedSalary: {
      type: Number,
      required: true,
    },
    salaryFrom: {
      type: Number,
      required: true,
    },
    salaryTo: {
      type: Number,
      required: true,
    },
    jobPostedOn: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    //   required: true,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("job", JobSchema);
module.exports = JobModel;
