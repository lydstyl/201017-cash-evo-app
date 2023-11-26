import React from "react"
import { Navigate } from "react-router-dom"

import { useIsLogin } from "../AppContextProvider/AppContextProvider"

export function RequireAuth({ children, redirectTo }) {
    const isLogin = useIsLogin()
    return isLogin ? children : <Navigate to={redirectTo} />
}
