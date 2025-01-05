import React, { memo, useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import SavedPosts from './SavedPosts';
import SavedVideos from './SavedVideos';
import { useSelector } from 'react-redux';
import { showToast } from '../../../../Utils/showToast';
import axios from 'axios';
import { API } from '../../../../Api/Api';

const Saved = memo(() => {
  // if the user isn't the logged in 
  const {edit} = useOutletContext();
  const [userPassed, setUserPassed] = useState(null);
  const {id} = useParams();

  useEffect(() => { 
    // if this is your account and user isn't null
    if (id) { 
      const getUserData = async () => { 
        try {
            // setLoading(true);
            const response = await axios.get(`${API.getUserById}/${id}`);
            setUserPassed(response.data);
        } catch (error) {
          showToast("error", "Error fetching user data");
          console.error("Error fetching user data:", error);
        }
      }
      getUserData();
    }
  }, []);
  
  return (
    <div className="w-full">
      <div className='w-full flex  flex-col gap-5'>
        <div className='flex flex-col gap-5 border-b  pb-5'>
          <h2 className="text-xl font-bold text-gray-600"> Videos</h2>
          {<SavedVideos savedVideos={userPassed?.savedVideos || null} edit={edit} />}
        </div>
        <h2 className="text-xl font-bold text-gray-600"> Posts</h2>
        <SavedPosts user={userPassed || null} edit={edit} />
      </div>
    </div>
  );
})

export default Saved;
