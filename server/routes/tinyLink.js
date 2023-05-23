const express = require("express");
const router = express.Router();

const {
  shorten,
  getData,
  deleteUrl,
  updateUrl,
} = require("../controllers/tinyLink");
const authCheck = require("../middleware/authCheck");

router.route("/shorten").post(authCheck, shorten);
router.route("/data").get(authCheck, getData);
router.route("/delete").delete(authCheck, deleteUrl);
router.route("/update").put(authCheck, updateUrl);

module.exports = router;
