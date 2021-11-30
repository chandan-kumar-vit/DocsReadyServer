const { google } = require('googleapis');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

dotenv.config();

// Google API credentials and setting up drive environment

const CLIENT_ID = "" + process.env.CLIENT_ID;
const CLIENT_SECRET = "" + process.env.CLIENT_SECRET;
const REDIRECT_URI = "" + process.env.REDIRECT_URI;

const REFRESH_TOKEN = "" + process.env.REFRESH_TOKEN;

const oath2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oath2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oath2Client
})

// Function to upload a file in G-Drive

const uploadFile = async (fileName, filePath) => {
    let success = false;
    try {

        const res = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: mime.lookup(filePath)
            },
            media: {
                mimeType: mime.lookup(filePath),
                body: fs.createReadStream(filePath)
            }
        });
        success = true;
        return ({
            success,
            id: res.data.id
        });

    } catch (error) {
        console.log("G-Drive uploading error: " + error.message);
    }
}

// Function to delete an uploaded file on G-Drive

const deleteFile = async (id) => {

    let success = false;
    try {

        const res = await drive.files.delete({
            fileId: id
        });

        success = true;
        return ({
            success,
            id: id,
            status: res.status
        });

    } catch (error) {
        console.log('G-Drive deleting error: ' + error.message);
    }
}

// Creating public url of file [view file]

const getFile = async (id) => {
    try {

        const fileId = id;

        await drive.permissions.create({
            fileId: id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })

        const res = await drive.files.get({
            fileId: id,
            fields: 'webViewLink, webContentLink'
        })

        return res.data;
    } catch (error) {
        console.log("Generating public url error: " + error.message)
    }
}

exports.uploadFile = uploadFile
exports.deleteFile = deleteFile
exports.getFile = getFile