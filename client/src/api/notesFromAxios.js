// src/api/notesFromAxios.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

// Tüm notları almak için API çağrısı
export const fetchNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Yeni bir not eklemek için API çağrısı
export const addNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};
