import React from 'react';
import {Routes, Route} from 'react-router-dom';
// import CssPage from './CssPage';
// import Git from './Git';
import HouseListing from './House/HouseListing';
// import Index from './Index';
import UserManagement from './users/UserManagement';
// import Login from '../pages/Login';
// import HomePage from './HomePage';
import Dashboard from './Dashboard';


export default function NavPage() {
  return (
    <>

    <h1>Hello coder, still struggling</h1>
  
    <section>
      <Routes>
        <Route path='' element={< Dashboard/>}/>  
        <Route path='user-management' element={< UserManagement/>}/>  
        <Route path='house-listing' element={< HouseListing/>}/>  
      </Routes>
    </section>
      
    </>
  )
}
