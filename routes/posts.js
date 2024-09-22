const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");

const validation = [
  body("title").isString().withMessage("title is required"),
  body("description").isString().withMessage("description is required"),
];

//Get All Posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    return next(error);
  }
});

//Get Specific Post
router.get("/:postId", async (req, res) => {
  try {
    const singlePost = await Post.findById(req.params.postId);
    res.json(singlePost);
  } catch (error) {
    console.log("errorr", error)
    return res.json({ message: error });
  }
});

//Update Post
router.patch("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { ...req.body } });
    res.json(removedPost);
  } catch (error) {
    console.log("errorr", error)
    return res.json({ message: error });
  }
});

//Delete Post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postId });
    res.json(removedPost);
  } catch (error) {
    console.log("errorr", error)
    return res.json({ message: error });
  }
});

//Add New Post
router.post("/addPost", validation, async (req, res, next) => {
  const post = new Post({
    title: { value: req.body.title },
    description: { value: req.body.description },
  });
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result.array());
      return next(result.array());
    }
    const savePost = await post.save();
    res.send(savePost);
  } catch (error) {
    return next(error);
  }
});

//Send Email
router.post("/sendEmail", async (req, res) => {
  if (req.body.message) {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "hassan.raza@kodexolabs.com",
      from: "ali.aftab@kodexolabs.com",
      subject: "Sending with SendGrid is Fun",
      text: req.body.message,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.send("Email has been sent");
      })
      .catch((error) => {
        console.error(error.response.body, "error in email api");
      });
  } else {
    res.send("Email message is required");
  }
});

module.exports = router;
