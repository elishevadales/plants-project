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
import { Puff } from 'react-loading-icons'
import useLazy from '../../hooks/useLazy';





const UserPosts = () => {

  const { state } = useLocation();
  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const [endScreen, endScreenEnd] = useLazy()
  const [page, setPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);
  const [endOfList, setEndOfList] = useState(false);
  const navigation = useSelector((myStore) =>
    myStore.navigationSlice)
  const userId = state._id

  useEffect(() => {
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    else {
      doApi()
    }

  }, [page])

  useEffect(() => {
    if (!firstLoad && endScreen) {
      setPage(page + 1)
    }
    setFirstLoad(false)
  }, [endScreen])

  const doApi = async () => {
    let url = API_URL + "/plants/userplants/" + userId + `?page=${page}`;
    try {
      let resp = await doApiGet(url)
      console.log(resp.data)
      // setAr(resp.data)
      if (resp.data.length < 3) {
        setEndOfList(true)
      }
      setAr([...ar, ...resp.data]);
      endScreenEnd();
    }
    catch (err) {
      console.log(err.response);
      alert("There is a problem , try later");
      nav("/")
    }
  }

  const onPlusBtn = () => {
    nav("/user/newPlant")
  }



  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center",marginTop:"70px" }}>
      {ar.length == 0 ?
        <div style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>

          <Puff style={{ width: "150px", height: "150px" }} stroke="#57b846" />
        </div>
        // <h1>No matching items were found</h1>

        :
        <></>}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

        {ar.map((item, i) => {
          return (

            <PlantItem key={item._id} index={i} item={item} />
          )
        })}
        <br></br>

      </div>
      {endScreen && !endOfList && <Puff style={{ width: "150px", height: "150px" }} stroke="#57b846" />}

      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>

      </div>


    </Container>
  )
}

export default UserPosts