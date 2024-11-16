import { Application } from "../models/application.js";
import { Job } from "../models/job.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

//apply job
export const applyJob = catchAsyncError(async (req, res, next) => {
  const userId = req.id;
  const jobId = req.params.id;
  if (!jobId) {
    return next(new ErrorHandler("job id is required", 400));
  }
  // check if the user has already applied for the job
  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  });

  if (existingApplication) {
    return res.status(400).json({
      message: "You have already applied for this jobs",
      success: false,
    });
  }

  // check if the jobs exists
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("job not found", 404));
  }
  // create a new application
  const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
  });

  job.applications.push(newApplication._id);
  await job.save();
  return res.status(201).json({
    message: "Job applied successfully.",
    success: true,
  });
});

//applied jobs
export const getAppliedJobs = catchAsyncError(async (req, res, next) => {
  const userId = req.id;
  const application = await Application.find({ applicant: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
        options: { sort: { createdAt: -1 } },
      },
    });
  if (!application) {
    return next(new ErrorHandler("no application", 404));
  }
  return res.status(200).json({
    application,
    success: true,
  });
});

// admin (recruiter) dekhega kitna user ne apply kiya hai
export const getApplicants = catchAsyncError(async (req, res, next) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId).populate({
    path: "applications",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "applicant",
    },
  });
  if (!job) {
    return next(new ErrorHandler("job not found", 404));
  }
  return res.status(200).json({
    job,
    succees: true,
  });
});

//status update
export const updateStatus = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;
  const applicationId = req.params.id;
  if (!status) {
    return next(new ErrorHandler("status is required", 400));
  }

  // find the application by applicant id
  const application = await Application.findOne({ _id: applicationId });
  if (!application) {
    return next(new ErrorHandler("application not found", 404));
  }

  // update the status
  application.status = status.toLowerCase();
  await application.save();

  return res.status(200).json({
    message: "Status updated successfully.",
    success: true,
  });
});
