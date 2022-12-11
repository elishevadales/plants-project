import { Container } from '@mui/system'
import React from 'react'
import PlantItem from './plantItem'
import { useState,useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import styles from "./css/homeUser.module.css";



const HomeUser = () => {

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

    </Container>

  )
}

export default HomeUser