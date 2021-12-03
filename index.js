const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./db')

dotenv.config();
const app = express();
connectToMongo();
app.use(express.json());
const port = process.env.PORT || 5000;

// Available routes

app.get('/', (req, res) => {
    res.json({ Application: "DocsReady", msg: "Server up and Running!" })
})
app.use('/api/auth', require('./routes/auth'));
app.use('/api/docs', require('./routes/docs'));

app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}`)
})