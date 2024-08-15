const JobModel = require("../models/job");

class JobController {
    static insertJob = async (req, res) => {
        try {
            const {
                title,
                desc,
                category,
                country,
                city,
                location,
                fixedSalary,
                salaryFrom,
                salaryTo,
            } = req.body;

            // Get the logged-in user's ID from req.user (assuming you have an auth middleware)
            // const postedBy = req.user._id;

            // Create the job with the logged-in user's ID
            const jobsData = new JobModel({
                title,
                desc,
                category,
                country,
                city,
                location,
                fixedSalary,
                salaryFrom,
                salaryTo,
                // postedBy, // Set the logged-in user as the poster
            });

            await jobsData.save();

            return res.status(201).json({
                status: "success",
                message: "Job has been posted successfully",
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "An error occurred while posting the job",
            });
        }
    };

    static viewJobById = async (req, res) => {
        try {
            const jobs = await JobModel.findById(req.params.id)
            res.status(200).json(jobs)
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ status: "failed", message: error.message });
        }
    };

    static viewJobs = async (req, res) => {
        try {
            const jobs = await JobModel.find()
            res.status(200).json(jobs)
        }
        catch (error) {
            res.send(error)
        }
    };
    
    static deleteJob = async (req, res) => {
        try {
            await JobModel.deleteOne(re.params.id)
            return res.status(201).json({
                status: "success",
                message: "Job Data is deleted",
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = JobController