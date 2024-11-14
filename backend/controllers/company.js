import catchAsyncError from "../middleware/catchAsyncError.js";
import { Company } from "../models/company.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerCompany = catchAsyncError(async (req, res, next) => {
  const { companyName } = req.body;

  if (!companyName) {
    return next(new ErrorHandler("Company name is requried", 400));
  }

  let company = await Company.findOne({ name: companyName });

  if (company) {
    return next(new ErrorHandler("You can't register same company", 400));
  }

  company = await Company.create({
    name: companyName,
    userId: req.id,
  });

  return res.status(201).json({
    message: "Company registered successfully",
    company,
    success: true,
  });
});

//get company
export const getCompany = catchAsyncError(async (req, res, next) => {
  const userId = req.id; // logged in user id
  const companies = await Company.find({ userId });
  if (!companies) {
    return next(new ErrorHandler("Companies not found", 404));
  }
  return res.status(200).json({
    companies,
    success: true,
  });
});

// get company by id
export const getCompanyById = catchAsyncError(async (req, res, next) => {
  const companyId = req.params.id;
  const company = await Company.findById(companyId);
  if (!company) {
    return next(new ErrorHandler("company not found", 404));
  }
  return res.status(200).json({
    company,
    success: true,
  });
});

//update company
export const updateCompany = catchAsyncError(async (req, res, next) => {
  const { name, description, website, location } = req.body;

  const file = req.file;

  //cloudinary

  const updateData = { name, description, website, location };

  const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  if (!company) {
    return next(new ErrorHandler("company not found", 404));
  }

  return res.status(200).json({
    message: "Company information updated",
    success: true,
  });
});
