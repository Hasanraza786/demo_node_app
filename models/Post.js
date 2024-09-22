const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    value: {
      type: String,
      required: true,
    },
  },
  description: {
    value: {
      type: String,
      required: true,
    },
  },
  date: {
    value: {
      type: Date,
      default: Date.now(),
    },
  },
});

module.exports = mongoose.model("Post", PostSchema);
