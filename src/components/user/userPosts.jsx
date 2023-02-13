import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import PlantItem from './plantItem';
import { Button, Container, Box, Grid } from '@mui/material';
import btnStyles from "./css/addPlantBtn.module.css"
import options from '../../constants/plantsNames'
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod, TOKEN_NAME } from '../../services/apiService';
import { useSelector } from 'react-redux';



const UserPosts = () => {

  const { state } = useLocation();
  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const navigation = useSelector((myStore) =>
  myStore.navigationSlice)
  const userId = state._id
  console.log(state)

  useEffect(() => {
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    else {
      doApi()
    }

  }, [])

  const doApi = async () => {
    let url = API_URL + "/plants/userplants/" + userId;
    try {
      let resp = await doApiMethod(url, "GET")
      console.log(resp.data)
      setAr(resp.data)
    }
    catch (err) {
      console.log(err.response);
      alert("There is a problem , try later");
    }
  }

  const onPlusBtn = () => {
    nav("/user/newPlant")
  }

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Grid sx={{ padding: "20px", width: { md: "60%", xs: "100%" }, background: "#57b846", borderRadius: { md: "0 0 30px 30px" }, marginBottom: "20px", display: "flex" }}>

        <div className='input-group'>
          <div className='form-outline' style={{ display: "flex" }}>
            <input style={{ height: "35px" }} id="form1" className="form-control" type="search" placeholder='search'></input>
          </div>
          <button style={{ height: "35px", display: "flex", alignItems: "center", background: "black", border: "black" }} type='button' className='btn btn-primary'>
            <FaSearch />
          </button>
        </div>

        <select style={{ width: "300px", height: "35px" }} className="form-select">
          <option value="">all plants</option>
          {options.map((item, i) => {
            return (
              <option key={i} value={item.value}>{item.label}</option>
            )
          })}

        </select>

      </Grid>


      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

        {ar.map((item, i) => {
          item.img_url = navigation.navigation.previewPlant + item.img_url;
          item.img_url_preview = navigation.navigation.previewPlant + item.img_url_preview;
          console.log(item)
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

export default UserPosts