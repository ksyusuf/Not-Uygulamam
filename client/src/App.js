import React, { useState, useEffect } from 'react';
import AllNotesPage from './components/AllNotesPage';
import NewNotePage from './components/NewNotePage';
import { fetchNotes, addNote } from './api/notesFromAxios';

const App = () => {
  const [page, setPage] = useState('all');
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await fetchNotes();
        setNotesData(notes);
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleAddNoteClick = () => {
    // spa mantığını bozmamak için yeni yorum ekleme sayfası için
    // bu metot ile geçiş sağlanması tercih edildi.
    setPage('new');
  };

  const handleSaveNote = async (newNote) => {
    try {
      const savedNote = await addNote(newNote);
      setNotesData([...notesData, savedNote]);
      setPage('all');
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const categories = [...new Set(notesData.map(note => note.category))].sort();

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : page === 'all' ? (
        <AllNotesPage notes={notesData} onAddNote={handleAddNoteClick} />
      ) : (
        <NewNotePage onSave={handleSaveNote} categories={categories} />
      )}
    </div>
  );
};

export default App;
