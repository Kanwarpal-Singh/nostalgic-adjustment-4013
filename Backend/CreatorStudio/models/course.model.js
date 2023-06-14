const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    course:{
        required:true,
        type:String,
        enum:["Data Analyst", "Full Stock Web-Development", "Networking", "Database Engineering", "Frontend Frameworks"]
    },
    description:{
        required:true,
        type:String,
    },
    language:{
        required:true,
        type:String,
    },
    creatorId:{
        required:true,
        type:String
    },
    creatorName:{
        required:true,
        type:String
    },
    content:{
        type:[{videoname:String, videourl:String}]
    }
},{versionKey:false});

const CourseModel = mongoose.model("course",courseSchema);

module.exports = {CourseModel}