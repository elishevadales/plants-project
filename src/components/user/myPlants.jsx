

import React from 'react'
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import MyPlantItem from './myPlantItem'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL, doApiGet, TOKEN_NAME } from '../../services/apiService';
import { Puff } from 'react-loading-icons'


const MyPlants = () => {

  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const myUserInfo = useSelector((myStore) =>
  myStore.userInfoSlice)

  useEffect(() => {
    
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    else {
      doApi();
    }

  }, [])

  const doApi = async () => {

    let url = API_URL + "/plants/myPlants";
    console.log(url)
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);

    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
      nav("/")
    }

  }

  const onPlusBtn = () => {
    nav("/user/newPlant")
  }

  return (
    <div>

<Container>

      <div  style={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
      {ar.length == 0?
        <div style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>

          <Puff style={{ width: "150px", height: "150px" }} stroke="#57b846" />
        </div>
        // <h1>No matching items were found</h1>

        :
        <></>}
        {ar.map((item, i) => {
          return (
          
            <MyPlantItem key={item._id} index={i} item={item} />
          )
        })}
      </div>

    </Container>








      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}/>
    </div>
  )
}

export default MyPlants