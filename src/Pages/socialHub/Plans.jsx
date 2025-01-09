import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
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
        `Access to community support (response within 48 hours)`,
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
      discount: "15%",
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
      discount: "25%",
      isActive: false,
      features: [
        "Earn 36 coins per comment",
        "Earn 38 coins per post and video interaction",
        "Daily coin bonus: 350 coins",
        "Access to priority support (response within 6 hours)",
        "Advanced analytics with actionable insights",
        "Early access to experimental features",
        "Invitations to exclusive and private events",
        <>
          <span className="flex items-center text-blue-600 font-semibold">
            <BiSolidOffer className="mr-2" /> Ghostly Vision Inside the Project
          </span>
        </>,
        "*Priority:* Enhanced priority in all systems and activities",
      ],
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex max-sm:flex-col items-center justify-between bg-gradient-to-r from-blue-200 to-blue-50 p-6 rounded-lg shadow-md animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-800">Choose Your Plan</h2>
        <Coins title="Your Balance: " className="-mt-4 max-sm:mb-4 bg-white shadow-lg rounded-lg p-4" />
      </div>
      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Plans Section */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`${
                userPlan === plan.planName
                  ? "border-4 border-blue-400 shadow-2xl"
                  : "shadow-md"
              } bg-white rounded-lg p-8 flex flex-col flex-1 transform transition-transform hover:scale-105 relative`}
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg shadow-md">
                Seal
              </div>
              {plan.discount && (
                <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-br-lg shadow-md flex items-center">
                  <BiSolidOffer className="mr-1" /> {plan.discount} OFF
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-2xl ${
                    userPlan === plan.planName ? "text-blue-600" : "text-gray-800"
                  } font-bold`}
                >
                  {plan.title}
                </h3>
                {userPlan === plan.planName && expirationDate && (
                  <p className="text-gray-600 text-sm font-medium">
                    Expiration Date: <br />
                    <span className="font-semibold text-blue-500">
                      {formatDate(expirationDate)}
                    </span>
                  </p>
                )}
              </div>
              <p className="text-gray-600 mb-6 italic">{plan.text}</p>
              <p className="text-5xl font-extrabold mb-6 text-gray-900">
                {plan.price}
                <span className="text-lg text-blue-500 ml-1 font-semibold">
                  coins
                </span>
              </p>
              <ul className="mb-8 flex-grow space-y-2">
                {plan.features &&
                  plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <FaCheck className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
              </ul>
              {userPlan !== plan.planName && plan.planName === null ? (
                <div className="text-center text-blue-500 font-semibold py-2 px-4 bg-blue-50 rounded-lg">
                  Default Plan
                </div>
              ) : (
                <button
                  onClick={() => handleSubscribePlan(plan.planName)}
                  className={`${
                    userPlan === plan.planName
                      ? "pointer-events-none bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white font-semibold rounded-lg py-3 px-6 shadow-lg transition-all`}
                >
                  {userPlan === plan.planName ? "Current" : "Choose"} Plan
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Feature Spotlight Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            Feature Spotlight
          </h3>
          <div className="flex items-center mb-4">
            <BiSolidOffer className="text-3xl text-blue-500 mr-4" />
            <p className="text-gray-700">
              <strong>Ghostly Vision</strong> – A cutting-edge feature that
              provides advanced insights and visuals, enhancing your overall
              experience.
            </p>
          </div>
          <p className="text-gray-600">
            Available exclusively for <strong>Super VIP</strong> users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;
