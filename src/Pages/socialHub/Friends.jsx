import { FaUserPlus, FaUserCheck, FaUserClock } from 'react-icons/fa';

const Friends = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600 mt-1">Manage your user base</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <FaUserPlus className="inline-block mr-2" />
                Add User
              </button>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <FaUserCheck className="inline-block mr-1" />
                Active: 234
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <FaUserClock className="inline-block mr-1" />
                Pending: 12
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;