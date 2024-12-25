import { TbGiftFilled, TbGiftOff } from "react-icons/tb";
import CoinsActionsHook from "../../../Hooks/CoinsActionsHook";
const DailyBonus = () => {
  const { dailyBonus, isSuccess } = CoinsActionsHook();

  return (
    <div className="relative">
      <button
        onClick={dailyBonus}
        disabled={!isSuccess}
        className="text-main-color relative mt-1 -mr-0.5"
      >
        {isSuccess ? (
          <TbGiftFilled size={25} className="animate-spin-slow" />
        ) : (
          <TbGiftOff size={25} className="cursor-not-allowed" />
        )}
      </button>
    </div>
  );
};

export default DailyBonus;
