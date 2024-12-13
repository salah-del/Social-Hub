import axios from "axios";
import { useState, useEffect } from "react";
import { RiCoinsLine } from "react-icons/ri";
import { API } from "../../../Api/Api";

const Coins = ({title, className}) => {
  const [coins, setCoins] = useState({ balance: 0 }); // Default balance value

  useEffect(() => {
    const getCoins = async () => {
      try {
        const response = await axios.get(API.getBalance);
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coins balance:", error);
      }
    };
    getCoins();
  }, []);

  return (
    <div
      className={`${className} flex items-center space-x-1.5 bg-c-bg2 rounded-md p-1.5 shadow-md hover:shadow-lg transition-shadow duration-200`}
    >
      <RiCoinsLine className="text-3xl text-main-color hover:text-sec-color" />
      <span className="text-lg font-semibold text-gray-700">
        {`${title}${coins.balance} Coins`}
      </span>
    </div>
  );
};

export default Coins;
