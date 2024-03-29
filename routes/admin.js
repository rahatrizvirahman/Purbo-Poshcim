const express = require("express");
const router = express.Router();
const passport = require("passport");
// Load User model
const User = require("../models/userInfo");
const {newsModel} = require('../models/news')

const {
  converToBdTime,
  mapToBdNumber,
  getBdDate,
  getHome,
  getSectionNews,
  getNewsDetails,
  postCreateNews,
  getCreateNews,
  getUpdateNews,
  postUpdateNews,
  deleteNews,
  getVideos,
  getCreateVideo,
  postCreateVideo,
  getUpdateVideo,
  postUpdateVideo,
  deleteVideo,
}=require('../controllers/adminFunctions')


const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../controllers/auth_helper");


const { checkNotNull, trimSpace, classes} = require("../controllers/functionCollection")

router.get("/", checkAuthenticated, getHome);

router.get("/news/:class", checkAuthenticated, getSectionNews);

router.get("/newsDetails/:id", async (req, res)=>{
  let id = req.params.id
  let data = await newsModel.findOne({_id: id});
  res.redirect('/admin/newsDetails/'+data._id+'/'+data.title.trim().replace(/\s/g,'-'))
});
router.get("/newsDetails/:id/:convertedTitle", checkAuthenticated, getNewsDetails);

router.get("/createNews", checkAuthenticated, getCreateNews);

router.post("/createNews", checkAuthenticated, postCreateNews);

router.get("/news/update/:id", checkAuthenticated, getUpdateNews);

router.post("/news/update/:id/:dId", checkAuthenticated, postUpdateNews);

router.get("/news/delete/:id/:dId", checkAuthenticated, deleteNews);

router.get("/videos", checkAuthenticated, getVideos);

router.get("/createVideo", checkAuthenticated, getCreateVideo);

router.post("/createVideo", checkAuthenticated, postCreateVideo);

router.get("/video/update/:id", checkAuthenticated, getUpdateVideo);

router.post("/video/update/:id", checkAuthenticated, postUpdateVideo);

router.get("/video/delete/:id", checkAuthenticated, deleteVideo);

router.get("/admanage", (req, res)=>{
  res.render('adManage', {classes})
});

// Login Page
router.get("/auth/login", checkNotAuthenticated, (req, res) => res.render("login", {classes}) );
// Login
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "admin/auth/login",
    failureFlash: true,
  })(req, res, next);
});


// Logout
router.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    req.flash("success_msg", "Admin logged out");
  } else {
    req.flash("error_msg", "You are not logged in");
  }
  res.redirect("admin/auth/login");
});



module.exports = router;
