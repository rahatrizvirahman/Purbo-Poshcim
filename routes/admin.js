const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { newsModel, newsDetailsModel } = require("../models/news");
const videoModel = require("../models/video");

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

const classes = [
  "বাংলাদেশ",
  "আন্তর্জাতিক",
  "অর্থনীতি",     
  "সাহিত্য",
  "ক্যাম্পাস",
  "শিক্ষা",    
  "খেলা",
  "বিজ্ঞান ও প্রযুক্তি",
  "বিনোদন",
  "উদ্ভাবন",
  "মতামত",
  "কর্মসূচী",
];

const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../controllers/auth_helper");

router.get("/", checkAuthenticated, getHome);

router.get("/news/:class", checkAuthenticated, getSectionNews);

router.get("/newsDetails/:id", checkAuthenticated, getNewsDetails);

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

module.exports = router;
