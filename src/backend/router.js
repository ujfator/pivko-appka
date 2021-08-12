const express = require('express');
const router = express.Router()
const Card = require('./model');
const crypto = require('crypto');

router.get('/', function (req, res) {
    Card.find()
    .then(cards => res.json(cards))
    .catch(err => console.log(err))
});

router.post('/', (req, res) => {
    const card = req.body;
    const id =  crypto.randomBytes(16).toString("hex");
    new Card({text: card.text, date: card.date, myId: id}).save()
    .then(() => res.json({
        message: "Card created"
    }))
    .catch(err => res.status(400).json({
        "error": err,
        "message": "Error creating card"
    }));
});

router.delete('/', (req, res) => {
    Card.findByIdAndDelete(req.body.id)
    .then(() => res.json({
        message: "Card deleted"
    }))
    .catch(err => res.status(400).json({
        "error": err,
        "message": "Error creating card"
    }));
});

module.exports = router 