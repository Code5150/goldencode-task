const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require("body-parser");

//Collections names
const AUTHORS_COLLECTION = 'authors';
const BOOKS_COLLECTION = 'books';

//Configurating environment variables
require('dotenv').config();

//Configurating express server
const app = express();
const port = process.env.PORT || 5000;
const urlencodedParser = bodyParser.urlencoded({extended: false});
const uri = process.env.ATLAS_URI

app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());

//Connecting to database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  console.log('Collections: ', Object.keys(connection.collections));
});

//Defining schemas
const bookSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: String,
    authors: { type: Array, default: [] }
}, { versionKey: false, collection: BOOKS_COLLECTION });

const authorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: String
}, { versionKey: false, collection: AUTHORS_COLLECTION });

//Defining models
const Books = mongoose.model(BOOKS_COLLECTION, bookSchema);
const Authors = mongoose.model(AUTHORS_COLLECTION, authorSchema);

//Defining method
app.get('/table', (req, res) => {
    console.log(BOOKS_COLLECTION);
    Books.find({'authors.2': { "$exists": true }}, (err, docs) => {
        if (err) console.log(err);
        else {
            res.json(docs);
        } 
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


