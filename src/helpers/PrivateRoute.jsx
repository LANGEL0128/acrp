import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom";
import { app } from "../config/app";

export const PrivateRoute = ({ children }) => {

    const { user } = useContext(AuthContext);

    return (
        user.logged ? children : <Navigate to={app.url_login}/>
    )
}
