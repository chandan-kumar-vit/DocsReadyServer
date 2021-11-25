const mongoose = require('mongoose');

const mongoURI = toString(process.env.DBURI);

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log(`Connected to Database Successfully!`);
    })
}

module.exports = connectToMongo;