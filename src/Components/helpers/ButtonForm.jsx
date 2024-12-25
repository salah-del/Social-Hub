import Loader from "../../Utils/Loader";

const ButtonForm = ({ title, loading }) => {
  return loading ? (
    <div className="w-full justify-center h-[41px] mt-[16px] flex items-center">
      <Loader />
    </div>
  ) : (
    <button
      type="submit"
      className={`w-full bg-sec-color text-white border-[1px] border-main-color py-2 rounded-md hover:bg-main-color hover:border-sec-color trans `}
    >
      {title}
    </button>
  );
};

export default ButtonForm;
