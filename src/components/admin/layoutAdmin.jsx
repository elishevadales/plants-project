import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../general/footer'
import CheckAdminComp from './checkAdmin'
import HeaderAdmin from './headerAdmin'

const LayoutAdmin = () => {
  const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)

  if (myUserInfo.user.role == "admin") {

    return (
      <div>
        <header>
          <HeaderAdmin />
        </header>

        <main>
          <Outlet />
        </main>

        <footer>
          <Footer background={"rgb(170, 249, 255)"} color={"black"} />
        </footer>
      </div>
    )
  }
  else {
    alert("your role is not admin or undefined")
    console.log("bug")
  }

}

export default LayoutAdmin