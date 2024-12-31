import { FaFileAlt, FaDownload, FaShare } from "react-icons/fa";
import { API } from "../../Api/Api";
import { useState } from "react";
const Reports = () => {
  const [values, setValues] = useState({
    input_sentence: "",
    user_name: "",
    message_type: "",
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-600 mt-1">View and download reports</p>
      </div>

      <div className="grid gap-6">
        {[
          { title: "Monthly Sales Report", date: "2024-02-01", size: "2.4 MB" },
          { title: "User Activity Log", date: "2024-02-15", size: "1.8 MB" },
          { title: "Financial Statement", date: "2024-02-28", size: "3.2 MB" },
        ].map((report, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FaFileAlt className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Generated: {report.date}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-500">
                  <FaDownload />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-500">
                  <FaShare />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
