import React from 'react'
import { API_URL } from '../../services/apiService';
import { doApiMethod } from '../../services/apiService';
import styles from "./css/plantItem.module.css"
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'
import PlantDetails from './plantDetails';

const PlantItem = (props) => {

  let item = props.item;
  const nav = useNavigate();

  const onClickItem = () => {
    nav("/user/plantDetails")

  }

  return (
    <div className={styles.plantItem} style={{ backgroundImage: `url(${item.img_url})` }} onClick={onClickItem}>
      {/* <img src={item.img_url}/> */}
      <h2 className={styles.name}>{item.name}</h2>
      <div className={styles.likesDiv}>
        <BsSuitHeartFill className={styles.likeIcon} />
      </div>

    </div>
  )
}

export default PlantItem