var express = require('express');
var router = express.Router();
var userModel =require('./users');
var postModel = require('./posts');
var passport = require('passport');
var upload = require('./multer');
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/profile',isLoggedIn, async function(req, res, next) {
  var user = await userModel.findOne({username:req.session.passport.user})
  .populate('posts');
  res.render('profile' ,{user});
});
router.get('/feed',isLoggedIn, async function(req, res, next) {
  var user = await userModel.findOne({username:req.session.passport.user});
  var posts = await postModel.find({})
  .populate('user');
  res.render('feed',{user,posts});
});
router.get('/showposts',isLoggedIn, async function(req, res, next) {
  var user = await userModel
  .findOne({username:req.session.passport.user})
  .populate('posts');

  res.render('showposts',{user:user,});
});
router.get('/createposts', function(req, res, next) {
  res.render('createposts');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.post('/dpupload',upload.single('dp'),async function(req,res){
  var user = await userModel.findOne({username:req.session.passport.user});
  user.dp = req.file.filename;
  await user.save();
  res.redirect('/profile');
});
router.post('/uploadpost',upload.single('postimage'),isLoggedIn,async function(req,res,next){
  var user = await userModel.findOne({username:req.session.passport.user});
  var post = await postModel.create({
    postimage:req.file.filename,
    user:user._id,
    caption:req.body.caption,
    description:req.body.description,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile')
})
router.post('/register', function(req,res){
  var userData =  new userModel({
    fullname:req.body.fullname,
    username:req.body.username,
    email:req.body.email,
    
  });
  userModel.register(userData,req.body.password)
  .then(function (registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile')
    })
  })
});
router.post('/login', passport.authenticate("local" , {
  successRedirect:"/profile",
  failureRedirect:"/",
}) , function(req,res){})
router.get('/logout',function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next ()
  }
  res.redirect('/')
}


module.exports = router;

