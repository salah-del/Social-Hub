import React, { useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const SavedItemCard = ({ item, onToggleSave }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row transition-transform transform hover:scale-105">
      <div className="md:w-1/3">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 md:h-full object-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available')}
        />
      </div>
      <div className="p-4 md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </div>
        <button
          onClick={() => onToggleSave(item.id)}
          className="mt-4 flex items-center text-blue-500 hover:text-blue-600 transition-colors"
        >
          {item.saved ? <BsBookmarkFill className="mr-2" /> : <BsBookmark className="mr-2" />}
          {item.saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

function Saved() {
  const [savedItems, setSavedItems] = useState(
    Array(6).fill(null).map((_, i) => ({
      id: i,
      title: `Saved Item ${i + 1}`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl: `https://picsum.photos/400/300?random=${i}`,
      saved: true,
    }))
  );

  const toggleSave = (id) => {
    setSavedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.map((item) => (
          <SavedItemCard key={item.id} item={item} onToggleSave={toggleSave} />
        ))}
      </div>
    </div>
  );
}

export default Saved;
