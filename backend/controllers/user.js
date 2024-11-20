import  catchAsyncError  from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDaraUri from "../utils/dataurl.js";
import cloudinary from "../utils/cloudinary.js";

//register
export const register = catchAsyncError(async (req, res, next) => {
  const { fullname, email, phoneNumber, password, role } = req.body;

  if (!fullname || !email || !phoneNumber || !password || !role) {
    return next(new ErrorHandler("Please enter the following details", 400));
  }

  const file = req.file;
  const fileUri = getDaraUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Email already exist", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
    profile: {
      profilePhoto: cloudResponse.secure_url,
    }
  });

  return res.status(201).json({
    message: "Account created successfully.",
    success: true,
  });
});

//login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("something is missing", 400));
  }
  let user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Incorrect email or passowrd", 400));
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Incorrect email or password", 400));
  }
  // check role is correct or not
  if (role !== user.role) {
    return next(
      new ErrorHandler("Account doesn't exist with current role.", 400)
    );
  }

  const tokenData = {
    userId: user._id,
  };
  const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpsOnly: true,
      sameSite: "strict",
    })
    .json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true,
    });
});

//logout
export const logout = catchAsyncError(async (req, res, next) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully",
    success: true,
  });
});

//get all users
export const getAllUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.find();

  res.status(200).json({
    success: true,
    user
  })
})

//updateprofile
export const updateprofile = catchAsyncError(async (req, res, next) => {
  const { fullname, email, phoneNumber, bio, skills } = req.body;

    //cloudinary
  const file = req.file;
  const fileUri = getDaraUri(file);

  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  
  let skillsArray;
  if(skills){
    skillsArray = skills.split(",");
  }
  const userId = req.id; //middleware authentiaction
  let user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found"));
  }

  //updating data
  if (fullname) user.fullname = fullname;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;
  if (skills) user.profile.skills = skillsArray;

  //resume  
  if(cloudResponse){
    user.profile.resume = cloudResponse.secure_url //save the cloudinary url
    user.profile.resumeOriginalName = file.originalname //save the original file name
  }

  await user.save();

  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res.status(200).json({
    message: "Profile updated successfully.",
    user,
    success: true,
  });
});

