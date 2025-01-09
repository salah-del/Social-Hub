import React, { useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";
import { FaSearch } from "react-icons/fa";
import { useUsers } from "../../../Hooks/useUsers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PeopleList = () => {
  const { fetchAllUsers, users, status, error, handleSearchByName } =
    useUsers();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      handleSearchByName(query);
    } else {
      fetchAllUsers();
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-white rounded-2xl shadow-2xl">
      {/* Header Section */}
      <div className="relative p-6 bg-gradient-to-r from-blue-50 to-white border-4 border-blue-300 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          People You May Know
        </h1>
        <div className="absolute inset-0 border-4 border-blue-100 rounded-lg opacity-70 pointer-events-none"></div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search people..."
            className="w-full pl-10 pr-4 py-2 bg-white border-4 border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 placeholder-gray-500 transition-all duration-300"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* People List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {status === "loading" ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center p-5 bg-white shadow-lg border-4 border-gray-200 rounded-lg animate-pulse hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <Skeleton circle width={96} height={96} />
              <div className="ml-4 flex-1 space-y-3">
                <Skeleton height={24} width="60%" />
                <Skeleton height={18} width="45%" />
              </div>
              <div className="ml-4 flex flex-col gap-2">
                <Skeleton height={35} width={100} />
                <Skeleton height={35} width={100} />
              </div>
            </div>
          ))
        ) : users && users.length > 0 && !error ? (
          users.map((person) => (
            <div
              key={person._id}
              className="relative group flex flex-col items-center bg-white border-4 border-blue-100 rounded-2xl shadow-md p-6 transition-transform transform hover:-translate-y-1 hover:shadow-xl"
            >
              <PeopleCard person={person} />
              <div className="absolute inset-0 border-4 border-blue-300 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))
        ) : (
          <div className="text-red-500 col-span-full flex justify-center items-center h-[420px] font-bold text-lg">
            No results found
          </div>
        )}
      </div>

      {/* Show More Button */}
      {status === "loading" || (!error && users && users.length > 0) ? (
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => fetchAllUsers()}
            className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
          >
            Show More
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PeopleList;
