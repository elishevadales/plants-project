import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../general/footer'
import CheckAdmin from './checkAdmin'
import HeaderAdmin from './headerAdmin'

const LayoutAdmin = () => {
  return (
    <div>
        <header>
          <CheckAdmin/>
            <HeaderAdmin/>
        </header>

        <main>
          <Outlet/>
        </main>
        
        <footer>
            <Footer background={"rgb(170, 249, 255)"} color={"black"}/>
        </footer>
    </div>
  )
}

export default LayoutAdmin