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
import MyPlants from './components/user/myPlants';
import AddPlant from './components/user/addPlant';
import PlantDetails from './components/user/plantDetails';
import UserDetails from './components/user/userDetails';
import EditPlant from './components/user/editPlant';
import UserPosts from './components/user/userPosts';
import CheckAdmin from './components/admin/checkAdmin';

// redux
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import userInfoSlice from './reducer/userInfoSlice';
import navigationSlice from './reducer/navigationSlice';

const AppRoutes = () => {

  const myStore = configureStore({
    reducer: {
      userInfoSlice,navigationSlice
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
            <Route path="/admin/map" element={<MapUser  role="admin"/>} />
            <Route path="/admin/newPlant" element={<AddPlant role="admin"/>} />
            <Route path="/admin/plantDetails" element={<PlantDetails role="admin"/>} />
          
          </Route>

          {/* User */}
          <Route path="/user" element={<LayoutUser />}>
          
            <Route path="/user" element={<HomeUser />} />
            <Route path="/user/map" element={<MapUser   role="user" />} />
            <Route path="/user/myPlants" element={<MyPlants />} />
            <Route path="/user/myInfo" element={<MyInfo />} />
            <Route path="/user/newPlant" element={<AddPlant />} />
            <Route path="/user/plantDetails" element={<PlantDetails role="user" />} />
            <Route path="/user/userDetails" element={<UserDetails />} />
            <Route path="/user/editPlant" element={<EditPlant />} />
            <Route path="/user/userPosts" element={<UserPosts />} />
            
          </Route>

        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default AppRoutes;