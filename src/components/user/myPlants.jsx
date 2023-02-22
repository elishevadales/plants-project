

import React from 'react'
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import MyPlantItem from './myPlantItem'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL, doApiGet, TOKEN_NAME } from '../../services/apiService';
import { Puff } from 'react-loading-icons'
import useLazy from '../../hooks/useLazy';


const MyPlants = () => {

  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const [endScreen, endScreenEnd] = useLazy()
  const [page, setPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);
  const [endOfList, setEndOfList] = useState(false);
  const myUserInfo = useSelector((myStore) =>
  myStore.userInfoSlice)

  useEffect(() => {
    
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    else {
      doApi();
    }

  }, [page])

  useEffect(() => {
    console.log(endScreen)
    if (!firstLoad && endScreen) {
      setPage(page + 1)
    }
    setFirstLoad(false)
  }, [endScreen])

  const doApi = async () => {

    let url = API_URL + `/plants/myPlants?page=${page}`;
    console.log(url)
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      // setAr(resp.data);
      if(resp.data.length < 4){
        setEndOfList(true)
      }
      setAr([...ar, ...resp.data]);
      endScreenEnd();

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

      <div  style={{display:"flex",flexWrap:"wrap", justifyContent:"center",marginTop:"70px"}}>
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
      <br></br>
      <div style={{display:"flex",justifyContent:"center"}}>
              {endScreen && !endOfList && <Puff style={{ width: "150px", height: "150px" }} stroke="#57b846" />}
      </div>


    </Container>








      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}/>
    </div>
  )
}

export default MyPlants