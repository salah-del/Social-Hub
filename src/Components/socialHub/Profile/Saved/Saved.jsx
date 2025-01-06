import React, { memo, useRef, useState, useEffect } from 'react';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import SavedPosts from './SavedPosts';
import SavedVideos from './SavedVideos';

const Saved = memo(() => {
  const { user, edit } = useOutletContext();
  const { id } = useParams();

  const [isPostsInView, setIsPostsInView] = useState(false);
  const ref = useRef(null);

  // Navigate if trying to access saved videos of another profile
  if (!edit && id) return <Navigate to={`/socialHub/profile/${id}`} />;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPostsInView(true);
        }
      },
      { threshold: 1 } // Adjust threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-5 border-b pb-8">
          <h2 className="text-xl font-bold text-gray-600">Videos</h2>
          {<SavedVideos />}
        </div>
        <div  className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-600">Posts</h2>
          <div ref={ref}>
            {isPostsInView && <SavedPosts user={user} edit={edit} />}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Saved;
