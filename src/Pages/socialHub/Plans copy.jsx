import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
const Plansaa = () => {
  const plansData = [
    {
      title: "Free",
      price: "0.00",
      color: "#22c55e",
      features: [
        { text: "Access All Text Lessons", available: true },
        { text: "Access All Videos Lessons", available: true },
        { text: "Appear On Leaderboard", available: true },
        { text: "Browse Content Without Ads", available: false },
        { text: "Access All Assignments", available: false },
      ],
    },
    {
      title: "Basic",
      price: "7.99",
      color: "#0075ff",
      features: [
        { text: "Access All Text Lessons", available: true },
        { text: "Access All Videos Lessons", available: true },
        { text: "Appear On Leaderboard", available: true },
        { text: "Browse Content Without Ads", available: true },
        { text: "Access All Assignments", available: true },
      ],
    },
    {
      title: "Basic",
      price: "7.99",
      color: "#f59e0b",
      features: [
        { text: "Access All Text Lessons", available: true },
        { text: "Access All Videos Lessons", available: true },
        { text: "Appear On Leaderboard", available: true },
        { text: "Browse Content Without Ads", available: true },
        { text: "Access All Assignments", available: true },
      ],
    },
    {
      title: "Basic",
      price: "7.99",
      color: "#dc3237",
      features: [
        { text: "Access All Text Lessons", available: true },
        { text: "Access All Videos Lessons", available: true },
        { text: "Appear On Leaderboard", available: true },
        { text: "Browse Content Without Ads", available: true },
        { text: "Access All Assignments", available: true },
      ],
    },
  ];
  return (
    <div className="mx-auto px-3 sm:px-4 lg:px-5">
      <h1 className="text-3xl font-bold mb-8 text-c-bg1  relative">
        Plans Prices
        <span className="absolute left-[38px] -translate-x-1/2 -bottom-2 w-[72px] h-1 bg-main-color rounded"></span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {plansData.map((plan, index) => (
          <div
            key={index}
            className="bg-c-bg1 text-white rounded  shadow-lg p-5 text-center"
          >
            <div
              className={`bg-[${plan.color}] border-[3px] border-c-bg1 text-center outline  outline-4 outline-[${plan.color}] p-4 mb-5`}
            >
              <h2 className="text-[25px] mr-4 font-bold mb-2">{plan.title}</h2>
              <p className="text-[30px] font-extrabold m-0 w-fit mx-auto relative">
                <span className="text-[25px] absolute top-0 left-[-20px]">
                  $
                </span>
                {plan.price}
              </p>
            </div>
            <ul class="p-0 ">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-[15px] py-[15px] boder border-b border-gray-600"
                >
                  <div className="flex items-center">
                    {feature.available ? (
                      <FaCheck className="inline-block mr-2 text-[#22c55e]" />
                    ) : (
                      <FaTimes className="inline-block mr-2 text-red-500" />
                    )}
                    <span>{feature.text}</span>
                  </div>
                  <FaCircleInfo className="inline-block ml-2 text-gray-300" />
                </li>
              ))}
            </ul>
            {index === 0 ? (
              <div className={`mt-5 text-gray-400`}>
                This Is Your Current Plan
              </div>
            ) : (
              <button
                className={`bg-[${plan.color}] mt-5 text-white px-4 py-2 rounded-md hover:opacity-80`}
              >
                Join Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plansaa;
