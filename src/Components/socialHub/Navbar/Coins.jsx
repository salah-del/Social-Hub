import axios from "axios";
import { useState, useEffect } from "react";
import { RiCoinsLine } from "react-icons/ri";
import useCoinsActionsHook from "../../../Hooks/useCoinsActionsHook";
const Coins = ({ title, className }) => {
  const { getCoins } = useCoinsActionsHook();
  const [coins, setCoins] = useState({ balance: 0 });

  useEffect(() => {
    getCoins({ setCoins });
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
