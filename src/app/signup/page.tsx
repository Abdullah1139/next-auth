"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const [loading,setLoading]=useState(false)

  const handleSignUp=async()=>{
    try {
      const response= await axios.post('/api/user/signup',user)
      setLoading(true)
      router.push('login')
    } catch (error: any) {
      console.log("signup failed",error.message)
      toast.error(error.message)
      
    }finally{
      setLoading(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800">{loading?"Processing":"Sign Up"}</h1>

        <div className="mt-6 flex flex-col gap-4">
          {/* Username */}
          <div>
            <label htmlFor="userName" className="block text-gray-600">
              User Name
            </label>
            <input
              id="userName"
              type="text"
              value={user.userName}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Sign Up Button */}
          <button 
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
          onClick={handleSignUp}
          >
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-500 text-sm mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
