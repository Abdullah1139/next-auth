"use client"
import React from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

const Profile = () => { 
  const router = useRouter()
  const [profile, setProfile] = React.useState("nothing")
  const handleLogout=async()=>{
    try {
      await axios.get('http://localhost:3000/api/user/logout')
      toast.success('Logged out successfully')
      router.push('/login')
      
    } catch (error: any) {
      console.error(error);
      toast.error("Login Failed: " + (error.response?.data?.message || error.message), {
        duration: 4000,
        style: {
          borderRadius: '8px',
          background: '#d32f2f',
          color: '#fff',
        },
      });
    }
      
    }
    const getUserDetails=async()=>{
    const res=  await axios.get('/api/user/me')
    console.log(res.data);
    setProfile(res.data.data._id)
    
    }
  return (
    <div>
        <h1>User Profile </h1>
        <h2>Welcome {profile==="nothing"?"Nothing":<Link href={`/profile/${profile}`}>
        
        </Link>}{profile}</h2>
        <button 
        className=''
        onClick={handleLogout}>Logout</button>
        
        <button
        className='btn'
        onClick={getUserDetails}>Get User Details</button>

    </div>
  )
}

export default Profile
