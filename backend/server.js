require('dotenv').config();
const express = require('express');
const app = express();
const databaseConnect = require('./config/database');
const authRouter = require('./routes/authRoute');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const messengerRouter = require('./routes/messengerRoute');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('This is from backend server')
})

databaseConnect();

app.use(bodyParser.json());

app.use(cookieParser());

app.use('/api/messenger', authRouter);
app.use('/api/messenger', messengerRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})