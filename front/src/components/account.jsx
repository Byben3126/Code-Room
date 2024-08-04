import React, {useEffect} from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { deleteAccount as deleteAccountAPI } from '../api';
function account() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(()=> {
    if (!user || !user.user.id) {
      navigate('/')
    }
  },[])

  const deleteAccount = async function() {
    if (!user || !user.user.id) return
    try {
        const {status, data} = await deleteAccountAPI(user.user.id);
        if (status == 200) {
          logout()
          navigate('/')
          return
        } 
        
    } catch (err) {}
  }

  return (
    <>
      { user && user.user.id &&

        (<>
          <p className='text-sm text-brown mb-4'>Option du compte</p>
          <div className="btn-primary w-fit" onClick={deleteAccount}>Supprimer le compte</div>
        </>)
      } 
     
    </>

  )
}

export default account