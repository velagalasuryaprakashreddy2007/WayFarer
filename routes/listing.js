 const express = require("express")
 const router = express.Router()

 const wrapAsync = require("../utils/wrapAsync.js");

 const Listing=require("../models/listing.js");
 const {isLoggedin,isOwner,validateListing} = require("../middlewares.js");
 
 const listingController = require("../controller/listings.js");

 const multer = require("multer");
 const {storage} = require("../cloudConfig.js");
 const upload = multer({storage});


 
     //new Route
    router.get("/new",isLoggedin , listingController.renderNewForm)
    router.get("/icon/:category", wrapAsync(listingController.iconListing));
    router.get("/search", wrapAsync(listingController.searchListings));

    //Create Route
    router.route("/").get(wrapAsync(listingController.index))
    .post(isLoggedin,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));

    //show route Update Route Delete Route
    router.route("/:id").get(wrapAsync(listingController.renderShowForm)).put(isLoggedin,isOwner,upload.single("listing[image]"), validateListing , wrapAsync(listingController.updateListing)).delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing));

    //edit Route
    router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));



module.exports = router;