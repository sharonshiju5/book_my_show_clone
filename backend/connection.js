const mongoose=require("mongoose");

async function connection() {
    const db=await mongoose.connect("mongodb://127.0.0.1:27017/multer");
    console.log("Connected to database");
    return db;
    
}

module.exports=connection;
