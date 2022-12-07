import React from 'react'
import { TOKEN_NAME } from '../../services/apiService'
import { Link ,useNavigate} from 'react-router-dom'
import styles from './css/headerUser.module.css'
import { GiCottonFlower } from 'react-icons/gi';

const HeaderUser = () => {

  
  const nav = useNavigate();

  const onClick = () => {
    if(window.confirm('are you sure you want to log-out?')){
      localStorage.removeItem(TOKEN_NAME);
    nav("/");
    }
    
  }

  return (
    <div className={styles.header}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GiCottonFlower style={{ color: "#57b846", fontSize: "40px", marginRight: "10px" }} />
        <h1><span>EZ</span>plant</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/user">Home</Link></li>
          <li><Link to="/user/map">Map</Link></li>
          <li><Link to="/user/myPlants">My-plants</Link></li>
          <li><Link to="/user/myInfo">Profile</Link></li>
          <li style={{cursor:"pointer"}} onClick={onClick}>Log-out</li>
          {/* <li onClick={onClick}>
            <Button className='log-btn' style={{ background: "#57b846", width: "130px", height: "40px" }} variant="contained" onClick={onClick}>
              log-out
            </Button>
          </li> */}
        </ul>
      </nav>
    </div>
  )
}

export default HeaderUser