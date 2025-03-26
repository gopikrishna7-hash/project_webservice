const Listing=require("../model/listing");
const Review=require("../model/review");


module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    if(!listing){
        req.flash("error","listing not found!");
        return res.redirect("/listings");
    }
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`)
    };

module.exports.destroyReview=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    if(!review){
        req.flash("error","Reviiew not found!");
        return res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted!");
     res.redirect(`/listings/${id}`);
    };

