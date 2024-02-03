const notes = require ('express').Router()
const { v4: uuidv4 } = require ('uuid')
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

notes.get ('/',(req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {   
    const { title, text } = req.body
    
    if (req.body){
        const newNote = {
            title,
            text
        };

        readAndAppend(newNote, './db/db.json')
        res.json(`Note Added Successfully`)
    } else {
        res.error('Error adding new note')
    }
})


module.exports = notes;