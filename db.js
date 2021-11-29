const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// const mongoURI = toString(process.env.DB_URI);
const mongoURI=""+process.env.DB_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log(`Connected to Database Successfully!`);
    })
}

module.exports = connectToMongo;