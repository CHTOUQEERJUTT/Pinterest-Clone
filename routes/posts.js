const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postimage: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
