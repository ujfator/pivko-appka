const express = require('express');
const router = express.Router()
const Card = require('./model');

router.get('/', function (req, res) {
    Card.find()
    .then(cards => res.json(cards))
    .catch(err => console.log(err))
});

router.post('/', (req, res) => {
    console.log(req.body);
    new Card(req.body).save()
    .then(() => res.json({
        message: "Created card successfully"
    }))
    .catch(err => res.status(400).json({
        "error": err,
        "message": "Error creating card"
    }));
});

module.exports = router 