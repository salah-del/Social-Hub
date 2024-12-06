import axios from "axios";
import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../Api/Api";
const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [touched, setTouched] = useState({});
  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const validateForm = (values) => {
    const errors = {};

    // User Name Validation
    if (!values.name) {
      errors.name = "User Name is required";
    } else if (values.name.length < 3 || values.name.length > 20) {
      errors.name = "User Name must be between 3 and 20";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(values.name)) {
      errors.name = "User Name can only contain letters, numbers, and spaces";
    }

    // Email Validation
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) // Regex for email validation
    ) {
      errors.email = "Invalid email address";
    }

    // Password Validation
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors; // Returns an object with validation error messages
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(values);
    console.log(Object.keys(validationErrors).length);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show errors
      return;
    } else {
      // setErrors(validationErrors);
      console.log("Form submitted:", values);
    }

    try {
      const response = await axios.post(API.signup, values);
      console.log("Done");
      // toast.success("تم التسجيل بنجاح!");
      console.log("Response:", response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error");
      console.error("Error:", error.response || error.message);
      toast.error(error.response?.data?.message || "حدث خطأ ما، حاول لاحقًا!");
    }
  };

  useEffect(() => {
    setErrors(validateForm(values));
  }, [values]);

  return (
    <div className="w-full h-[calc(100vh-72px)] md:h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md border w-11/12 sm:w-[550px]">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create an Account
        </h2>
        <p className="text-gray-600 text-center text-sm mb-6">
          Create your account by filling in the details below
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`focus:border-main-color `}>
            <div className=" w-full  flex items-center justify-between  text-sm font-medium text-gray-700 ">
              <p className="mb-2">User Name:</p>
              {errors.name && (
                <p className="py-0.5 px-4 mb-1 bg-red-100 text-red-500 rounded-sm">
                  {errors.name}
                </p>
              )}
            </div>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 ${
                errors.name
                  ? "outline-red-400 border-red-400"
                  : "focus:outline-gray-400"
              }  `}
              placeholder="Enter your name"
            />
          </div>
          <div className={`focus:border-main-color `}>
            <div className=" w-full  flex items-center justify-between  text-sm font-medium text-gray-700 ">
              <p className="mb-2">Email:</p>
              {errors.email && (
                <p className="py-0.5 px-4 mb-1 bg-red-100 text-red-500 rounded-sm">
                  {errors.email}
                </p>
              )}
            </div>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 ${
                errors.email
                  ? "outline-red-400 border-red-400"
                  : "focus:outline-gray-400"
              }  `}
              placeholder="Enter your email"
            />
          </div>

          <div className="">
            <div className="flex w-full items-center justify-between text-sm font-medium text-gray-700 ">
              <p className="mb-2">Password:</p>
              {errors.password && (
                <p className="py-0.5 px-4 mb-1 bg-red-100 text-red-500 rounded-sm">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="• • • • • • • • •"
                name="password"
                value={values.password}
                onChange={handleChange}
                className={`w-full relative p-2 outline-1 border-2 rounded-md bg-gray-50 ${
                  errors.password
                    ? "outline-red-400 border-red-400"
                    : "focus:outline-gray-400"
                } `}
              />
              {values.password.length > 0 && (
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className=" absolute top-1/2 -translate-y-1/2 right-2 bg-[#f9fafb] p-2"
                >
                  {showPassword && <LuEyeOff />}
                  {!showPassword && <LuEye />}
                </button>
              )}
            </div>
          </div>

          {/* <div className="flex items-center justify-between ">
                        <label className="flex items-center text-sm text-gray-600 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            className="mr-1 mt-0.5 cursor-pointer"
                        />
                        Remember me
                        </label>
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                        Forget Password?
                        </a>
                    </div> */}

          {
            <button
              type="submit"
              className={`w-full bg-sec-color text-white border-[1px] border-main-color py-2 rounded-md hover:bg-main-color trans `}
            >
              Sign Up
            </button>
          }
          {/* {<div className='w-full justify-center h-[41px] mt-[16px] flex items-center'>
                        <Loader /> 
                    </div>} */}
        </form>
        <p className="text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-main-color hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
