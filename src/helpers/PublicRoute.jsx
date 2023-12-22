import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom";
import { LoginScreen } from "../components/Admin/auth/LoginScreen";
import { app } from "../config/app";

export const PublicRoute = ({ children }) => {

    const { user } = useContext(AuthContext);

    return (
        user.logged ? <Navigate to={app.url_landing} /> : children
    )
}
