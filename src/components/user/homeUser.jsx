import { Container } from '@mui/system'
import React from 'react'
import PlantItem from './plantItem'
import { useState,useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import styles from "./css/homeUser.module.css";
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';



const HomeUser = () => {
  const nav = useNavigate();

  const [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL+"/plants";
    try{
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    }
    catch(err){
      console.log(err);
      alert("there problem ,try again later")
    }

  }

  const onPlusBtn = () => {
    nav("/user/newPlant")
  }

  return (
    <Container>
      <div>
        <label>search:</label>
        <input type={"text"}></input>
        <label>sort:</label>
        <select></select>
      </div>

      <div className={styles.allPlants}>
      {ar.map((item,i) => {
            return(
              <PlantItem key={item._id} doApi={doApi} index={i} item={item}/>
            )
          })}
      </div>
      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>
        
      </div>


    </Container>

  )
}

export default HomeUser