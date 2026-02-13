const express = require("express");
const {getEnrollmentAdvocate, searchAdvocateByName} = require("../controller/user.controller");

const router = express.Router();

router.get("/search", getEnrollmentAdvocate);
router.get("/search-name", searchAdvocateByName);

module.exports = router;