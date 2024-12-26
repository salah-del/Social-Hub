import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Coins from "../../Components/socialHub/Navbar/Coins";
import PlanActionsHook from "../../Hooks/PlansActionsHook";
import { formatDate } from "../../Utils/formatDate";
const Plans = () => {
  const loc = useLocation();
  const {
    getUserPlan,
    userPlan,
    handleSubscribePlan,
    currentUserPlanExpiration,
    expirationDate,
  } = PlanActionsHook();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  useEffect(() => {
    getUserPlan();
  }, []);

  useEffect(() => {
    userPlan === null || userPlan === "" ? "" : currentUserPlanExpiration();
  }, [userPlan]);

  const plans = [
    {
      planName: null,
      title: "Free",
      text: "For individuals just getting started",
      price: "0",
      isActive: true,
      features: [
        "Earn 5 coins per comment",
        "Earn 8 coins per post and video interaction",
        "Daily coin bonus: 50 coins",
        `Access to community support (response within 48 hours)`,
        `Basic analytics for your content`,
      ],
    },
    {
      planName: "business",
      title: "Business",
      text: "For individuals just getting started",
      price: "5000",
      isActive: false,
      features: [
        "Earn 15 coins per comment",
        "Earn 18 coins per post and video interaction",
        "Daily coin bonus: 150 coins",
        `Access to priority support (response within 24 hours)`,
        `Weekly analytics report to optimize content`,
        `Customizable dashboard`,
      ],
    },
    {
      planName: "vip",
      title: "VIP",
      text: "For individuals just getting started",
      price: "6500",
      isActive: false,
      features: [
        "Earn 30 coins per comment",
        "Earn 35 coins per post and video interaction",
        "Daily coin bonus: 250 coins",
        `Access to priority support (response within 12 hours)`,
        `Advanced analytics reports with insights`,
        `Early access to new features`,
        `Invitations to exclusive events`,
      ],
    },
    {
      planName: "superVIP",
      title: "Super VIP",
      text: "For individuals just getting started",
      price: "8000",
      isActive: false,
      features: [
        "Earn 36 coins per comment",
        "Earn 38 coins per post and video interaction",
        "Daily coin bonus: 350 coins",
        `Access to priority support (response within 6 hours)`,
        `Advanced analytics with actionable insights`,
        `Early access to experimental features`,
        `Invitations to exclusive and private events`,
        `*New Feature:* Ghostly vision inside the project`,
        `*Priority:* Enhanced priority in all systems and activities`,
      ],
    },
  ];
  return (
    <div className="w-full max-w-7xl">
      <div className="flex max-sm:flex-col  items-center justify-between">
        <h2 className="text-3xl font-bold mb-6">Choose Your Plan</h2>
        <Coins title="Your Balance: " className="-mt-4 max-sm:mb-4 bg-white" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2  gap-8">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`${
              userPlan === plan.planName
                ? "border-sec-color border shadow-xl"
                : "shadow-md"
            } bg-white rounded-lg  p-6 flex flex-col flex-1`}
          >
            <div className="flex items-center justify-between">
              <h3
                className={`text-xl ${
                  userPlan === plan.planName ? "text-main-color" : ""
                } font-semibold mb-4`}
              >
                {plan.title}
              </h3>
              {userPlan === plan.planName && expirationDate && (
                <p className="text-gray-600 text-sm font-medium mb-4">
                  Expiration Date:{" "}
                  <span className="font-semibold text-main-color">
                    {formatDate(expirationDate)}
                  </span>
                </p>
              )}
            </div>
            <p className="text-gray-600 mb-4">{plan.text}</p>
            <p className="text-4xl font-bold mb-6">
              {plan.price}
              <span className="text-[16px] text-sec-color ml-1 font-semibold">
                coins
              </span>
            </p>
            <ul className="mb-6 flex-grow">
              {plan.features &&
                plan.features.map((feature) => (
                  <li key={feature} className="flex items-center mb-2">
                    <FaCheck className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
            </ul>
            {userPlan !== plan.planName && plan.planName === null ? (
              <div className={`text-center text-main-color py-2 px-4 `}>
                Default Plan
              </div>
            ) : (
              <button
                onClick={() => handleSubscribePlan(plan.planName)}
                className={`${
                  userPlan === plan.planName
                    ? " pointer-events-none bg-gray-600"
                    : " bg-main-color hover:bg-sec-color"
                } text-white rounded-md py-2 px-4  trans`}
              >
                {userPlan === plan.planName ? "Current" : "Choose"} Plan
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
