var fs = require("fs");
const router = require("express").Router();
const path = require("path");
var notesData = require("../develop/db.json");

// Create New Notes and displays in browser
  router.get("/notes", function (req, res) {
    res.json(notesData);
    console.log(notesData);
  });

// Retrieves user input from /notes page and sends it to JSON file
  router.post("/postnotes", function (req, res) {
    // const notesDataParsed = JSON.parse(notesData);
    let data = [req.body, ...notesData];
    console.log(data);

    let dataJSON = JSON.stringify(data);
    console.log(dataJSON);
    console.log("data", data);
    fs.writeFile(path.join(__dirname, "../develop/db.json"), dataJSON, function() {
      return res.send(dataJSON);
    });
  });



  router.delete("/notes/:id", function(req, res) {
    let noteId = req.params.id
    console.log("This is note ID" + noteId);
    fs.readFile("./develop/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        console.log(allNotes);
        const newNotes = allNotes.filter(note => {
            console.log("note.id:" + typeof note.id);
            console.log("NoteId: " + typeof noteId);

            return note.id != noteId
        });
        fs.writeFile("./developer/db.json", JSON.stringify(newNotes, null, 2), err => {
            res.send(JSON.stringify(newNotes));
            console.log("New NOTES: " + JSON.stringify(newNotes));

            console.log("Note Deleted!")
        });
    });
  //I manually added an id to your first 2 records in "./develop/db.json". 
  //When I delete either one of them by pressing the garbage can icon, you will see that New NOTES in your terminal will delete it, 
  // but it does not persist and show on the html.
});


module.exports = router;


