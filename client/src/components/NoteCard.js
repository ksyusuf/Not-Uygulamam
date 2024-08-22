import React from 'react';

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

const NoteCard = ({ note }) => (
  <div className="border rounded-lg p-6 mb-4 shadow-lg bg-white">
    <div className="mt-4 flex justify-between text-sm text-gray-500">
      <h2 className="text-2xl font-semibold text-gray-800">{note.header}</h2>
      <span>{note.category}</span>
    </div>
    <p className="mt-2 text-gray-700">{note.content}</p>
    <div className="mt-4 flex justify-between text-sm text-gray-500">
      <span>{formatDateTime(note.date)}</span>
    </div>
  </div>
);

export default NoteCard;
