import { useCallback, useState } from 'react';
import { LuEye, LuEyeOff } from "react-icons/lu";
// import loginBackground from "../assets/loginBackground.webp";
import Loader from './../utils/Loader';


const  Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    
    
    const handleSubmit = ((e) => {
        e.preventDefault();
        let valid = true ;
        if (!checkIfUsernameValid() ) valid = false ;
        if (!checkIfPasswordValid() ) valid = false ;
        if (valid) { 
            // login
            console.log("Fine");
            
        }
    });
    
    
    const changeusername = (e) => { 
        setUsername(e.target.value);
    }
    const changePassword = (e) => { 
        setPassword(e.target.value);
    }

    const checkIfUsernameValid = useCallback(() => { 
        
        if (!username){
            setUsernameError("Please enter your username");
            return false;
        }
        setUsernameError("");
        return true ;
    }, [username])
    
    const checkIfPasswordValid = useCallback(() => { 
        
        if (!password) { 
            setPasswordError("Please enter your password");
            return false;
        }
        
        setPasswordError("");
        return true ;
    }, [password])

    const toggleShowPassword = () => { 
        setShowPassword(prev => !prev);
    }
    
    
    return (
        <div className="w-full h-[calc(100vh-72px)] md:h-[calc(100vh-70px)] flex items-center justify-center">
        
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md border w-11/12 sm:w-[450px]">
                <h2 className="text-2xl font-bold text-center mb-2">Login to Account</h2>
                <p className="text-gray-600 text-center text-sm mb-6">
                    Please enter your username and password to continue
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={`focus:border-main-color `}>
                        <div className=" w-full  flex items-center justify-between  text-sm font-medium text-gray-700 ">
                        <p className='mb-2'>User name:</p>
                        {usernameError && <p className='py-0.5 px-4 mb-1 bg-red-100 text-red-500 rounded-sm'>{usernameError}</p>}
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={changeusername}
                            className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 ${usernameError ? "outline-red-400 border-red-400" : "focus:outline-gray-400"}  `}
                            placeholder="Enter your username"
                        />
                    </div>
                    
                    <div className=''>
                        <div className="flex w-full items-center justify-between text-sm font-medium text-gray-700 ">
                        <p className='mb-2'>Password:</p>
                        {passwordError && <p className='py-0.5 px-4 mb-1 bg-red-100 text-red-500 rounded-sm'>{passwordError}</p>}
                        </div>
                        <div className='relative'>
                        <input
                            type={showPassword ? "text" :"password"}
                            placeholder='• • • • • • • • •'
                            value={password}
                            onChange={changePassword}
                            className={`w-full relative p-2 outline-1 border-2 rounded-md bg-gray-50 ${passwordError ? "outline-red-400 border-red-400" : "focus:outline-gray-400"} `}
                            
                        />
                        {password.length > 0 &&<button type='button' onClick={toggleShowPassword} className=' absolute top-1/2 -translate-y-1/2 right-2 '>
                            {showPassword && <LuEyeOff />}
                            {!showPassword && <LuEye />}
                        </button>}
                        
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
                    
                    {<button
                        type="submit"
                        className={`w-full bg-sec-color text-white border-[1px] border-main-color py-2 rounded-md hover:bg-main-color trans `}
                    >
                        Login
                    </button>}
                    {/* {<div className='w-full justify-center h-[41px] mt-[16px] flex items-center'>
                        <Loader /> 
                    </div>} */}
                </form>
                
            </div>
        </div>
    );
}

export default Login;