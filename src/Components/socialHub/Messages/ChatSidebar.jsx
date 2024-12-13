import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../Redux/slices/getUserById";
const ChatSidebar = ({ setSelectedChat }) => {
  const contacts = [
    { id: 1, name: "Ahmed", lastMessage: "Hi, how are you?" },
    { id: 2, name: "Khaled", lastMessage: "See you soon!" },
    { id: 3, name: "Mona", lastMessage: "Let's catch up!" },
  ];

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [myContacts, setMyContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (user?.SubscribersOrFollowers?.length > 0) {
        try {
          // جلب البيانات باستخدام Promise.all
          const contacts = await Promise.all(
            user.SubscribersOrFollowers.map((id) =>
              dispatch(getUserById(id)).unwrap()
            )
          );
          setMyContacts(contacts);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };

    fetchContacts();
  }, [user, dispatch]);

  console.log(myContacts)


  
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);
  // let [myContactsId, setMyContactsId] = useState([]);
  // useEffect(() => {
  //   if (user !== null) {
  //     setMyContactsId(user.SubscribersOrFollowers);
  //   }
  // }, [user]);
  // console.log(myContactsId);

  // const { getUser, status, error, hasFetched } = useSelector(
  //   (state) => state.getUser
  // );
  // let [myContacts, setMyContacts] = useState([]);
  // useEffect(() => {
  //   if (myContactsId.length > 0) {
  //     const contacts = [];
  //     myContactsId.forEach((contact) => {
  //       dispatch(getUserById(contact));
  //       contacts.push(getUser);
  //     });
  //     setMyContacts(contacts);
  //   }
  // }, [myContactsId]);

  // console.log(myContacts);

  return (
    <div className="w-full sm:w-1/4 bg-white border-r border-gray-300 p-4">
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
      </div>

      {/* Contacts List */}
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-200 cursor-pointer rounded-md"
            onClick={() => setSelectedChat(contact)}
          >
            <FaUserCircle className="text-gray-500 text-2xl" />
            <div>
              <p className="font-semibold text-gray-700">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
