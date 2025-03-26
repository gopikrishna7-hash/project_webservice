const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../model/listing.js");
const {isLoggedIn ,isOwner,validateListing}=require("../middleware.js")
const multer=require("multer");

const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

const listingController=require("../controller/listings.js");

//index&Create route

router
    .route("/")
      .get(wrapAsync(listingController.index))
      .post(isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing ));
    
    
//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show &put&delete
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//edit route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForms));


 module.exports=router;