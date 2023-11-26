import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AppContextProvider } from "../AppContextProvider/AppContextProvider"
import { Nav } from "../Nav/Nav"
import { Login } from "../Login/Login"
import { RequireAuth } from "../PrivateRoute/PrivateRoute"
import { Home } from "../Home/Home"
import { AccountDetail } from "../AccountDetail/AccountDetail"
import { SumChart } from "../SumChart/SumChart"
import { MainChart } from "../MainChart/MainChart"

import "./App.css"

function App() {
    return (
        <AppContextProvider>
            <Router>
                <Nav />

                <Routes>
                    <Route path="login/*" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Home />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/account/:id/:name"
                        element={
                            <RequireAuth redirectTo="/login">
                                <AccountDetail />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/sum-chart"
                        element={
                            <RequireAuth redirectTo="/login">
                                <SumChart />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/comparison-graph"
                        element={
                            <RequireAuth redirectTo="/login">
                                <MainChart />
                            </RequireAuth>
                        }
                    />
                </Routes>

                {/* <Route
                        path="/account/:id/:name" // protected path
                        element={
                            <RequireAuth redirectTo="/login">
                                <AccountDetail />
                            </RequireAuth>
                        }
                    /> */}
            </Router>
        </AppContextProvider>
    )
}

export default App
