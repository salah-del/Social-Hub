import { useNavigate } from "react-router-dom";

const useNavigateTo = () => {
    const nav = useNavigate();

    const navigateTo = ({ dest, state } = {}) => { // Default to an empty object
        if (!dest) {
            console.error("Error: 'dest' is required in navigateTo");
            return;
        }
        nav(dest, { state });
    };

    return navigateTo;
};

export default useNavigateTo;
