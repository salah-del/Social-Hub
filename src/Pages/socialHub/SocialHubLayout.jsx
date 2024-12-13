import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getCurrUser } from "../../Redux/slices/userSlice";
import PersistentLayout from "./PersistentLayout";
const  SocialHubLayout = () =>  {
  const dispatch = useDispatch();
  const userID = Cookies.get('userID');
  useEffect(() => { 
    if (userID)  {  
      dispatch(getCurrUser(userID));        
    }
  }, [dispatch])
  
  return (
    <PersistentLayout>
      <Outlet />
    </PersistentLayout>
  );
}

export default SocialHubLayout;