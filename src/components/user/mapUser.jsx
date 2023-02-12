import { React, useRef } from 'react'
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { API_URL, doApiGet } from '../../services/apiService';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../reducer/userInfoSlice';

import L from "leaflet"
import { GiCottonFlower } from 'react-icons/gi';
import { Container, DialogTitle, Button, Dialog, DialogContentText, DialogContent, DialogActions, Typography, Grid, Card, CardMedia, Paper } from '@mui/material';





const MapUser = () => {




  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const [userInfo,setUserInfo] =useState();
  const [originalImage, setOriginalImage] = useState("");
  const [previeImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)
  const [center, stCenter] = useState({ lat: 31.893518, lng: 35.082817 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const markerIcon = new L.Icon({
    // iconUrl: <GiCottonFlower/>,
    iconUrl: require("../../images/marker5.png"),
    iconSize: [30, 90]
  })

  useEffect(() => {

    doApi();
    doApiMyInfo();
  }, [])

  const doApiMyInfo = async() => {
    let url = API_URL + "/users/myInfo";
    try {

      let resp = await doApiGet(url);
      console.log(resp.data);
      dispatch(updateUserInfo({
        update: resp.data

      }))
      

    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")

    }
  }
  
  const doApi = async () => {
    let url = API_URL + "/plants";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data.data);
      setAr(resp.data.data);
      setOriginalImage(resp.data.original);
      setPreviewImage(resp.data.preview);
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

  const onClickItem = (item) => {
    console.log(item.likesList)
    console.log(myUserInfo)
      nav(
        '/user/plantDetails',{
        state: {item:item,
        like: item.likesList.includes(myUserInfo.user._id)? true : false}
      });



      
  }


  return (
    <div>
      <div style={{ zIndex: 0 }}>
        <Container sx={{ pt: 2 }}>

          <Grid container style={{ justifyContent: "center" }}>
            <Grid xs={12} sm={10} item style={{}}>
              <MapContainer
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
                maxZoom={18}
                style={{ height: "70vh", border: "10px solid #efefef", borderRadius: "20px" }}
              >
                <TileLayer url={"https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=1gChS6Aib0ohtpBmJnOY"} attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'} />
                {ar.map((item, i) => {

                  return (
                    <div key={i}>
                      <Marker position={[item.mapLocation.lat.$numberDecimal, item.mapLocation.long.$numberDecimal]} icon={markerIcon}>
                        <Popup>
                          <b style={{cursor:"pointer"}} onClick={() => onClickItem(item)}>{item.name}</b>
                          <div onClick={() => onClickItem(item)} style={{ cursor:"pointer",backgroundImage: `url(${previeImage + item.img_url_preview})`, height: 100, width: 100, backgroundSize: "cover", backgroundPosition: "center" }} />

                        </Popup>
                      </Marker>
                      
                    </div>

                  )
                })}

              </MapContainer>
            </Grid>
          </Grid>

        </Container>
      </div>







      <div style={{ zIndex: 999 }} className={btnStyles.addPlantDiv} onClick={onPlusBtn} />

    </div >
  )
}

export default MapUser

