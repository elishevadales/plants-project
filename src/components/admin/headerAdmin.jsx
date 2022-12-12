import React from 'react'
import { TOKEN_NAME } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom'
import styles from './css/headerAdmin.module.css'
import { GiCottonFlower } from 'react-icons/gi';
import { Button } from '@mui/material';
import ConfirmButton from '../general/confirmButton';

const HeaderAdmin = () => {

  const nav = useNavigate();

  const onClick = () => {
    localStorage.removeItem(TOKEN_NAME);
    nav("/");

  }
  const onClickLogo = () => {
    nav("/admin/plantsList");
  }

  return (

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
    </div>
  )
}

export default HeaderAdmin