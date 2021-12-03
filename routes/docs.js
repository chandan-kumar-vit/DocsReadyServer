const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { findById } = require('../models/DocDetails');
const DocDetails = require('../models/DocDetails');
const { uploadFile, getFile, deleteFile } = require('../utilities/docOnDrive')

// ROUTE 1: [POST & log-in required] /api/docs/adddoc

router.post('/add', fetchuser, async (req, res) => {

    try {

        // getting details from form
        const { card, number, name, dob, fatherName, address } = req.body;
        let doc = await DocDetails.findOne({ card: card, number: number });
        if (doc) {
            res.status(400).json({ error: "Credentials already exists!" })
        }

        // uploading file on cloud
        const cloudOp = await uploadFile(card + "_" + req.user.id, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fzeenews.india.com%2Fpersonal-finance%2Faadhaar-card-update-change-address-in-aadhaar-in-few-simple-steps-here-s-how-2404829.html&psig=AOvVaw1V9awKHC13b0ggax9cpJoJ&ust=1638616261120000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCID1jcW_x_QCFQAAAAAdAAAAABAD');
        if (!cloudOp.success) {
            res.status(400).send("Error while uploading file!");
        }

        //fetching links of files
        const fileLinks = await getFile(cloudOp.id);

        // writing data to DB
        doc = new DocDetails({
            user: req.user.id, card, number, fileId: cloudOp.id, webContentLink: fileLinks.webContentLink, webViewLink: fileLinks.webViewLink
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
        const cloudOp = await deleteFile(doc.fileId);
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