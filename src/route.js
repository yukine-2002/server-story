const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/cors/:proxyUrl*", controller.corsAnywhere);

router.get("/newChapStory",controller.getChapStoryNew) 
router.get("/newStory",controller.getStoryNew) 
router.get("/storyRecommender",controller.getStoryRecommender) 
router.get("/storyComplete",controller.getStoryComplete) 
router.get("/storyUpdate",controller.getStoryUpdate) 
router.get("/storyHot",controller.getStoryHot) 
router.get("/rankDay",controller.getStoryRankDay) 
router.get("/getMenu",controller.getMenu) 

router.get("/story/:slug",controller.getInfoStory) 
router.get("/story/:slug/:chap",controller.getChapterContent) 

module.exports = router