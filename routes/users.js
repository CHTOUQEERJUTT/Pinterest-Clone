const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Project1');
const plm =require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  dp: {
    type: String // Assuming dp is a URL to the user's profile picture
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post' // Assuming 'Post' is another Mongoose model representing user's posts
  }]
});

userSchema.plugin(plm);
const User = mongoose.model('User', userSchema);

module.exports = User;
