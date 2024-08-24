import React, { useState, useEffect } from 'react';
import AllNotesPage from './components/AllNotesPage';
import NewNotePage from './components/NewNotePage';
import EditNotePage from './components/EditNotePage';
// import { fetchNotes, addNote, updateNote, deleteNote } from './api/notesFromAxios';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchNotesAndCategories, addNote, editNote, deleteNote } from './redux/DataActions';

const App = () => {

  const [page, setPage] = useState('all');
  const [notesData, setNotesData] = useState([]);
  // const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentNote, setCurrentNote] = useState(null);

  // useEffect(() => {
  //   const loadNotes = async () => {
  //     try {
  //       const Alldata = await fetchNotes();
  //       setNotesData(Alldata.notes);
  //       setCategoriesData(Alldata.categories);
  //     } catch (error) {
  //       console.error('Failed to load notes:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadNotes();
  // }, []);

  const dispatch = useDispatch();
  const { notes, categories } = useSelector(state => ({
    notes: state.notes.notes,
    categories: state.categories.categories,
  }));

  // loadData fonksiyonunu tanımladık.
  // bu şekilde diğer kısımlarda da bunu kullanabileceğiz.
  // fakat vt.den verilerin çekilmesini beklerken sayfa yükleniyor ve
  // sayfa yüklendiğinde milisaniyeler ile verinin ana sayfaya düşüşünü
  const loadData = async () => {
    try {
      await dispatch(fetchNotesAndCategories());
    } catch (error) {
      console.error('Failed to load notes and categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

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
      // const savedNote = await addNote(newNote);
      // setNotesData([...notesData, savedNote]);
      // loadData();
      dispatch(addNote(newNote));
      setPage('all');
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const handleUpdateNote = async (gelen_not) => {
    try {
      // const updated = await updateNote(updatedNote);
      // setNotesData(notesData.map(note => note.id === updated.id ? updated : note));
      // düzenlenmiş veriyi ana sayfaya gönderir. bunu yapmazsan sayfayı yenilemeden
      // güncellediğin notun güncel halini göremezsin.
      // hem bu şekilde yeniden tüm notları çekmeye gerek kalmaz.
      dispatch(editNote(gelen_not));
      setPage('all');
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (deleted_node) => {
    try {
      // await deleteNote(deleted_node);
      // setNotesData(notesData.filter(note => note._id !== deleted_node._id));
      // bu sefer tüm verileri yeniden çekip yüklemek yerine ilgili notu filtre ile
      // mevcut oturumda kaldırmayı tercih ettim.
      // sayfa yenilendiğinde zaten veritabanında olmayacağı için bu veri, gözükmeyecek.
      console.log(deleted_node)
      dispatch(deleteNote(deleted_node));
      setPage('all');
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  // tüm kategorileri id değerleri ile çekmiştik, şimdi alfabetik sıralayıp öyle paylaşıyoruz
  // redux değişmezlik kuralından dolayı değişkeni değiştirmeden kopyası ile işlem yapıyoruz.
  const Allcategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : page === 'all' ? (
        <AllNotesPage 
          notes={notes}
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
