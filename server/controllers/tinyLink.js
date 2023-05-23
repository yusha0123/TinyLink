const URLs = require("../models/Url");
const ErrorResponse = require("../utils/errorResponse");
const shortid = require("shortid");
const validUrl = require("valid-url");

exports.shorten = async (req, res, next) => {
  const { redirectUrl } = req.body;
  if (!redirectUrl) {
    return next(new ErrorResponse("Please provided a URL!", 400));
  }
  if (!validUrl.isUri(redirectUrl)) {
    return res.json({
      invalidUrl: true,
    });
  }
  try {
    const shortId = shortid.generate();
    await URLs.create({
      userId: req.userId,
      shortId: shortId,
      redirectUrl: redirectUrl,
    });
    return res.status(201).json({
      success: true,
      id: shortId,
    });
  } catch (error) {
    next(error);
  }
};

exports.getData = async (req, res, next) => {
  URLs.find({ userId: req.userId })
    .then((results) => {
      return res.json({
        data: results,
        success: true,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteUrl = async (req, res, next) => {
  const { id } = req.body;
  try {
    const result = await URLs.findByIdAndDelete(id);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "URL deleted Successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went Wrong!",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUrl = async (req, res, next) => {
  const { id, newUrl } = req.body;
  if (!validUrl.isUri(newUrl)) {
    return res.status(400).json({
      success: false,
      message: "Invalid URL!",
    });
  }
  try {
    const result = await URLs.findByIdAndUpdate(id, {
      redirectUrl: newUrl,
    });
    if (result) {
      return res.status(200).json({
        success: true,
        message: "URL updated Successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went Wrong!",
      });
    }
  } catch (error) {
    next(error);
  }
};
