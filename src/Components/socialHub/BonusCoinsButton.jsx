import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { API } from "../../Api/Api";
import { PiHandCoinsBold } from "react-icons/pi";
import sweetalert from "../../Utils/sweetalert";
const BonusCoinsButton = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const userId = Cookies.get("userID");

  const calculateTimeLeft = () => {
    const lastCollected = Cookies.get("lastCollected");
    if (lastCollected) {
      const lastTime = new Date(parseInt(lastCollected));
      const currentTime = new Date();
      const difference = 24 * 60 * 60 * 1000 - (currentTime - lastTime); // 24 hours
      if (difference > 0) {
        setTimeLeft(difference);
        setIsAvailable(false);
      } else {
        setTimeLeft(null);
        setIsAvailable(true);
      }
    } else {
      setIsAvailable(true); // First time available
    }
  };

  // Function to collect bonus coins
  const collectBonusCoins = async () => {
    try {
      const response = await axios.put(API.bonusBalance, {
        userId: userId,
      });
      if (response.status === 200) {
        sweetalert.done("You have collected your bonus coins");
        Cookies.set("lastCollected", Date.now().toString()); // Store the last collected time in cookies
        setIsAvailable(false);
        calculateTimeLeft(); // Recalculate time left
      }
    } catch (error) {
      sweetalert.error("Failed to collect bonus coins. Please try again later");
      console.error("Error collecting coins:", error);
    }
  };

  useEffect(() => {
    calculateTimeLeft(); // Check availability on load
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev !== null) {
          const updatedTime = prev - 1000; // Reduce 1 second
          if (updatedTime <= 0) {
            setIsAvailable(true);
            clearInterval(interval);
            return null;
          }
          return updatedTime;
        }
        return prev;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Function to format time left into hours, minutes, and seconds
  const formatTimeLeft = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="fixed -bottom-6 -right-6 transform -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-2">
      {isAvailable ? (
        <div
          onClick={collectBonusCoins}
          className="bg-main-color text-white text-sm font-bold px-4 py-1 rounded-lg shadow-lg cursor-pointer"
        >
          Daily <br /> Coins
          <PiHandCoinsBold size={25} />
        </div>
      ) : (
        <p className="text-main-color text-center mt-7 -mr-5">
          The button will be available <br /> in:{" "}
          {timeLeft && formatTimeLeft(timeLeft)}
        </p>
      )}
    </div>
  );
};

export default BonusCoinsButton;
