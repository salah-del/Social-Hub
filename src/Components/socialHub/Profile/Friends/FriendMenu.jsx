import React, { useEffect, useState, useRef } from "react";
import { FaEllipsisV, FaUser } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import CoinsActionsHook from "../../../../Hooks/CoinsActionsHook";
import { useUsers } from "../../../../Hooks/useUsers";
import sweetalert from "../../../../Utils/sweetalert";
import { Link } from "react-router-dom";
export default function FriendMenu({ friend, edit }) {
  const { blockUsers, unBlockUsers } = useUsers();
  const menuRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [loadingSendCoins, setloadingSendCoins] = useState(false);
  const [dataSendCoins, setDataSendCoins] = useState({
    recipientName: friend.friendName,
    amount: "",
  });

  const { SendCoins, getCoins } = CoinsActionsHook();

  const handleCloseMenu = () => {
    setIsOpen(false);
    setShowInput(false);
  };

  const handleSendCoins = async () => {
    if (dataSendCoins.amount) {
      await SendCoins(setloadingSendCoins, dataSendCoins);
      setDataSendCoins({ ...dataSendCoins, amount: "" });
      // await  getCoins();
      handleCloseMenu();
      setShowInput(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = friend.friendName;
    navigator.clipboard.writeText(textToCopy);
    handleCloseMenu();
  };

  const handleBlockUser = async () => {
    handleCloseMenu();
    const result = await sweetalert.deleteOrNot({
      title: `Do you want to block this friend?`,
      confirmBtn: "Block",
      cancelBtn: "Cancel",
    });
    if (result.isConfirmed) {
      await blockUsers({ userToBlockId: friend.friendId });
    }
  };

  const handleUnBlockUser = async () => {
    await unBlockUsers({ userToUnblockId: friend.friendId });
    handleCloseMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowInput(false);
        }}
      >
        <FaEllipsisV size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg z-10">
          <ul className="rounded-lg">
            <li
              className={`${showInput ? "bg-gray-100" : ""} flex flex-col items-start px-4 py-2 text-gray-700 rounded-t-lg hover:bg-gray-100 cursor-pointer`}
              onClick={() => setShowInput(true)}
            >
              <div className="flex items-center">
                <BsFillSendFill size={16} className="mr-2" />
                Send Coins
              </div>
              {showInput && (
                <div className="w-full mt-2">
                  <input
                    type="number"
                    value={dataSendCoins.amount}
                    onChange={(e) =>
                      setDataSendCoins({
                        ...dataSendCoins,
                        amount: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec-color"
                    placeholder="Enter amount"
                  />
                  <button
                    className="mt-2 w-full bg-sec-color text-white py-2 rounded-md hover:bg-main-color transition"
                    onClick={handleSendCoins}
                  >
                    {loadingSendCoins ? "Sending..." : "Send"}
                  </button>
                </div>
              )}
            </li>
            {showInput && (
              <MdCancel
                onClick={() => setShowInput(false)}
                size={18}
                className="ml-[100px]  text-red-500 absolute top-2 right-2 cursor-pointer"
              />
            )}
            {
              <Link
                to={`/socialHub/profile/${friend.friendId}`}
                className="flex items-center px-4 py-2  text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={handleCloseMenu}
              >
                <FaUser size={16} className="mr-2" />
                View Profile
              </Link>
            }
            <li
              className="flex items-center px-4 py-2 rounded-t-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleCopy}
            >
              <IoCopy size={16} className="mr-2" />
              Copy Name
            </li>
            <li
              className="flex items-center text-red-500 px-4 rounded-b-lg py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleBlockUser}
            >
              <FaBan size={16} className="mr-2" />
              Block
            </li>
            <li
              className="flex items-center text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleUnBlockUser}
            >
              <CgUnblock size={18} className="mr-1.5 " />
              Unblock
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
