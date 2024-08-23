import React, { useState, useEffect } from 'react';
import AllNotesPage from './components/AllNotesPage';
import NewNotePage from './components/NewNotePage';
import EditNotePage from './components/EditNotePage';
import { fetchNotes, addNote, updateNote, deleteNote } from './api/notesFromAxios'; 

const App = () => {
  const [page, setPage] = useState('all');
  const [notesData, setNotesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const Alldata = await fetchNotes();
        setNotesData(Alldata.notes);
        setCategoriesData(Alldata.categories);
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleAddNoteClick = () => {
    setPage('new');
    setCurrentNote(null);
  };

  const handleEditNoteClick = (note) => {
    setCurrentNote(note);
    setPage('edit');
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

  const handleUpdateNote = async (updatedNote) => {
    try {
      const updated = await updateNote(updatedNote);
      setNotesData(notesData.map(note => note.id === updated.id ? updated : note));
      // düzenlenmiş veriyi ana sayfaya gönderir. bunu yapmazsan sayfayı yenilemeden
      // güncellediğin notun güncel halini göremezsin.
      const Alldata = await fetchNotes();
      setNotesData(Alldata.notes);
      setCategoriesData(Alldata.categories);
      // tüm notları yeniden çekmeliyiz. yoksa kategori isimleri eksik gelir.
      setPage('all');
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (deleted_node) => {
    try {
      await deleteNote(deleted_node);
      setNotesData(notesData.filter(note => note._id !== deleted_node._id));
      // bu sefer tüm verileri yeniden çekip yüklemek yerine ilgili notu filtre ile
      // mevcut oturumda kaldırmayı tercih ettim.
      // sayfa yenilendiğinde zaten veritabanında olmayacağı için bu veri, gözükmeyecek.
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const Allcategories = categoriesData.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : page === 'all' ? (
        <AllNotesPage 
          notes={notesData}
          categories={Allcategories}
          onAddNote={handleAddNoteClick} 
          onEditNote={handleEditNoteClick} 
          onDeleteNote={handleDeleteNote} 
        />
      ) : page === 'new' ? (
        <NewNotePage onSave={handleSaveNote} categories={Allcategories} />
      ) : page === 'edit' && currentNote ? (
        <EditNotePage note={currentNote} onUpdate={handleUpdateNote} categories={Allcategories} />
      ) : null}
    </div>
  );
};

export default App;
