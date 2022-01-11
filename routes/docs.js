const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const DocDetails = require('../models/DocDetails');
const { uploadImg, downloadFile, deleteFile } = require('../utilities/docsFireBase.js')


// ROUTE 1: [POST & log-in required] /api/docs/adddoc

router.post('/add', fetchuser, async (req, res) => {

    try {

        // getting details from form
        let file;
        const { card, number, name, dob, fatherName, address } = req.query;
        let doc = await DocDetails.findOne({ card: card, number: number });
        if (doc) {
            res.status(400).json({ error: "Credentials already exists!" })
        }

        // uploading file on cloud
        if (!req.files) {
            res.status(400).send("Choose file to upload");
        }
        file = req.files.file;

        const cloudOp = await uploadImg(file.data, card + number);
        const downloadLink = await downloadFile(cloudOp.storageRef);
        // writing data to DB
        doc = new DocDetails({
            user: req.user.id, card, number, fireBaseRef: downloadLink.url
        });
        const savedDoc = await doc.save();
        res.json(savedDoc);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 2: [GET & log-in required] /api/docs/fetchalldocs

router.get('/fetchalldocs', fetchuser, async (req, res) => {
    try {
        const docs = await DocDetails.find({ user: req.user.id });
        res.json(docs);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error!");
    }
});

// ROUTE 3: [DELETE & log-in required] /api/docs/delete/:id

router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {

        let doc = await DocDetails.findById(req.params.id);
        if (!doc) { return res.status(404).send("Not Found!") }

        if (doc.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        doc = await DocDetails.findOne({ _id: req.params.id });
        const cloudOp = await deleteFile(doc.fireBaseRef);
        if (!cloudOp.success) {
            res.status(400).send("Error while deleting from cloud!");
        }

        doc = await DocDetails.findByIdAndDelete(req.params.id);
        res.json({ "msg": "Successfully deleted entry!" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
});

// ROUTE 4: [GET & log-in required] /api/docs/getdoc/:id

router.get('/getdoc/:id', fetchuser, async (req, res) => {

    try {
        let doc = await DocDetails.findById(req.params.id);
        res.json(doc);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
});

module.exports = router;