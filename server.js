
//Initializing express and path
const express = require('express');
const path = require('path');
//Api will require index.js
const api = require('./routes/index.js');

//Selecting the port 
const PORT = process.env.PORT || 3001;

//Using express
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

//Serving Public Files
app.use(express.static('public'));

//Routing url endpoints for / and /notes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

//Listening for server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
