import React, { useState, useEffect } from 'react';

const EditNotePage = ({ note, onUpdate, categories }) => {
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // sayfa yüklendiğinde gelen note nesnesinin içeriğini çekmeliyiz.
    // bu şekilde üzerinde değişiklik yapılmadan önceki halini görüntüleyebiliriz.
    if (note) {
      setHeader(note.header);
      setContent(note.content);
      setCategory(note.category.name);
    }
  }, [note]);

  const handleUpdate = () => {
    if (header && content && category) {
      const updatedNote = { ...note, header, content, category };
      onUpdate(updatedNote); // API çağrısını üst bileşenden yap
    }
  };

  return (
    <div className="p-6 bg-gray-50 h-screen">
      <h1 className="text-3xl font-bold mb-6">Notu Düzenle</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Başlık"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <textarea
          placeholder="İçerik"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg p-3 mb-6 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Seçilen Kategori</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          onClick={handleUpdate}
        >
          Notu Güncelle
        </button>
      </div>
    </div>
  );
};

export default EditNotePage;
