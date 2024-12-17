import { useState } from "react"
import Modal from "../../../Utils/Modal"
import axios from "axios"
import { API } from "../../../Api/Api"
import { showToast } from "../../../Utils/showToast"
import Loader from "../../../Utils/Loader"

const CreateCommunity = ({handleCreateCommunity, closeCreateModal}) => {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const createCommunity = (e) => { 
        e.preventDefault();
        if (validateName()) { 
            callBackend()
        }
        
    }

    const callBackend = async () => { 
        try {
            setLoading(true);
            const res = await axios.post(API.createCommunity, {name});
            if (res.data.community) { 
                console.log(res);
                handleCreateCommunity(res.data.community._id)
                showToast("success", res.data.message);
                closeCreateModal();
            }
        } catch (error) {
            setLoading(false);
        } finally{ 
            setLoading(false);
        }
    }

    const validateName = () => { 
        if (!name) { 
            setError(true);
            showToast("error", "Community name is required");
            return false
        }
        return true;
    }
    const handleNameChange = e => setName(e.target.value);
    return (
        <Modal title={"Create Community"} onClose={closeCreateModal}>
            <form onSubmit={createCommunity} className="flex  gap-5">
                {/* <h5>Community name: </h5> */}
                {/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    className={`w-3/4 p-2 outline-1 border-2 rounded-md bg-gray-50 ${
                        error
                        ? "outline-red-400 border-red-400"
                        : "focus:outline-gray-400"
                    }  `}
                    placeholder="Enter community name"
                />
                {!loading && <button type="submit" className="bg-main-color  trans hover:bg-sec-color px-3 py-2 rounded-md text-white text-xs">Create Community</button>}
                {loading && <div type="submit" className="flex items-center justify-center w-[123px]" ><Loader  /></div>}
            </form>
        </Modal>
    )
}

export default CreateCommunity