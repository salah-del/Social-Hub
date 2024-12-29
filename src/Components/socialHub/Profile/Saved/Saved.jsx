import React, { memo, useEffect, useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Cookies from 'js-cookie';

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

const  Saved = memo(() => {
  
  const currUserId = Cookies.get("userID");
  // useEffect(() => { 
  //   const getSavedItems
  // }, [currUserId])
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Items</h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.map((item) => (
          <SavedItemCard key={item.id} item={item} onToggleSave={toggleSave} />
        ))}
      </div> */}
    </div>
  );
})

export default Saved;
