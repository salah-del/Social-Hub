import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineReply } from "react-icons/md";

const ReplyCard = ({
  reply,
  handleDeleteComment,
  replyToComment,
  setReplyToComment,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div key={reply._id} className="flex items-start gap-3 ml-6">
        <img
          src={reply.user.profilePicture || profile}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="space-y-1">
            <p className="text-sm font-medium">{reply.user.name}</p>
            <p className="text-sm text-gray-600">{reply.desc}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-gray-500 hover:text-gray-700"
          title="Reply"
          onClick={() => setReplyToComment(!replyToComment)}
        >
          <MdOutlineReply size={16} />
        </button>
        <button
          className="text-gray-500 hover:text-red-600"
          title="Delete"
          onClick={() => handleDeleteComment(reply.objectId)}
        >
          <AiOutlineDelete size={16} />
        </button>
      </div>
    </div>
  );
};

export default ReplyCard;
