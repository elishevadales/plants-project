import { Container } from '@mui/system'
import PlantItem from './plantItem'
import { useState, useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import styles from "./css/homeUser.module.css";
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'


import * as React from 'react';
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



const HomeUser = () => {

  
  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const [originalImage, setOriginalImage] = useState("");
  const [previeImage, setPrevieImage] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");


  useEffect(() => {
    doApi();

  }, [])

  const doApi = async () => {
    let url = API_URL + "/plants";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data.data);
      setAr(resp.data.data);
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
    <Container>
      <div>
        <label>search:</label>
        <input type={"text"}></input>
        <label>sort:</label>
        <select></select>
      </div>

      <div className={styles.allPlants}>
        {ar.map((item, i) => {
          console.log(previewAvatar + item.user_id.img_url)
          return (
          
            <PlantItem key={item._id} index={i} item={item} original={originalImage} preview={previeImage} />
          )
        })}
      </div>
      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>

      </div>


    </Container>

  )
}

export default HomeUser