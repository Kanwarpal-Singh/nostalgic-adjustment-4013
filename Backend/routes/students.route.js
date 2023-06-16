const express = require("express");
const { UserModel } = require("../models/students.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../models/blacklist.model");
const studentRouter = express.Router();

// for send mail
const sendVerificationMail = async (username, email, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "jackayron5@gmail.com",
        pass: "unpptovcdhpfkzdv",
      },
    });

    const mailOptions = {
      from: "jackayron5@gmail.com",
      to: email,
      subject: "For verification mail",
      html: `<p>Hi ${username}, please click here to <a href="http://localhost:8080/verify?id=${userId}">verify</a>your mail</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};


studentRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(401).send({ msg: "User Already Registered" });
    }

    const hash = await bcrypt.hash(password, 8);

    const newUser = new UserModel({ username, email, password: hash });

    const userData = await newUser.save();
    if (userData) {
      sendVerificationMail(username, email, userData._id);
      res.status(200).json({ msg: "Registration successful", userData });
    } else {
      res.status(401).json({ msg: "Registration failed" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

studentRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserPresent = await UserModel.findOne({ email });
    if (!isUserPresent) {
      return res.status(401).send("user not found");
    }
    const isPass = await bcrypt.compare(password, isUserPresent.password);
    if (!isPass) {
      return res.send({ msg: "invalid credential" });
    }
    const token = await jwt.sign(
      {
        userId: isUserPresent._id,
      },
      process.env.SECRET,
      { expiresIn: "1hr" }
    );
    res.send({
      msg: "login success",
      token,
      userId: isUserPresent._id,
      username: isUserPresent.username,
      userId: isUserPresent._id,
      isVerified:isUserPresent.isVerified
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});


studentRouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers?.authorization;
    if (!token) return res.status(403);
    let blackListedToken = new BlackListModel({ token });
    await blackListedToken.save();
    res.send({ msg: "logout succesfull" });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = { studentRouter };
