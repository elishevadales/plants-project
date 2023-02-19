
import { Button, Container, Box, Grid } from '@mui/material';
import PlantItem from './plantItem'
import { useState, useEffect } from 'react';
import { API_URL, doApiGet, TOKEN_NAME } from '../../services/apiService';
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import options from '../../constants/plantsNames'
import * as React from 'react';
import { Puff } from 'react-loading-icons'
import { styled } from '@mui/material/styles';
import { IconButton, Input } from '@mui/material';



const HomeUser = () => {

  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const selectRef = React.useRef();
  const inputRef = React.useRef();


  useEffect(() => {
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    else {
      doApi();
      // doApiMap()
    }

  }, [])

  const doApi = async () => {
    let url = API_URL + "/plants";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data.data);
      setAr(resp.data.data);


    }
    catch (err) {
      console.log(err);
      alert("there is a problem ,try again later")
    }

  }

  // const doApiMap = async () => {
  //   const apiKey = 'YYHNj1dlE4AVXAs8x1nDC9buHv0Y2ffs';
  //   const endpoint = 'http://open.mapquestapi.com/geocoding/v1/reverse';
  //   const lat = 40.712776; // Example latitude
  //   const lng = -74.005974; // Example longitude
  //   try {
  //     let resp = await doApiGet(endpoint, {
  //       params: {
  //         key: apiKey,
  //         location: `${lat},${lng}`
  //       }
  //     });
  //     console.log(resp);
  //   }
  //   catch (err) {
  //     console.log(err);
  //     alert("there is a problem ,try again later")
  //   }

  // }

  const onPlusBtn = () => {
    nav("/user/newPlant")
  }

  const searchByName = async (ref) => {

    let url;
    if (ref == "input") {
      if (inputRef.current.value == "") {
        doApi();
      }
      url = API_URL + "/plants/searchByName?search=" + inputRef.current.value;


    }
    else if (ref == "select") {
      if (selectRef.current.value == "") {
        doApi();
      }
      url = API_URL + "/plants/searchByName?search=" + selectRef.current.value;


    }
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
      console.log(ar)
    }
    catch (err) {
      console.log(err);
      alert("there is a problem ,try again later")
    }


  }


  return (
    <div>
      <Grid sx={{ padding: "20px", background: "#57b846", borderRadius: { md: "0 0 10px 10px" }, marginBottom: "20px", display: "flex",flexWrap:"wrap",justifyContent:{xs:"space-around",sm:"center"} }}>
        <Grid sx={{ width: "200px" }}>
          <input  ref={inputRef} onChange={() => searchByName("input")} id="form1" className="form-control" type="search" placeholder='free search...'></input>
        </Grid>
        {/* <div className='input-group' style={{background:"red"}}>
          <div className='form-outline' style={{ display: "flex" }}>
            <input ref={inputRef} onChange={() => searchByName("input")} style={{ height: "35px" }} id="form1" className="form-control" type="search" placeholder='search'></input>
          </div>
          <button style={{ height: "35px", display: "flex", alignItems: "center", background: "black", border: "black" }} type='button' className='btn btn-primary'>
            <FaSearch />
          </button>
        </div> */}
        <Grid  sx={{ width: "200px",marginLeft:{sm:"30px"} }}>
          <select ref={selectRef} onChange={() => searchByName("select")} className="form-select">
            <option value="">all plants</option>
            {options.map((item, i) => {
              return (
                <option key={i} value={item.value}>{item.label}</option>
              )
            })}

          </select>
        </Grid>


      </Grid>
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>


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
        </div>
        <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>

        </div>


      </Container>
    </div>


  )
}

export default HomeUser