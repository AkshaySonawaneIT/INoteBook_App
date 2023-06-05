import React, { useContext, useEffect } from 'react';
import noteContext from '../Context/notes/NoteContext';

function About() {
    // const a = useContext(noteContext);
    // useEffect(() => {
    //   a.update();
    //   // eslint-disable-next-line
    // }, [])
    
    return (
        <div>
            {/* This is About {a.state.name} and {a.state.age} years old. */}
            About Component
        </div>
    )
}

export default About
