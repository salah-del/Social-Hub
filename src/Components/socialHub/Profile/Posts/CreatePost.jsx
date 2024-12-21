import { useState } from "react";
import { BiImage, BiSmile } from "react-icons/bi";
function CreatePost() {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement post creation
    setContent("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What's on your mind?"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <BiImage className="text-xl" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <BiSmile className="text-xl" />
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
