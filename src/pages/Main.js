import React from 'react'
import FinalSideBar from '../components/FinalSideBar';
import TopBar from '../components/TopBar';
import NavPage from './NavPage';
// import NavPage from './NavPage';

export default function Main() {
  return (
    <div>

      {/* Top bar navigation for username and role and logout */}
      <section>
           <TopBar />
      </section>
      {/* End Top bar navigation for username and role and logout */}

      {/* Section containing the side bar and the main section of each page */}
      <section className="grid grid-cols-12">
          {/* Side bar session */}
          <section className=" col-span-2 bg-black h-screen pl-2">
            <FinalSideBar/>
          </section>
          {/*  */}

          {/* Nagigation Page session */}
          <section className="col-span-10 bg-red-300 h-screen pl-2">
              <NavPage />
          </section>

          {/*  */}

      </section>
      {/* End Section containing the side bar and the main section of each page */}
      
    </div>
  )
}
