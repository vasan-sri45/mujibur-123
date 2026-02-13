const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors =require("cors");
const User = require("./models/user");
const advocateRoutes = require("./routes/user.route");

const app = express();
app.use(express.json());

// MongoDB Atlas connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.use(
  cors({
    origin: "https://mujibur-123.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.post("/upload", async (req, res) => {

  try {
    const filePath = path.join(__dirname, "data.json");
    const allData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const batchSize = 1000;
    const totalBatches = Math.ceil(allData.length / batchSize);

    for (let i = 0; i < allData.length; i += batchSize) {

      const batch = allData.slice(i, i + batchSize);

      await User.insertMany(batch, { ordered: false });

      console.log(`Batch ${i / batchSize + 1}/${totalBatches} inserted`);

      await delay(500); // Atlas free overload avoid
    }

    res.json({ message: "1 Lakh Data Uploaded Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload Failed" });
  }
});

app.use("/api", advocateRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
