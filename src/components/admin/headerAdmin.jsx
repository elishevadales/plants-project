import React from 'react'
import { doApiGet,TOKEN_NAME, API_URL } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom'
import styles from './css/headerAdmin.module.css'
import { GiCottonFlower } from 'react-icons/gi';
import { Button } from '@mui/material';
import { useEffect} from 'react';
import ConfirmButton from '../general/confirmButton';
import CheckAdmin from './checkAdmin'
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../reducer/userInfoSlice';


const HeaderAdmin = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();
  const myUserInfo = useSelector((myStore) =>
  myStore.userInfoSlice)

  useEffect(() => {

doApi();
    

  }, [])

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      // console.clear();
      let resp = await doApiGet(url);
      console.log(resp.data);
      dispatch(updateUserInfo({
        update: resp.data

      }))

    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
      nav("/")
    }

  }

  const onClick = () => {
    localStorage.removeItem(TOKEN_NAME);
    nav("/");

  }
  const onClickLogo = () => {
    nav("/admin/plantsList");
  }

  return (
    <div>

    <div className={styles.header}>
      
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={onClickLogo}>
        <GiCottonFlower style={{ color: "#57b846", fontSize: "40px", marginRight: "10px" }} />
        <h1><span>EZ</span>plant</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/admin/plantsList">plants</Link></li>
          <li><Link to="/admin">users</Link></li>
          <li><Link to="/admin/myInfo">profile</Link></li>
          <li>
            <ConfirmButton
              btnText="Log-out"
              boxText="Are you sure you want to log-out?"
              agree={onClick}
              style={{ background: "black", width: "130px", height: "40px", color: "white" }}
            />
          </li>

        </ul>
      </nav>
      <div style={{color:"black"}}>
        <p>name: {myUserInfo?.user?.name}</p>
        <p>email: {myUserInfo?.user?.email}</p>
        <p>img_url: {myUserInfo?.user?.img_url}</p>
        <p>img_url_preview: {myUserInfo?.user?.img_url_preview}</p>
        <p>date_created: {myUserInfo?.user?.date_created}</p>
        <p>role: {myUserInfo?.user?.role}</p>
      </div>
    </div>
    </div>
  )
}

export default HeaderAdmin