const mongoose = require('mongoose');
const { catagorySchema } = require('./catagory');

const Post = mongoose.model(
  'Posts',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    catagory: {
      type: [String],
    },
    body: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

exports.Post = Post;
