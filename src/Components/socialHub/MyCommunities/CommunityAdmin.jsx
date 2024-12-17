import { memo } from "react";
import Admin from "./Admin";


const CommunityAdmin = memo(({admin}) => {
    
    return (
        <div className="flex flex-col p-2  select-none cursor-pointer  rounded-md">
            {
                admin && admin.map((admin) => ( 
                        <Admin key={admin._id} admin={admin} />
                ))
            }
        </div>
)})

export default CommunityAdmin