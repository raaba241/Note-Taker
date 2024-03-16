// Initializing Express 
const notes = require ('express').Router()
const { v4: uuidv4 } = require ('uuid')
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

//Getting existing notes 
notes.get ('/',(req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

//Posting a new note
notes.post('/', (req, res) => {   
   
    const { title, text } = req.body
    
    //If the request has a body
    if (req.body){
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        //Read the current file and add the end of list
        readAndAppend(newNote, './db/db.json')

        //Send a confirmation message
        res.json(`Note Added Successfully`)
    } else {
        res.error('Error adding new note')
    }
})

// Delete route for specific ID
notes.delete('/:id', (req, res) => {
    const notes_id = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((notes) => {
            if (notes.id !== notes_id){
                return notes;
            }
        })
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${notes_id} has been deleted 🗑️`);
      });
  });
  
module.exports = notes;