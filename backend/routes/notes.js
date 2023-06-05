const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');



// Route 1 : Get All the notes using GET "/api/notes/fetchAllNotes". Login required
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Router 2 : Add a new notes using POST "api/notes/addNote". Login required
router.post('/addNote', fetchuser, [
    body('title', "Enter valid title..").isLength({ min: 5 }),
    body('description', "Enter minmium 5 length description").isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 3 : Update an existing Note using POST "/api/notes/updateNote". Login required
router.put('/updateNote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a new note object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found...");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed...");
        }

        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ updatedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

// Route 4 : Delete an existing Note using Delete "/api/notes/deleteNote". Login required
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found...");
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed...");
        }

        const deleteNote = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted..." });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;