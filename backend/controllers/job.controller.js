import { Job } from "../models/job.model.js";

//Job Creation
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      companyId,
      positions,
    } = req.body;
    const userId = req.id;

    // console.log(
    //   title,
    //   description,
    //   requirements,
    //   salary,
    //   location,
    //   jobType,
    //   experience,
    //   companyId,
    //   positions
    // );

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !companyId ||
      !positions
    ) {
      return res
        .status(400)
        .json({ message: "Something is Missing", success: false });
    }
    const job = await Job.create({
      title: title,
      description: description,
      requirements: requirements.split(","), // Code is breaking here cant assign array to string
      salary: Number(salary),
      location: location,
      jobType: jobType,
      experienceLevel: experience,
      positions: positions,
      company: companyId,
      createBy: userId,
    });
    return res
      .status(201)
      .json({ message: "Job Posted Successfully", job, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Get All Jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ message: "No Jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Find Job by Id
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({ path: "applications" });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createBy: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "No Jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
