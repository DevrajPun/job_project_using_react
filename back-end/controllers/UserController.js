const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

class UserController {
  static home = async (req, res) => {
    try {
      res.send("home");
    } catch (error) {
      console.log(error);
    }
  };

  static insertUser = async (req, res) => {
    try {
      const { name, email, phone, password, confirmPassword, role } = req.body;

      // Validate input fields
      if (!name || !email || !phone || !password || !confirmPassword || !role) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required." });
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: "failed", message: "Passwords do not match." });
      }

      // Check if email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ status: "failed", message: "Email already exists." });
      }

      // Hash password and create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        is_verified: false, // Add is_verified field
      });

      // Save user to database
      await newUser.save();

      // Send verification email
      // await this.sendVerifymail(
      //   { body: { name, email, user_id: newUser._id } },
      //   res
      // );

      // Generate JWT token and store in cookie
      const token = jwt.sign({ ID: newUser._id }, process.env.JWT_SECRET);
      res.cookie("token", token, { httpOnly: true });
      // console.log(`token: ${token}`)

      // Send success response
      return res.status(201).json({
        status: "success",
        message:
          "Registration successful! Please check your email to verify your account.",
      });
    } catch (error) {
      console.error("Error during user registration:", error);
      // Ensure only one response is sent
      if (!res.headersSent) {
        return res.status(500).json({
          status: "failed",
          message: "Server error. Please try again later.",
        });
      }
    }
  };

  static veryLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({
          status: "failed",
          message: "Email and password are required",
        });
      }

      // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found" });
      }

      // Compare password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ status: "failed", message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { ID: user._id },
        process.env.JWT_SECRET || "default_secret"
      );
      res.cookie("token", token);

      // Redirect based on user role
      if (user.role === "user") {
        return res.status(200).json({
          status: "success",
          message: "Login successful",
        });
      } else if (user.role === "employer") {
        return res.status(200).json({
          status: "success",
          message: "Login successful",
        });
      } else {
        return res
          .status(400)
          .json({ status: "failed", message: "Unknown user role" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        status: "failed",
        message: "Server error. Please try again later.",
      });
    }
  };

  static getAll = async (req, res) => {
    try {
      const data = await UserModel.find();
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.send(error);
    }
  };
  static getOne = async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ status: "failed", message: error.message });
    }
  };
  static logout = async (req, res) => {
    try {
      // Clear the authentication token from the cookies
      res.clearCookie("token");

      // Send a JSON response indicating successful logout
      res
        .status(200)
        .json({ status: "success", message: "Logged out successfully" });
    } catch (error) {
      console.error("Error during logout:", error);
      // Send a JSON response indicating an error occurred
      res.status(500).json({
        status: "failed",
        message: "Server error. Please try again later.",
      });
    }
  };

  static sendVerifymail = async (req, res) => {
    const { name, email, user_id } = req.body;

    if (!name || !email || !user_id) {
      return res.status(400).json({
        status: "failed",
        message: "Missing required fields: name, email, or user_id.",
      });
    }

    try {
      // Create a transporter object using SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // Port for TLS
        secure: false, // Use TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Send verification email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        html: `
                <p>Hi ${name},</p>
                <p>Thank you for registering. Please verify your email by clicking the link below:</p>
                <a href="http://localhost:${process.env.PORT}/home">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Thank you,</p>
                <p>The Team</p>
            `,
      });

      res.status(200).json({
        status: "success",
        message: "Verification email sent successfully.",
      });
    } catch (error) {
      console.error("Error sending verification email:", error);
      res.status(500).json({
        status: "failed",
        message: "Failed to send verification email. Please try again later.",
      });
    }
  };

  static verifymail = async (req, res) => {
    try {
      const { id } = req.query;

      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "Missing user ID." });
      }

      const updatedUser = await UserModel.findByIdAndUpdate(id, {
        is_verified: true,
      });

      if (updatedUser) {
        // Redirect to home page upon successful email verification
        return res.redirect("/home");
      } else {
        return res
          .status(400)
          .json({ status: "failed", message: "Invalid verification link." });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      return res.status(500).json({
        status: "failed",
        message: "Server error. Please try again later.",
      });
    }
  };

  static sendEmail = async (req, res) => {
    const { name, email, token } = req.body;

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        html: `
                <p>Hi ${name},</p>
                <p>We received a request to reset your password. Please click the link below to reset your password:</p>
                <a href="http://localhost:${process.env.PORT}/reset-password?token=${token}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
                <p>Thank you,</p>
                <p>The Team</p>
            `,
      });

      res.status(200).json({
        status: "success",
        message: "Password reset email sent successfully.",
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      res.status(500).json({
        status: "failed",
        message: "Failed to send password reset email.",
      });
    }
  };
}
module.exports = UserController;
