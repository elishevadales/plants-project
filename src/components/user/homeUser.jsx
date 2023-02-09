
import { Button, Container, Box, Grid } from '@mui/material';
import PlantItem from './plantItem'
import { useState, useEffect } from 'react';
import { API_URL, doApiGet, TOKEN_NAME } from '../../services/apiService';
import styles from "./css/homeUser.module.css";
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import options from '../../constants/plantsNames'
import { useSelector, useDispatch } from 'react-redux';
import { updateNavigate} from '../../reducer/navigationSlice';


import * as React from 'react';
import { styled } from '@mui/material/styles';

import {IconButton,Input } from '@mui/material';



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
  const dispatch = useDispatch();
  const navigationServer = useSelector((myStore) =>
  myStore.navigationSlice)
  const [ar, setAr] = useState([]);
  // const [originalImage, setOriginalImage] = useState("");
  // const [previeImage, setPrevieImage] = useState("");
  // const [previewAvatar, setPreviewAvatar] = useState("");


  useEffect(() => {

    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    else {
      doApi();
    }
    console.log(navigationServer.navigate)

  }, [])

  const doApi = async () => {
    let url = API_URL + "/plants";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data.data);
      setAr(resp.data.data);
      // setOriginalImage(resp.data.original);
      // setPrevieImage(resp.data.preview);
      // setPreviewAvatar(resp.data.previewAvatar);


      dispatch(updateNavigate({
        update: {
          previewAvatar: resp.data.previewAvatar,
          originalAvatar: resp.data.originalAvatar,
          previewPlant: resp.data.preview,
          originalPlant: resp.data.original

        }

      }))
      

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
    <Container sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Grid sx={{ padding: "20px",width:{md:"60%",xs:"100%"},background:"#57b846",borderRadius:{md:"0 0 30px 30px"},marginBottom:"20px",display:"flex"}}>

        <div className='input-group'>
          <div className='form-outline' style={{display:"flex"}}>
            <input  style={{ height: "35px" }} id="form1" className="form-control" type="search" placeholder='search'></input>
          </div>
          <button style={{ height: "35px", display: "flex", alignItems: "center", background: "black",border:"black" }} type='button' className='btn btn-primary'>
            <FaSearch />
          </button>
        </div>

        <select style={{width:"300px", height: "35px"}} className="form-select">
          <option value="">all plants</option>
          {options.map((item, i) => {
            return (
              <option key={i} value={item.value}>{item.label}</option>
            )
          })}

        </select>
        
      </Grid>
      

      <div style={{ justifyContent: "center" }} className={styles.allPlants}>
      
        {ar.map((item, i) => {

          return (

            <PlantItem key={item._id} index={i} item={item} />
          )
        })}
      </div>
      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>

      </div>


    </Container>

  )
}

export default HomeUser