const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('./db');

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
app.use(express.static(path.join(__dirname, '../../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build'))
});

// API
const cards = require('./router');
app.use('/cards', cards);