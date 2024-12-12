import { IoClose } from "react-icons/io5";
const Modal = ({children, title, onClose}) => {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-fit z-[60] bg-white 
                        shadow-lg rounded-md flex flex-col gap-8    ">
                <div className="w-full items-center flex justify-between">
                    {title && <h3 className="text-2xl font-bold">{title}</h3>}
                    <button onClick={onClose} className="ml-auto trans hover:bg-gray-100 p-1 -mr-1 rounded-md">
                        <IoClose className="text-2xl" />
                    </button>
                </div>
                {children}
            </div>
            <div onClick={onClose} className="fixed w-full h-full top-0 left-0 z-50 backdrop-blur" />
        </>
    )
}

export default Modal