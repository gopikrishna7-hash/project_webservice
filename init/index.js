const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../model/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/Worldtour";

main()
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDb=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'67daf3f73299721a64c84620'}));
    await Listing.insertMany(initData.data);
    console.log("data was initailaized");
};
initDb();