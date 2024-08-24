import React from 'react';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="flex-2 m-6 mr-3 overflow-y-auto">
  <aside className="bg-white p-6 border-r border-gray-300 shadow-lg rounded-xl h-auto">
    <h2 className="text-xl font-bold mb-4 text-gray-800">Kategoriler</h2>
    <ul className="space-y-2">
      <li
        className={`cursor-pointer px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition duration-200 font-semibold ${selectedCategory === 'All' ? 'bg-gray-100' : ''}`}
        onClick={() => onSelectCategory('All')}
      >
        All
      </li>
      {categories.map(category => (
        <li
          key={category._id}
          className={`cursor-pointer px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200 ${selectedCategory === category.name ? 'bg-gray-100 font-semibold text-gray-900' : ''}`}
          onClick={() => onSelectCategory(category.name)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  </aside>
  </div>
);

export default CategorySidebar;
