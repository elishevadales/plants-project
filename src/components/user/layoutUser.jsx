import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../general/footer'
import HeaderUser from './headerUser'

const LayoutUser = () => {
  return (
    <div>
        <header>
            <HeaderUser/>
        </header>

        <main>
          <Outlet/>
        </main>
        
        <footer>
            <Footer background={"black"} color={"white"}/> 
        </footer>

    </div>
  )
}

export default LayoutUser