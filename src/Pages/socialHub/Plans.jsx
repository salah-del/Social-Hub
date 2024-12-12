import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Plans = () => {

  const loc = useLocation();
  useEffect(() => { 
      window.scrollTo(0, 0);
  }, [loc.pathname])

  const plans = [
    {title:"Free", text: "For individuals just getting started", price: '0', isActive : true, features: ['1 User', '5GB Storage', 'Basic Support']},
    {title:"Business", text: "For individuals just getting started", price: '5000', isActive : false, features: ['1 User', '5GB Storage', 'Basic Support']},
    {title:"VIP", text: "For individuals just getting started", price: '6500', isActive : false, features: ['1 User', '5GB Storage', 'Basic Support']},
    {title:"Super VIP", text: "For individuals just getting started", price: '8000', isActive : false, features: ['1 User', '5GB Storage', 'Basic Support']}
  ]
  return (
    <div className="w-full max-w-7xl min-h-screen">
        <h2 className="text-3xl font-bold mb-16">Choose Your Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-8">
            {
              plans.map((plan) => 
                <div key={plan.title} className={`${plan.isActive ? "border-sec-color border shadow-xl" : "shadow-md"} bg-white rounded-lg  p-6 flex flex-col flex-1`}>
                  <h3 className={`text-xl ${plan.isActive ? "text-main-color" : ""} font-semibold mb-4`}>{plan.title}</h3>
                  <p className="text-gray-600 mb-4">{plan.text}</p>
                  <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-[16px] text-sec-color ml-1 font-semibold">coins</span></p>
                  <ul className="mb-6 flex-grow">
                      {plan.features && plan.features.map((feature) => 
                        <li key={feature} className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            {feature}
                        </li>
                      )}
                  </ul>
                  <button className={`${plan.isActive ? " pointer-events-none bg-gray-600" : " bg-main-color hover:bg-sec-color"} text-white rounded-md py-2 px-4  trans`}>{plan.isActive ? "Chosen" : "Choose"} Plan</button>
              </div>
              )
            }
        </div>
    </div>

  );
};

export default Plans;
