const Advocate = require("../models/user");

const getEnrollmentAdvocate = async (req, res) => {
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

const searchAdvocateByName = async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    // 1️⃣ Validate input
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least 2 characters for name search"
      });
    }

    // 2️⃣ Name-only search (case-insensitive)
    const query = {
      name: { $regex: name.trim(), $options: "i" }
    };

    const skip = (page - 1) * limit;

    // 3️⃣ Fetch results
    const advocates = await Advocate.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ name: 1 }); // alphabetical

    const total = await Advocate.countDocuments(query);

    // 4️⃣ Response
    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: advocates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


module.exports = {getEnrollmentAdvocate, searchAdvocateByName};