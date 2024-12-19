import axios from "axios";
import { API } from "../Api/Api";
import Cookies from "js-cookie";
import sweetalert from "../Utils/sweetalert";
const useCoinsActionsHook = () => {
  // Get coins balance
  const getCoins = async ({ setCoins }) => {
    try {
      const response = await axios.get(API.getBalance);
      console.log(response.data);
      setCoins(response.data);
    } catch (error) {
      console.error("Error fetching coins balance:", error);
    }
  };

  // Collect bonus coins
  const collectBonusCoins = async ({
    userId,
    setIsAvailable,
    calculateTimeLeft,
  }) => {
    try {
      const response = await axios.put(API.bonusBalance, {
        userId: userId,
      });
      if (response.status === 200) {
        sweetalert.done("You have collected your bonus coins");
        getCoins({ setCoins: response.data });
        Cookies.set("lastCollected", Date.now().toString()); // Store the last collected time in cookies
        setIsAvailable(false);
        calculateTimeLeft(); // Recalculate time left
      }
    } catch (error) {
      sweetalert.error("Failed to collect bonus coins. Please try again later");
      console.error("Error collecting coins:", error);
    }
  };

  return { getCoins, collectBonusCoins };
};

export default useCoinsActionsHook;
