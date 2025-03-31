require('dotenv').config();
const express = require('express');
const app = express();
const databaseConnect = require('./config/database');
const authRouter = require('./routes/authRoute');


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

databaseConnect();

app.use('/api/messenger', authRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})