import React from 'react'
import Header from '../components/header'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom';

function main({children}) {
  return (
    <div className="h-screen flex flex-col">
        <Header></Header>
        <div className='flex grow h-0'>
          <Nav></Nav>
          <div className="grow w-0 flex flex-col">
            <div className="grow h-0 p-14 pb-10 w-full overflow-y-auto">
              <Outlet />
            </div>
            <Footer/>
          </div>
          
        </div>
      </div>
  )
}

export default main