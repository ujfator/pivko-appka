const mongoose = require('mongoose');
const connection = 'mongodb+srv://marek:marek@cluster0-jkdd5.azure.mongodb.net/pivka?retryWrites=true&w=majority';
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));