const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const expressErr=require("../utils/expressErr.js");
const Review=require("../model/review.js");
const Listing =require("../model/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");


const reviewController=require("../controller/reviews.js");

//review post
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
   

//delete review    
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;