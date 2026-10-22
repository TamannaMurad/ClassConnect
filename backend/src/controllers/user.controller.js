import httpStatus from "http-status";

import { User } from "../models/user.model.js";

import bcrypt, { hash } from "bcrypt";

import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please provide username and password",
    });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid username or password",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({ token });
  } catch (e) {
    console.error("Login error:", e);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User registered" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

const addToActivity = async (req, res) => {
  try {
    const { token, meeting_code } = req.body;

    if (!token || !meeting_code?.trim()) {
      return res.status(400).json({
        message: "Token and meeting code are required",
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    user.activity.push({
      meeting_code: meeting_code.trim(),
      date: new Date(),
    });

    await user.save();

    return res.status(200).json({
      message: "Meeting added to history",
      activity: user.activity,
    });
  } catch (error) {
    console.error("Add activity error:", error);

    return res.status(500).json({
      message: "Failed to add meeting history",
    });
  }
};

const getAllActivity = async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    const user = await User.findOne({ token }).select("activity");

    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    return res.status(200).json({
      activity: user.activity,
    });
  } catch (error) {
    console.error("Get activity error:", error);

    return res.status(500).json({
      message: "Failed to retrieve meeting history",
    });
  }
};

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token: token });
    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
    const user = await User.findOne({ token: token });

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    res.status(httpStatus.CREATED).json({ message: "Added code to history" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

export {
  login,
  register,
  addToActivity,
  getAllActivity,
  getUserHistory,
  addToHistory,
};

/* import httpStatus from "http-status";

import { User } from "../models/user.model.js";

import bcrypt, { hash } from "bcrypt";

import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please provide username and password",
    });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid username or password",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({ token });
  } catch (e) {
    console.error("Login error:", e);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User registered" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};



export { login, register }; */
