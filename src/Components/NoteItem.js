import React, { useContext } from 'react';
import noteContext from '../Context/notes/NoteContext';

function NoteItem(props) {
    const initialNotes = useContext(noteContext);
    const { deleteNote } = initialNotes;
    const { note, updateNote, showAlert } = props;
    return (
        <>
            <div className='col-md-4 my-3'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id); showAlert("Deleted Successfully...", "success");}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
