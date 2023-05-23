const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return next(new ErrorResponse("Input fields are Mandatory!", 400));
  }
  const emailTaken = await User.findOne({ email });
  const usernameTaken = await User.findOne({ username });
  if (emailTaken && usernameTaken) {
    return next(new ErrorResponse("Email and Username already Exists!", 400));
  } else if (emailTaken) {
    return next(new ErrorResponse("Email already Exists!", 400));
  } else if (usernameTaken) {
    return next(new ErrorResponse("Username already Exists!", 400));
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = await user.generateToken();
    res.status(201).json({
      success: true,
      accessToken: token,
      message: "Registration Successful!",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Input fields are Mandatory!", 400));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials!", 404));
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials!", 404));
    }
    const token = await user.generateToken();
    res.status(200).json({
      success: true,
      accessToken: token,
      message: "Welcome back " + user.username + "!",
    });
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      user: false,
      message: "Token not Provided!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const validUser = await User.findById(decoded._id);
    if (validUser) {
      return res.status(200).json({
        user: true,
        message: "User is Authenticated!",
      });
    } else {
      return res.status(400).json({
        user: false,
        message: "User doesn't Exist!",
      });
    }
  } catch (error) {
    return res.status(200).json({
      user: false,
      message: "Invalid Token Provided!",
    });
  }
};
