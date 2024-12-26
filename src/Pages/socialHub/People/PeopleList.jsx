import React, { useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";
import { FaSearch } from "react-icons/fa";
import { useUsers } from "../../../Hooks/useUsers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PeopleList = () => {
  const { fetchAllUsers, users, status, handleSearchByName } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  console.log(users);
  
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
    <div className="">
      <div className="flex max-[600px]:flex-col items-center justify-between">
        <h1 className="text-2xl font-bold mb-6 max-[600px]:mb-3">
          People You May Know
        </h1>
        <div className="relative block">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 mb-5 placeholder-black bg-gray-200 rounded-lg border-[1.5px] border-gray-300 focus:outline-none focus:border-gray-400"
          />
          <FaSearch className="absolute left-3 top-3 text-black" />
        </div>
      </div>
      <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 gap-6">
        {status === "loading" ? (
          // عرض Skeleton أثناء التحميل
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center max-[540px]:flex-col max-[540px]:gap-2 p-[18px] bg-gray-100 shadow border border-gray-300 rounded-lg transition-shadow duration-200"
            >
              {/* صورة المستخدم */}
              <Skeleton circle width={96} height={96} />

              {/* بيانات المستخدم */}
              <div className="ml-4 flex-1 space-y-4 max-[540px]:w-full max-[540px]:pl-24 max-[450px]:pl-20 max-[300px]:pr-5">
                <Skeleton height={24} width="60%" />
                <Skeleton height={18} width="45%" />
              </div>

              {/* أزرار الإجراءات */}
              <div className="ml-4 flex flex-col max-[540px]:flex-row max-[365px]:flex-col items-end gap-2">
                <Skeleton height={35} width={120} />
                <Skeleton height={35} width={120} />
              </div>
            </div>
          ))
        ) : users && users.length > 0 ? (
          users.map((person) => <PeopleCard key={person._id} person={person} />)
        ) : (
          <div className="text-red-500 col-span-2 flex justify-center items-center h-[420px] font-bold">
            No results found
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-[18px]">
        <button
          onClick={() => fetchAllUsers()}
          className={`${!users && "hidden"} bg-gray-200 border-[1.5px] border-gray-300 px-4 py-2 rounded-lg text-black hover:shadow`}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default PeopleList;
