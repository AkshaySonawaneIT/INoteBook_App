import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    
    const host = "http://localhost:5000";
    
    const initialNotes = [];
    // Get All notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const json = await response.json();
        // console.log(json)
        setNotes(json)
        
        // setNotes(notes.concat(note));
    }


    // Add a Note
    const addNote = async (title, description, tag) => {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
        });
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    // Update a Note
    const editNote = async (id, title, description, tag) => {
        // API call
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({title, description, tag}),
        });
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag
                break;
            }
        }
        setNotes(newNotes);
    }

    const [notes, setNotes] = useState(initialNotes);
    
    return (
        // <NoteContext.Provider value={{state, update}}> 
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;