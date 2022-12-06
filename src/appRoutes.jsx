import React from 'react'
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom"
import LayoutAdmin from './components/admin/layoutAdmin';
import PlantsListAdmin from './components/admin/plantsListAdmin';
import UsersListAdmin from './components/admin/usersListAdmin';
import HomeUser from './components/user/homeUser';
import Login from './components/general/login';
import Page404 from './components/general/page404';
import SignUp from './components/general/signUp';
import LayoutUser from './components/user/layoutUser';
import LayoutGeneral from './components/general/layoutGeneral';
import MyInfo from './components/general/myInfo';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Page404 />} />
        {/* Admin */}

        <Route path="/" element={<LayoutGeneral/>}>
          <Route path="/" element={<Login/>} />
          <Route path="/signUp" element={<SignUp/>} />
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin" element={<UsersListAdmin />} />
          <Route path="/admin/plantsList" element={<PlantsListAdmin />} />
          <Route path="/admin/myInfo" element={<MyInfo />} />

        </Route>
        {/* User */}
        <Route path="/user" element={<LayoutUser />}>

          <Route path="/user" element={<HomeUser />} />
          <Route path="/user/myInfo" element={<MyInfo />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;