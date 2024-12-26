import axios from "axios";
import { API } from "../Api/Api";
import Cookies from "js-cookie";
import { useState } from "react";
import sweetalert from "../Utils/sweetalert";
const userID = Cookies.get("userID");
const PlansActionsHook = () => {
  const [userPlan, setUserPlan] = useState("");
  const getUserPlan = async () => {
    try {
      const response = await axios.get(`${API.getUserPlanById}/${userID}`);
      setUserPlan(response.data.planType);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching user plan:", error);
    }
  };

  const handleSubscribePlan = async (planName) => {
    try {
      const response = await axios.post(API.subscribePlan, {
        planType: planName,
      });
      sweetalert.done(response.data.message);
      getUserPlan();
      console.log(response);
    } catch (error) {
      sweetalert.info(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return { getUserPlan, userPlan , handleSubscribePlan };
};

export default PlansActionsHook;
