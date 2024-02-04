//Express initialization
const express = require('express');

//Taking in notes
const notes = require('./notes');

//Using the app variable to get express functionalities
const app = express();

//Serving the notes when /notes endpoint is hit 
app.use('/notes', notes);

//Exports the router to be used in server.js
module.exports = app;