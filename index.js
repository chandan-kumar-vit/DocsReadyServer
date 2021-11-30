const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./db')

dotenv.config();
const app = express();
connectToMongo();
app.use(express.json());
const port = process.env.PORT || 5000;

// Available routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/docs', require('./routes/docs'));

app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}`)
})