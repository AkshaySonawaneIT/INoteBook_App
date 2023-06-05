import React, { useContext, useState } from 'react';
import noteContext from '../Context/notes/NoteContext';

function AddNote(props) {
    const initialNotes = useContext(noteContext);
    const { addNote } = initialNotes;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const { showAlert } = props;
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Note Added Successfully...", "success")
        setNote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container my-3">
                <h1>Add a Note</h1>
            </div>

            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" minLength={5} value={note.title} required aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" minLength={5} value={note.description} required onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} required onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
