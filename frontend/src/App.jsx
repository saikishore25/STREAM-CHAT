import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import DashBoardPage from "./pages/DashBoardPage.jsx";
import ProfileSetupPage from "./pages/ProfileSetupPage.jsx"
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "../hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "../store/useThemeStore.js";

const App = () => {

    const { isLoading, authUser } = useAuthUser();
    const { theme } = useThemeStore();

    const isAuthenticated = Boolean(authUser);
    console.log("Authenticated:",isAuthenticated)
    const isOnProfileSetup = authUser?.isOnProfileSetup;
    console.log("Profile Setup", isOnProfileSetup)


    if (isLoading) return <PageLoader />;

    return (

        <div className="h-screen" data-theme={theme}>

            <Routes>

                <Route
                    path="/"
                    element={
                            
                        <HomePage />
                            
                    }
                />

                <Route 
                    path="/dashboard"

                    element={

                        isAuthenticated ? (
                            
                            <Layout showSidebar={true}>

                                <DashBoardPage/>

                            </Layout>
                        ):
                         
                        (
                        
                            <LoginPage/>
                            
                        )

                    }
                />

                <Route
                    path="/signup"
                    element={

                        isAuthenticated ?   <Navigate to={isOnProfileSetup ? "/" : "/profilesetup"}/> : <SignUpPage/> 
                    }
                    />
                    <Route
                    path="/login"
                    element={
                        isAuthenticated ? <Navigate to={isOnProfileSetup ? "/" : "/profilesetup"} /> : <LoginPage /> 
                    }
                />


                <Route
                    path="/notifications"
                    element={
                        isAuthenticated && isOnProfileSetup ? (
                        <Layout showSidebar={true}>
                            <NotificationsPage />
                        </Layout>
                        ) : (
                        <Navigate to={!isAuthenticated ? "/login" : "/profilesetup"} />
                        )
                    }
                />


                <Route

                    path="/call/:id"
                    element={
                        isAuthenticated && isOnProfileSetup ? (
                        <CallPage />
                        ) : (
                        <Navigate to={!isAuthenticated ? "/login" : "/profilesetup"} />
                        )
                    }
                />



                <Route
                    path="/chat/:id"
                    element={
                        isAuthenticated && isOnProfileSetup ? (
                        <Layout showSidebar={false}>
                            <ChatPage />
                        </Layout>
                        ) : (
                        <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                        )
                    }
                />



                <Route
                    path="/profilesetup"
                    element={
                        isOnProfileSetup ? (
                        !isOnProfileSetup ? (
                            <ProfileSetupPage />
                        ) : (
                            <Navigate to="/" />
                        )
                        ) : (
                        <Navigate to="/login" />
                        )
                    }
                />

            </Routes>

            <Toaster />
        </div>
    );
};
export default App;