import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IconLayoutDashboard, IconSchool, IconUser, IconHistory } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <div className='w-80 h-full bg-white shadow p-10 flex flex-col gap-4'>
        <div className="item h-14 bg-beige text-brown rounded-md flex items-center px-4 gap-2 text-sm cursor-pointer" onClick={()=>navigate('/')}>
            <IconSchool stroke="1.5" size="22"/>
            Tableau de board
        </div>
        {
            user && user.user.id &&
          <>
           <div className="item h-14 bg-beige text-brown rounded-md flex items-center px-4 gap-2 text-sm cursor-pointer" onClick={()=>navigate('/mytutorials')}>
            <IconHistory stroke="1.5" size="22"/>
            Mes Cours
          </div>
          <div className="item h-14 bg-beige text-brown rounded-md flex items-center px-4 gap-2 text-sm cursor-pointer" onClick={()=>navigate('/account')}>
              <IconUser stroke="1.5" size="22"/>
              Mon compte
          </div>
          </>
        }
       
    </div>
  )
}
                 
export default Nav