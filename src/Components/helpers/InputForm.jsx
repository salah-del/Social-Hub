const InputForm = ({
  labelName,
  type,
  name,
  value,
  onChange,
  onBlur,
  condition,
  placeholder,
  errorMessage,
}) => {
  return (
    <div className="">
      <div className=" w-full  flex items-center justify-between gap-1  text-sm font-medium text-gray-700 ">
        <p className="mb-2">{labelName}</p>
        {condition && (
          <p className="py-0.5 px-4 mb-1 bg-red-100 text-red-500 rounded-sm">
            {errorMessage}
          </p>
        )}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 ${
          condition
            ? "outline-red-400 border-red-400"
            : "focus:outline-gray-400"
        }  `}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
