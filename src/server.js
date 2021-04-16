const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
});

MongoClient.connect('mongodb+srv://marek:marek@cluster0-jkdd5.azure.mongodb.net/pivka?retryWrites=true&w=majority', { useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to Database');
    const db = client.db('pivka')
    const collection = db.collection('pivka')
    app.get('/cards', function (req, res) {
        const pivka = collection.find();
        console.log(pivka);
    });

    app.post('/create', (req, res) => {
        collection.insertOne({text: req.body})
          .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
    });
});