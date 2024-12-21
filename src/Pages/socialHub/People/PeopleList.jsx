import React, { useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";
import { FaSearch } from "react-icons/fa";
import { API } from "../../../Api/Api";
import axios from "axios";

const PeopleList = () => {
  const friends = [
    {
      id: 1,
      name: "John Doe",
      mutualFriends: 3,
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      mutualFriends: 5,
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Emily Johnson",
      mutualFriends: 2,
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 1,
      name: "John Doe",
      mutualFriends: 3,
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      mutualFriends: 5,
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Emily Johnson",
      mutualFriends: 2,
      avatar: "https://via.placeholder.com/150",
    },
  ];
  const [people, setPeople] = useState([]);
  const getAllPeople = async () => {
    try {
      const response = await axios.get(API.getAllUsers);
      setPeople(response.data);
      console.log(response);
    } catch (error) {
      if (!error.response) {
        console.error("Network error:", error.message);
      }
      if (error.response?.data) {
        console.error("Backend error:", error.response.data);
      }
      console.error("Unexpected error:", error.message);
    }
  };

  useEffect(() => {
    getAllPeople();
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
      <div className="grid grid-cols-1 min-[1200px]:grid-cols-2  gap-6">
        {people.map((person , index) => (
          <PeopleCard key={index} person={person} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-[18px]">
        <button onClick={() => getAllPeople()} className="bg-gray-200 border-[1.5px] border-gray-300 px-4 py-2 rounded-lg text-black hover:shadow">
          Show More
        </button>
      </div>
    </div>
  );
};

export default PeopleList;
