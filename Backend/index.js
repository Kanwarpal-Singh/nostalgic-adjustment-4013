const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const { studentRouter } = require("./routes/students.route");
const PORT = process.env.port;
const { UserModel } = require("./models/students.model");
// to render verify html
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

// Handle GET request to "/verify"
app.get("/verify", async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: "Email already verified" });
    }
    user.isVerified = true;
    await user.save();

    res.sendFile(path.join(__dirname, "public", "pages", "verify.html"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/user", studentRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Something went wrong\n", error);
  }
  console.log(`Server is running at port: ${PORT}`);
});
