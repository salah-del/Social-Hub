import axios from "axios";
import { API } from "../Api/Api";
import Cookies from "js-cookie";
import { useState } from "react";
const userID = Cookies.get("userID");
const PlanActionsHook = () => {
  const [userPlan, setUserPlan] = useState("");
  const getUserPlan = async () => {
    try {
      const response = await axios.get(`${API.getUserPlanById}/${userID}`);
      setUserPlan(response.data.planType);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user plan:", error);
    }
  };

  return { getUserPlan, userPlan };
};

export default PlanActionsHook;
