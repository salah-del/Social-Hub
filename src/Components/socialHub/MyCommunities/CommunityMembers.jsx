import { memo } from "react";
import Member from './Member';

const CommunityMembers = memo(({members}) => {
    return (
        <div className="flex    select-none cursor-pointer  rounded-md">
            {
                members && members.map((member, index) => ( 
                    <Member key={member._id} member={member} index={index} />
                ))
            }
        </div>
)})

export default CommunityMembers