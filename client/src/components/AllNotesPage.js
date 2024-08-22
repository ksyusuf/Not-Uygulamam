import React, { useState } from 'react';
import NoteCard from './NoteCard';
import CategorySidebar from './CategorySidebar';
import Header from './Header';

const AllNotesPage = ({ notes, onAddNote, onEditNote, onDeleteNote }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filtrelenmiş notları tarihine göre sıralayın (yeni tarihler önce)
  const filteredNotes = selectedCategory === 'All'
    ? notes
    : notes.filter(note => note.category === selectedCategory);

  // Notları tarihine göre azalan sırada sıralama
  const sortedNotes = filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Kategorileri oluştur
  const categories = ['All', ...new Set(notes.map(note => note.category))].sort();

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col">
        <Header onAddNote={onAddNote} />
        <div className="flex flex-1">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex-1 p-6 overflow-y-auto">
            {sortedNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={onEditNote} 
                onDelete={onDeleteNote} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllNotesPage;
