import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { API } from "../../Api/Api";
import { setUser } from "../../Redux/slices/userSlice";
import PersistentLayout from "./PersistentLayout";
const  SocialHubLayout = () =>  {
  const dispatch = useDispatch();
  const userID = Cookies.get('userID');
  useEffect(() => { 
    if (userID)  {  
      const getUserToRedux = async () => {
        const userData = await axios.get(`${API.getUserById}/${userID}`);
        dispatch(setUser(userData.data));        
      }
      getUserToRedux();
    }
  }, [dispatch])
  
  return (
    <PersistentLayout>
      <Outlet />
    </PersistentLayout>
  );
}

export default SocialHubLayout;