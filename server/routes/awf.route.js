const express = require("express");
const { getAwfEnrollmentAdvocate } = require("../controller/awf.controller");

const router = express.Router();

router.get("/awf-search",getAwfEnrollmentAdvocate);


module.exports = router;