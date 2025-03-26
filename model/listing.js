const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const { string } = require("joi");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:
    {
       url:String,
       filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Reviews"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {  // Fix: Define geometry as an object
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers [longitude, latitude]
            required: true
        }
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});
}

});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;