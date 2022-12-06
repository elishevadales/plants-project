import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer'
import GeneralHeader from './generalHeader'

const LayoutGeneral = () => {
  return (
    <div>
        <header>
            <GeneralHeader/>
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

export default LayoutGeneral