const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {type:String},
    type: {type:String},
    year: {type:Number},
    file: {type:Object}
})

module.exports =mongoose.model.bookmyshow|| mongoose.model("Bookmyshow", userSchema);
