

import React from 'react'
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import MyPlantItem from './myPlantItem'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL, doApiGet, TOKEN_NAME } from '../../services/apiService';


const MyPlants = () => {

  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const [originalImage, setOriginalImage] = useState("");
  const [previeImage, setPrevieImage] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");
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
      setAr(resp.data.myPlants);
      setOriginalImage(resp.data.original);
      setPrevieImage(resp.data.preview);
      setPreviewAvatar(resp.data.previewAvatar);

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
        {ar.map((item, i) => {
          return (
          
            <MyPlantItem key={item._id} index={i} item={item} original={originalImage} preview={previeImage} previewAvatar={previewAvatar} />
          )
        })}
      </div>
      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>

      </div>


    </Container>








      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}/>
    </div>
  )
}

export default MyPlants