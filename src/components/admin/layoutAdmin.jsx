import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../general/footer'
import HeaderAdmin from './headerAdmin'

const LayoutAdmin = () => {
  return (
    <div>
        <header>
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