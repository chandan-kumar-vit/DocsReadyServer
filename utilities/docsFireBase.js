const firebase = require("firebase/app");
const fstorage = require("firebase/storage");
const dotenv = require('dotenv');

dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyAPPx8nndukrwmSbnUV-nKsD30b0S-2kbA",
    authDomain: "docsready.firebaseapp.com",
    projectId: "docsready",
    storageBucket: "docsready.appspot.com",
    messagingSenderId: "227207990394",
    appId: "1:227207990394:web:7261fea3f2a17257f67fc3",
    measurementId: "G-S4ZMH9XSP4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


// Upload file
const uploadImg = async (image, fileName) => {
    const storage = fstorage.getStorage();
    const storageRef = fstorage.ref(storage, fileName);

    const bytes = image;
    const temp = await fstorage.uploadBytes(storageRef, bytes).then((snapshot) => {
        console.log(`${fileName} uploaded`);
    });

    return ({ storageRef });
}


// Download file
const downloadFile = async (ref) => {
    const url = await fstorage.getDownloadURL(ref);
    return ({url})
}


// Delete File

const deleteFile = async (ref) => {
    let success = false;
    fstorage.deleteObject(ref);
    success = true;
    return ({ success });
}

exports.uploadImg = uploadImg
exports.downloadFile = downloadFile
exports.deleteFile = deleteFile