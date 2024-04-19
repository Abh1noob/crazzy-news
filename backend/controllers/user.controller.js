import express from "express";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateLogToken } from "../utils.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    newUser.save();

    res.status(200).json({
      message: "User created successfully",
      data: req.body,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const loginUser = async (req, res) => {
  const userData = await user.findOne({ email: req.body.email });
  if (userData) {
    const valid = await bcrypt.compare(req.body.password, userData.password);
    if (valid) {
      res.status(200).json({
        message: "User logged in successfully",
        data: {
          _id: userData._id,
          access_token: generateLogToken(userData),
        },
      });
    } else {
      res.status(400).json({
        message: "Invalid password",
      });
    }
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
};
