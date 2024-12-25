import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiCoinsLine } from "react-icons/ri";
import CoinsActionsHook from "../../../Hooks/CoinsActionsHook";

const Coins = ({ title, className }) => {
  const { getCoins, coins, loading } = CoinsActionsHook();

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div
      className={`${className} flex items-center space-x-1.5 bg-c-bg2 rounded-md p-1.5 shadow-md hover:shadow-lg transition-shadow duration-200`}
    >
      <RiCoinsLine className="text-3xl text-main-color hover:text-sec-color" />
      <span className="text-lg font-semibold text-gray-700">
        {loading ? (
          <Skeleton width={100} height={20} />
        ) : (
          `${title}${coins.balance} Coins`
        )}
      </span>
    </div>
  );
};

export default Coins;
