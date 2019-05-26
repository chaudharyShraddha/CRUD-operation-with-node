const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let employeSchema = new Schema({
    name: { type:String, required:true },
    email: { type:String, required:true },
    mobile: { type:String, required:true },
    city: { type:String, required:true },
}); 

module.exports = mongoose.model("employeData",employeSchema);