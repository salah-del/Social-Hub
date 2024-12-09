import { useNavigate } from "react-router-dom"

export const navigateTo = ({dest}) => {
    const nav = useNavigate();
    nav(dest);
}

