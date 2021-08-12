const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    myId:  {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Card", cardSchema, "pivka")