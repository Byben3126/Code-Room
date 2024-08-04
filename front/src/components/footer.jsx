import React from 'react'
import Logo from '../assets/images/logo.png'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function footer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <footer className="flex justify-between items-center h-14 bg-white px-10 shadow-sm z-10">
        <div className="flex flex-row gap-5">
           <p className='text-brown text-sm cursor-pointer'>Mentions légales</p>
           <p className='text-brown text-sm cursor-pointer'>Conditions générales</p>
        </div>
        <div className="">
           <p className='text-brown text-sm cursor-pointer'>Travail pédagogique sans objectifs commerciaux.</p>
        </div>
    </footer>
  )
}

export default footer