const express = require("express")
 const router = express.Router({mergeParams : true})

 const wrapAsync = require("../utils/wrapAsync.js");

const Listing=require("../models/listing.js");
const Review = require("../models/reviews.js")
const {isLoggedin,validateReview,isReviewAuthor} = require("../middlewares.js");

const reviewController = require("../controller/reviews.js");

//Review
    //POST Route
    router.post("/", isLoggedin, validateReview,wrapAsync(reviewController.createReview));

    //Delete Route
    router.delete("/:reviewId", isReviewAuthor , wrapAsync(reviewController.destroyReview));

    module.exports = router;