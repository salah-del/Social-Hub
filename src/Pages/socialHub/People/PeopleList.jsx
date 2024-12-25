import React, { useEffect } from "react";
import PeopleCard from "./PeopleCard";
import { FaSearch } from "react-icons/fa";
import { useUsers } from "../../../Hooks/useUsers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PeopleList = () => {
  const {
    fetchAllUsers,
    handleSubscribe,
    handleUnsubscribe,
    handleAddFriend,
    users,
    status,
    error,
  } = useUsers();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="">
      <div className="flex max-[600px]:flex-col items-center justify-between">
        <h1 className="text-2xl font-bold mb-6 max-[600px]:mb-3">
          People You May Know
        </h1>
        <div className="relative block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 mb-5 placeholder-black bg-gray-200 rounded-lg border-[1.5px] border-gray-300 focus:outline-none focus:border-gray-400"
          />
          <FaSearch className="absolute left-3 top-3 text-black" />
        </div>
      </div>
      <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 gap-6">
        {status === "loading"
          ? // عرض Skeleton أثناء التحميل
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center max-[540px]:flex-col max-[540px]:gap-2 p-5 bg-gray-100 shadow border border-gray-300 rounded-lg transition-shadow duration-200"
              >
                {/* صورة المستخدم */}
                <Skeleton circle width={96} height={96} />

                {/* بيانات المستخدم */}
                <div className="ml-4 flex-1  space-y-1">
                  <Skeleton height={24} width="65%" />
                  <Skeleton height={18} width="50%" />
                </div>

                {/* أزرار الإجراءات */}
                <div className="ml-4 flex flex-col max-[540px]:flex-row max-[365px]:flex-col items-end gap-2">
                  <Skeleton height={35} width={120} />
                  <Skeleton height={35} width={120} />
                </div>
              </div>
            ))
          : users?.map((person, index) => (
              <PeopleCard
                key={index}
                person={person}
                handleSubscribe={handleSubscribe}
                handleUnsubscribe={handleUnsubscribe}
                handleAddFriend={handleAddFriend}
              />
            ))}
      </div>
      <div className="flex items-center justify-center mt-[18px]">
        <button
          onClick={() => fetchAllUsers()}
          className="bg-gray-200 border-[1.5px] border-gray-300 px-4 py-2 rounded-lg text-black hover:shadow"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default PeopleList;
