"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleLogin=async()=>{
      try {
        const response= await axios.post('http://localhost:3000/api/user/login',user)
        console.log(response.data)
        toast.success('Login Successfull')
        router.push('/profile')

      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message)

        
      }
    console.log(user.email,user.password)
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        <div className="mt-6 flex flex-col gap-4">
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

          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
          onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-center text-gray-500 text-sm mt-2">
            Already have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
