import React from 'react'
import Logo from '../assets/images/logo.png'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center h-16 bg-white px-16 shadow-sm z-10">
        <div className="logo">
            <img className='h-12 w-auto' src={Logo} alt="logo" />
        </div>
        <div className="bns">
            {
              (user && (<div className="btn-primary" onClick={()=> { logout();navigate('/') }}>Se déconnecter</div>) || 
              (<div className="btn-primary" onClick={()=>navigate('/login')}>Se connecter</div>))
            }
        </div>
    </header>
  )
}

export default header