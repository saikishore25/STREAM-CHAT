import React from 'react'
import { Link } from 'react-router-dom'
import home_img from "../assets/images/home.jpg"
const HomePage = () => {
    
    return (

        <>
            <div className="min-h-screen  flex items-center justify-center px-4 " data-theme="forest">
                
                <div className=" mx-auto flex flex-col md:flex-row items-center text-center md:text-left gap-10  ">
                
                    <div className="flex-1 mb-8 md:mb-0 ">

                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-200 mb-4">
                            Connect, Chat & Call Instantly
                        </h1>

                        <p className="text-lg text-gray-300 mb-6">
                            Experience seamless messaging and high-quality video calls with our modern communication app.
                        </p>

                        <div className="space-x-4">

                            <Link to="/login">
                                <button className="bg-green-600 cursor-pointer hover:bg-white text-white hover:text-green-600 font-semibold py-2 px-6 rounded-lg shadow-lg transition ">
                                    Login
                                </button>
                            </Link>

                            <Link to="/signup">
                                <button className="bg-white cursor-pointer hover:bg-green-600 text-green-600 hover:text-white border border-indigo-600 font-semibold py-2 px-6 rounded-lg transition">
                                    Sign Up
                                </button>
                            </Link>
                        </div>

                    </div>

                    
                    <div className="flex-1">
                        <img
                            src={home_img}
                            alt="Chat Illustration"
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomePage
