import React from 'react'
import NavigationBar from './navigationBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
        <NavigationBar />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout