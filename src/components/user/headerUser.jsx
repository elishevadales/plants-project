import {React,useEffect} from 'react'
import { TOKEN_NAME } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom'
import styles from './css/headerUser.module.css'
import { GiCottonFlower } from 'react-icons/gi';
import ConfirmButton from '../general/confirmButton';

const HeaderUser = () => {


  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }

  }, [])

  const onClick = () => {
    localStorage.removeItem(TOKEN_NAME);
    nav("/");


  }

  const onClickLogo = () => {
    nav("/user");
  }

  return (
    <div className={styles.header}>
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={onClickLogo}>
        <GiCottonFlower style={{ color: "#57b846", fontSize: "40px", marginRight: "10px" }} />
        <h1><span>EZ</span>plant</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/user">Home</Link></li>
          <li><Link to="/user/map">Map</Link></li>
          <li><Link to="/user/myPlants">My-plants</Link></li>
          <li><Link to="/user/myInfo">Profile</Link></li>
          <li>
            <ConfirmButton
              btnText="Log-out"
              boxText="Are you sure you want to log-out?"
              agree={onClick}
              style={{ background: "#57b846", width: "130px", height: "40px", color: "white" }}
            />
          </li>


        </ul>
      </nav>
    </div>
  )
}

export default HeaderUser