// src/components/CategorySidebar.js
import React from 'react';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory }) => (
  <aside className="w-1/6 bg-gray-200 p-6 border-r border-gray-300">
    <h2 className="text-xl font-bold mb-4">Kategoriler</h2>
    <ul className="space-y-2">
        <li
              className={`cursor-pointer px-3 py-2 rounded-md text-gray-700 hover:bg-gray-300 transition duration-200 ${selectedCategory === 'All' ? 'bg-gray-300 font-semibold' : ''}`}
              onClick={() => onSelectCategory('All')}
            >
              {'All'}
        </li>
      {categories.map(category => (
        <li
          key={category._id} // Burada `category._id` kullanılmalı
          className={`cursor-pointer px-3 py-2 rounded-md text-gray-700 hover:bg-gray-300 transition duration-200 ${selectedCategory === category.name ? 'bg-gray-300 font-semibold' : ''}`}
          onClick={() => onSelectCategory(category.name)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  </aside>
);

export default CategorySidebar;
