import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { signupUser } from "../../Redux/slices/userSlice";
import Loader from "../../Utils/Loader";

const OTPField = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const location = useLocation();
  const emailFromSignup = location.state?.email || "";
  const usernameFromSignup = location.state?.name || "";
  const passwordFromSignup = location.state?.password || "";
  const status  = useSelector((state) => state.user.status);
  const verifyRef = useRef(null);
  
  const handleKeyDown = (e) => {
    const index = inputRefs.current.indexOf(e.target);

    if (index === -1) return;

    if (e.key === "Backspace") {
      e.preventDefault();

      if (index > 0 && !otp[index]) {
        inputRefs.current[index - 1].focus();
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
      } else {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index),
          "",
          ...prevOtp.slice(index + 1),
        ]);
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);

    if (index === -1 || !target.value) return;

    setOtp((prevOtp) => [
      ...prevOtp.slice(0, index),
      target.value,
      ...prevOtp.slice(index + 1),
    ]);

    if (index === otp.length - 1) {
      if(verifyRef && verifyRef.current){ 
        verifyRef.current.focus();
      }
    } else {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) return;

    const digits = text.split("").slice(0, otp.length);
    setOtp(digits);

    if (digits.length === otp.length) {
      if(verifyRef && verifyRef.current) 
        verifyRef.current.focus();
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSignupWithOTP = async () => { 
    // handle convert otp array to string and send it to the below function
    const values = {
      name: usernameFromSignup,
      email: emailFromSignup,
      password: passwordFromSignup,
      otp: otp.join("")
    }
    const res = await dispatch(signupUser(values)).unwrap();
    if (res) {
      navigate("/login", {
        state: { name: usernameFromSignup, password: passwordFromSignup },
      });
    }
  }


  // if these states are nulls mean that u didn't come from signUp so return to home page again
  if(!emailFromSignup || !usernameFromSignup || !passwordFromSignup)
    return <Navigate to={'/'} replace /> ;


  return (
    <section className="w-full h-[calc(100vh-72px)] md:h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="bg-white  rounded-lg shadow-md border w-11/12 sm:w-[550px]">
        <h2 className="text-2xl pt-4 sm:pt-8 font-bold text-center mb-2">
          Verify your Account
        </h2>
        <p className="text-gray-600 text-center text-xs sm:text-sm mb-6">
          Enter the 6 digit code we sent to {emailFromSignup}
        </p>
        <div className="w-full flex flex-col gap-8 items-center py-8 bg-gray-50 rounded-md">
          <div id="otp-form" className="flex  items-center justify-center gap-1 sm:gap-2 mx-auto">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                autoFocus={index === 0}
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="shadow-xs flex w-9 h-9 sm:w-14 sm:h-14 items-center justify-center rounded-lg border border-gray-300 focus:border-main-color bg-white  text-center text-sm sm:text-lg font-medium text-gray-500 outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center gap-5">
            <Link  to={'/signup'}
              className={`w-fit px-4 border-main-color text-main-color hover:bg-gray-100  border-[1px] hover:border-main-color py-2 rounded-md  trans `}
            >
              Sign up again
            </Link>
            {status !== "loading" && <button
              type="submit"
              ref={verifyRef}
              onClick={handleSignupWithOTP}
              className={`w-fit px-3 bg-main-color text-white border-[1px] border-main-color py-2 rounded-md hover:bg-sec-color  trans `}
            >
              Verify your email
            </button>}
            {status === "loading" && (
              <div className="w-[143.5px] justify-center h-[41.5px] mt-[16px] flex items-center">
                <Loader />
              </div>
            )}
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default OTPField;
