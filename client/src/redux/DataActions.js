import { setNotes, addNoteToState, editNoteToState, deleteNoteToState} from './notesReducter';
import { setCategories } from './categoriesReducter';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

export const fetchNotesAndCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    const { notes, categories } = response.data;
    dispatch(setNotes(notes));
    dispatch(setCategories(categories));
  } catch (error) {
    console.error('Error fetch notes and categories:', error);
  }
};

export const addNote = (note) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, note);
    // state içerisine eklene notun kategorisi string değil obje olması gerekiyor.
    // api üzerinden dönen notun kategori değeri de bir obje olduğu için bunu state'e ekledik.
    dispatch(addNoteToState(response.data));
  } catch (error) {
    console.error('Error adding note:', error);
  }
};

export const editNote = (gelen_not) => async (dispatch) => {
  try {
    const response = await axios.patch(`${API_URL}/${gelen_not._id}`, gelen_not);
    dispatch(editNoteToState(response.data))
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = (note) => async (dispatch) => {
  try {
    const deleting_note_id = note._id;
    const response = await axios.delete(`${API_URL}/${note._id}`);
    // sunucu tarafından bir hata olmadığı sürece state için id gönderebiliriz.
    dispatch(deleteNoteToState(deleting_note_id))
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};