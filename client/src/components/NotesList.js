// client/src/components/NotesList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        setNotes(response.data);
        setLoading(false);
        console.log(response);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p><strong>Category:</strong> {note.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
