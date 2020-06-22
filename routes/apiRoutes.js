var fs = require("fs");
const router = require("express").Router();
const path = require("path");
var notesData = require("../develop/db.json");

//Random id generator enter 'npm install uuid' in console
const { v1: uuidv1 } = require("uuid");


// Create New Notes and displays in browser
  router.get("/notes", function (req, res) {
    res.json(notesData);
  });

// Retrieves user input from /notes page and sends it to JSON file
  router.post("/notes", function (req, res) {
   
    //The only real change made was including the `id`
    let note = {
        id: uuidv1(),
        title: req.body.title,
        text: req.body.text
    }
    fs.readFile('./develop/db.json', (err, data) => {
        if (err) throw err;

        const allNotes = JSON.parse(data);
        console.log("AllNotes: " + allNotes);
        allNotes.push(note);

        fs.writeFile("./develop/db.json", JSON.stringify(allNotes, null, 2), (err) => {
            if (err) throw err;
            res.send(notesData);
        });
    });
  });


//Delete function
  router.delete("/notes/:id", function(req, res) {
    let noteId = req.params.id

    fs.readFile("./develop/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        const newNotes = allNotes.filter(note => {
            return note.id !== noteId

        });

        fs.writeFile("./develop/db.json", JSON.stringify(newNotes, null, 2), err => {
            res.send((notesData));
            console.log("Deleted!");

        });
    });
});

module.exports = router;
