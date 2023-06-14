const express = require("express");
const creatorRouter = express.Router();
require("dotenv").config();
const multer = require("multer");
const path = require("path")
const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3"); // Package to interact with the s3 bucket
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner"); //Package for getting the url of files from s3 bucket
const { CourseModel } = require("./../models/course.model");

const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey
const region = process.env.region
const bucket = process.env.bucket
const expiry = process.env.URLexpiry

const s3 = new S3Client({          // Setting the credential of aws
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    }
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

creatorRouter.get("/creator", (req, res) => {
    res.sendFile(path.join(__dirname, "./../course.html" ))  // Sending the course form
});

creatorRouter.get("/getcourse/:id", async(req,res) => {
    const {id} = req.params
    try{
        const courseExists = await CourseModel.findOne({creatorId: id});
        if(!courseExists) return res.status(404).json({ message: "Course not found" });

        res.status(200).json(courseExists)
    }
    catch(err){
        console.log(err);
        res.status(500).send({"error":"Something went wrong"});
    }
});

creatorRouter.post('/upload', upload.single('video'), async function (req, res, next) {

    const {title, description, language, course, creatorId, creatorName} = req.body

    try {

        const fileName = req.file.originalname  // storing original file name
        const params = {                        // setting params of putobject
            Bucket: bucket,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        const command = new PutObjectCommand(params)  

        await s3.send(command);                 // Sending the put command to s3 buckt

        getObjectParams = {                     // Params to get the file:object from s3
            Bucket: bucket,
            Key: fileName,
        }

        const getCommand = new GetObjectCommand(getObjectParams);   // Creating get command
        const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 * expiry });  // generating the url with epirable lifetime

        const content = [{                      // creating videoInfo object
            videoname:fileName,
            videourl:url
        }]

        const addCourse = new CourseModel({title, description, language, course, creatorId, creatorName, content});
        await addCourse.save();

        res.json({ message: 'Successfully Added Course'})

    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "error": "Something went wrong" });
    }


});

creatorRouter.delete("/deletecourse/:id", async (req, res) => {
    const { id } = req.params
    try {
        const course = await CourseModel.findOne({ creatorId: id })
        if (!course) return res.status(404).json({ message: "Course not found" });

        for (let item of course.content) {
            const deleteParams = {                  // creating the delete params
                Bucket: bucket,
                Key: item.videoname,                // name of the file to be deleted
            }
            const deleteCommand = new DeleteObjectCommand(deleteParams) // generating delete command

            await s3.send(deleteCommand);  // sending the delete request to s3
        }

        await CourseModel.findOneAndDelete({creatorId: id});
        res.json({ message: 'Successfully Deleted', course })
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": "Something went wrong" });
    }
})

module.exports= {
    creatorRouter
}