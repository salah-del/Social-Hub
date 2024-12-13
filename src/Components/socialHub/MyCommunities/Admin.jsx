import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../../../Redux/slices/userDataSlice';
import LazyImage from '../../../Utils/LazyImage';
import Skeleton from 'react-loading-skeleton';
import { FaUserCircle } from "react-icons/fa";

const Admin = ({admin}) => {
    // Get admin's pic 
    const {userData:adminData, status, error} = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(fetchUserData(admin._id));
    }, [])
    console.log(adminData);
    return (
        <>
            {
                status === 'loading' && 
                <div className='w-fit flex gap-1'>
                    <div className="w-6 h-6 rounded-full">
                        <Skeleton height="100%" width="100%" borderRadius={"100%"} />
                    </div>
                    <div className='w-56 h-3 rounded-sm'>
                        <Skeleton height="100%" width="100%" borderRadius={"3px"} />
                    </div>
                </div>
            }
            {status == 'succeeded' && <div  className="flex gap-1 items-center">
                
                { adminData && adminData.profilePicture ? (
                <LazyImage
                    className="max-w-6 h-6 rounded-full"
                    src={adminData.profilePicture}
                    loader={
                        <div className="w-6 h-6 rounded-full">
                        <Skeleton height="100%" width="100%" borderRadius={"100%"} />
                        </div>
                    }
                    />
                ) : (
                    <FaUserCircle className="text-gray-300 w-6 h-6" />
                )}
                <p className="text-xs text-gray-600">{admin.name}</p>
            </div>}
        </>
    )
}

export default Admin