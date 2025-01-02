import React, { memo, useEffect, useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API } from '../../../../Api/Api';
import { useOutletContext } from 'react-router-dom';
import SavedVideos from './SavedVideos';
import SavedPosts from './SavedPosts';

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

const Saved = memo(() => {
  

  const {user, edit} = useOutletContext();
  
  return (
    <div className="w-full">
      <div className='w-full flex  flex-col gap-5'>
        <div className='flex flex-col gap-5 border-b  pb-5'>
          <h2 className="text-xl font-bold text-gray-600"> Videos</h2>
          {<SavedVideos savedVideos={user?.savedVideos || null} edit={edit} />}
        </div>
        <h2 className="text-xl font-bold text-gray-600"> Posts</h2>
        <SavedPosts user={user || null} edit={edit} />
      </div>
    </div>
  );
})

export default Saved;
