import React, { useState } from "react";
import axios from "axios";
import { API } from "../../../../Api/Api";
import { MdHistory } from "react-icons/md";

const History = () => {
  const [yourHistory, setYourHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // جلب الـ history بناءً على التاريخ
  const fetchHistory = async (date) => {
    setLoading(true);
    setError("");
    try {
      const [year, month, day] = date.split("-");
      const response = await axios.get(
        `${API.SeeYourHistory}/${year}/${month}/${day}`
      );
      setYourHistory(response.data.history);
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // التعامل مع تغيير التاريخ
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // إرسال الطلب عند النقر على الزر
  const handleSubmit = () => {
    if (selectedDate) {
      fetchHistory(selectedDate);
    } else {
      setError("Please select a date.");
    }
  };

  console.log(selectedDate);

  return (
    <div className="max-w-4xl mt-3 mx-auto p-6   rounded-lg">
      {/* العنوان */}
      <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
        <MdHistory className="text-sec-color" size={28} /> Your History
      </h1>

      {/* حقل اختيار التاريخ */}
      <div>
        <div className=" mt-6">
          <label
            htmlFor="history-date"
            className="block text-sm font-medium text-gray-700"
          >
            Select Date:
          </label>
          <input
            type="date"
            id="history-date"
            value={selectedDate}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]} // منع اختيار تاريخ في المستقبل
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sec-color"
          />
        </div>

        {/* زر إرسال الطلب */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full px-4 py-2 bg-sec-color hover:bg-main-color text-white rounded-md focus:outline-none"
        >
          {loading ? "Loading..." : "See your history"}
        </button>
      </div>

      {/* عرض حالة التحميل أو الخطأ */}
      {loading && <p className="mt-4 text-center text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {/* عرض الـ history */}
      <div className="mt-6 space-y-4">
        {yourHistory?.length > 0 ? (
          yourHistory.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <p className="text-sm text-gray-500">
                {new Date(item.timestamp).toLocaleString()}{" "}
                {/* تنسيق التاريخ والوقت */}
              </p>
              <p className="text-lg text-gray-800">{item.action}</p>{" "}
              {/* عرض الـ action */}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No history available for this date.
          </p>
        )}
      </div>
    </div>
  );
};

export default History;
