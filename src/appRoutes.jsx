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
import MapUser from './components/user/mapUser';
import PlantsUser from './components/user/plantsUser';
import AddPlant from './components/user/addPlant';
import PlantDetails from './components/user/plantDetails';

// redux
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import userInfoSlice from './reducer/userInfoSlice';

const AppRoutes = () => {

  const myStore = configureStore({
    reducer: {
      userInfoSlice
    }
  })


  return (
    <BrowserRouter>
      <Provider store={myStore}>
        <Routes>

          <Route path="/*" element={<Page404 />} />


          <Route path="/" element={<LayoutGeneral />}>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>
          {/* Admin */}
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="/admin" element={<UsersListAdmin />} />
            <Route path="/admin/plantsList" element={<PlantsListAdmin />} />
            <Route path="/admin/myInfo" element={<MyInfo />} />
            <Route path="/admin/map" element={<MapUser />} />
          </Route>

          {/* User */}
          <Route path="/user" element={<LayoutUser />}>
            <Route path="/user" element={<HomeUser />} />
            <Route path="/user/map" element={<MapUser />} />
            <Route path="/user/myPlants" element={<PlantsUser />} />
            <Route path="/user/myInfo" element={<MyInfo />} />
            <Route path="/user/newPlant" element={<AddPlant />} />
            <Route path="/user/plantDetails" element={<PlantDetails />} />
          </Route>

        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default AppRoutes;