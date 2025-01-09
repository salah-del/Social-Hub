import { FaDownload, FaShare, FaPlus } from "react-icons/fa";
import { API } from "../../Api/Api";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import { formatDate } from "../../Utils/formatDate";
import profile from "../../assets/profile.jpg";

const Reports = () => {
  const [values, setValues] = useState({
    input_sentence: "",
    user_name: "",
    message_type: "",
  });

  const [myReports, setMyReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const getMyReports = async () => {
    try {
      const response = await axios.get(API.getMyReports);
      setMyReports(response.data.reports);
    } catch (error) {
      console.error(error);
    }
  };

  const AddReportUser = async () => {
    try {
      const response = await axios.post(API.AddReportUser, values);
      setValues({ input_sentence: "", user_name: "", message_type: "" });
      setShowForm(false);
      getMyReports();
    } catch (error) {
      console.error(error);
    }
  };

  const downloadReport = async (reportId) => {
    try {
      const response = await axios.get(`${API.downloadReport}/${reportId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  useEffect(() => {
    getMyReports();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-xl min-h-screen border-4 border-gray-300">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800">Reports</h1>
          <p className="text-gray-600 mt-2">
            Manage, download, and share your reports efficiently.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
        >
          <FaPlus className="mr-2" />
          {showForm ? "Hide Form" : "Add Report"}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-blue-300 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add New Report
          </h2>
          <div className="space-y-4">
            <div className="flex space-x-4 flex-wrap">
              <div className="flex-1">
                <label
                  htmlFor="user_name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Person's Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  placeholder="Enter the person's name"
                  value={values.user_name}
                  onChange={(e) =>
                    setValues({ ...values, user_name: e.target.value })
                  }
                  className="w-full border-2 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="message_type"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message Type
                </label>
                <div className="relative">
                  <select
                    id="message_type"
                    value={values.message_type}
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    onChange={(e) =>
                      setValues({ ...values, message_type: e.target.value })
                    }
                    className="w-full border-2 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>
                      Select message type
                    </option>
                    <option value="message">Message</option>
                    <option value="comment">Comment</option>
                  </select>
                  <MdKeyboardArrowDown
                    className={`absolute top-1/2 right-4 transform transition-transform ${
                      isSelectOpen ? "rotate-180" : "rotate-0"
                    }`}
                    size={25}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="input_sentence"
                className="block text-gray-700 font-medium mb-2"
              >
                Message/Comment Content
              </label>
              <textarea
                id="input_sentence"
                placeholder="Enter the content of the message or comment"
                value={values.input_sentence}
                onChange={(e) =>
                  setValues({ ...values, input_sentence: e.target.value })
                }
                className="w-full border-2 h-32 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              onClick={AddReportUser}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              Submit Report
            </button>
          </div>
        </div>
      )}

      {/* Reports List Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-gray-300">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">My Reports</h2>
        {myReports.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {myReports.map((report, index) => (
              <li
                key={index}
                className="flex justify-between items-start py-4 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={report.reportedUser.profilePicture || profile}
                    alt={report.reportedUser.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div className="space-y-1">
                    <p className="text-gray-900 font-semibold">
                      {report.reportedUser.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Type:</span>{" "}
                      {report.contentType}
                    </p>
                    <p className="text-blue-500 text-sm">
                      <span className="font-medium text-gray-600">Reason:</span>{" "}
                      {report.reason || "N/A"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Reported on:</span>{" "}
                      {formatDate(report.createdAt)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Content:</span>{" "}
                      {report.content}
                    </p>
                  </div>
                </div>
                <button
                  className="flex items-center text-blue-500 hover:underline"
                  onClick={() => downloadReport(report._id)}
                >
                  <FaDownload className="mr-2" />
                  Download
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">
            No reports available. Add a new one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default Reports;
