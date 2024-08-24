import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../redux/DataActions';

const NoteCard = ({ note, onEdit, onDelete }) => {

// Tarih ve saat formatını YYYY-MM-DD HH:mm:ss gibi bir formata dönüştürür
const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const date = new Date(dateString);
  return date.toLocaleString(undefined, options);
};

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote(note));
    onDelete();
  };

  return(
  <div className="border rounded-lg p-6 mb-4 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-gray-800">{note.header}</h2>
      <span className="text-sm text-gray-500 bg-gray-200 rounded-full px-3 py-1">{note.category.name}</span>
    </div>
    <p className="mt-4 text-gray-700 leading-relaxed">{note.content}</p>
    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
      <span>{formatDateTime(note.date)}</span>
      <div className="flex space-x-2">
        <button 
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          onClick={() => onEdit(note)}
        >
          Düzenle
        </button>
        <button 
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
          onClick={handleDelete}
        >
          Sil
        </button>
      </div>
    </div>
  </div>
  );
};

export default NoteCard;
