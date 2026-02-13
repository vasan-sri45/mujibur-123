const Advocate = require("../models/awf");

const getAwfEnrollmentAdvocate = async (req, res) => {
  try {
    const { enrollment_no } = req.query;

    if (!enrollment_no) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search term."
      });
    }

    // 3. Partial Match Search (Like a mobile contact list)
    // Removed ^ and $ so it finds the number anywhere in the string
    const advocates = await Advocate.find({
      enrollment_no: new RegExp(enrollment_no, "i") 
    }).limit(10); // Limit results to keep it fast

    if (advocates.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No records match: ${enrollment_no}`
      });
    }

    res.status(200).json({
      success: true,
      count: advocates.length,
      data: advocates 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


module.exports = {getAwfEnrollmentAdvocate};