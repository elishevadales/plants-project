import React from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { doApiMethod } from '../../services/apiService';

import FavoriteIcon from '@mui/icons-material/Favorite';

import { API_URL, doApiGet, TOKEN_NAME } from '../../services/apiService';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import L from "leaflet"
import { useState, useEffect } from 'react';
import { Container, IconButton, Avatar, CardHeader, DialogTitle, Button, Dialog, DialogContentText, DialogContent, DialogActions, Typography, Grid, Card, CardMedia, Paper } from '@mui/material';



const PlantDetails = ({ }) => {

  const { state } = useLocation();
  const nav = useNavigate();
  console.log(state)
  const [like, setLike] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [likesCount, setlikesCount] = useState(state.likes)

  const [center, setCenter] = useState({ lat: state.mapLocation.lat.$numberDecimal, lng: state.mapLocation.long.$numberDecimal });
  const [navigation, setNavigation] = useState({});
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const markerIcon = new L.Icon({
    // iconUrl: <GiCottonFlower/>,
    iconUrl: require("../../images/marker5.png"),
    iconSize: [30, 90]
  })

  const [open, setOpen] = React.useState(false);


  const onLike = async () => {
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    else {
      let url = API_URL + "/plants/editLike/" + state._id;
      let url2 = API_URL + "/plants/deleteLike/" + state._id;
      try {
        let resp = await doApiMethod(url, "PATCH")
        setlikesCount(resp.data.likes)
        if (like) {
          setLike(false)
        }
        else {
          setLike(true)
        }
        console.log(resp.data)
      }
      catch (err) {
        console.log(err.response);
        alert("There is a problem with editting LIKE");
      }


    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect( () => {
    
     doApi();
console.log(userInfo)

    doApiNavigation();
    


  }, [])

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {

      let resp = await doApiGet(url);
      console.log(resp.data);
      setUserInfo(resp.data)
          if (state.likesList.includes(resp.data._id)) {
      setLike(true)
    }
    setlikesCount(state.likes)

    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
      nav("/")
    }

  }

  const doApiNavigation = async () => {
    let url = API_URL + "/upload/navigation";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setNavigation(resp.data);
    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
    }
  }

  return (
    <Container sx={{ marginTop: "10px" }}>

      <Card sx={{ marginTop: "20px" }}>
        <CardHeader
          sx={{ background: "#efefef", marginBottom: "20px" }}
          avatar={
            <Avatar aria-label="recipe" src={navigation.previewAvatar + state.user_id.img_url_preview}>

            </Avatar>
          }


          title={state.user_id.name}
          subheader={state.date_created}
        >

        </CardHeader>

        <Grid sx={{ display: "flex", flexWrap: "wrap", paddingX: "20px", paddingBottom: "20px" }}>

          <Grid sx={{ height: "70vh", width: { xs: "100%", md: "58%" }, marginRight: { md: "20px" } }}>
            <Grid onClick={handleClickOpen} sx={{ height: "70%", borderRadius: "5px", display: "flex", justifyContent: "right", alignItems: "end", backgroundSize: "cover", cursor: "pointer", backgroundPosition: "center", backgroundImage: `url(${navigation.originalPlant + state.img_url})` }}>
              <div style={{ background: "rgba(255, 255, 255, 0.732)", margin: "10px", paddingRight: "10px", borderRadius: "10px" }}>
                <IconButton onClick={(e) => { e.stopPropagation(); onLike() }} aria-label="add to favorites">
                  {

                    like ?
                      <FavoriteIcon style={{ color: "red" }} />
                      :

                      <FavoriteIcon />

                  }


                </IconButton>
                {
                  likesCount == 0 ?
                    <></>
                    :
                    <>{likesCount}</>
                }
              </div>
            </Grid>
            <hr></hr>
            <Grid>
              <h5><b>{state.name}</b></h5>
              <Typography>{state.description}</Typography>


            </Grid>
          </Grid>

          <Grid sx={{ height: "70vh", width: { xs: "100%", md: "40%" } }}>
            <MapContainer
              center={center}
              zoom={ZOOM_LEVEL}
              ref={mapRef}
              maxZoom={18}
              style={{ height: "inherit", border: "10px solid #efefef", borderRadius: "20px" }}
            >
              <TileLayer url={"https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=1gChS6Aib0ohtpBmJnOY"} attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'} />



              <div>
                <Marker position={[state.mapLocation.lat.$numberDecimal, state.mapLocation.long.$numberDecimal]} icon={markerIcon}>
                  <Popup>
                    <b>{state.name}</b>
                    <div style={{ backgroundImage: `url(${navigation.previewPlant + state.img_url_preview})`, height: 100, width: 100, backgroundSize: "cover", backgroundPosition: "center" }} />

                  </Popup>
                </Marker>
              </div>




            </MapContainer>
          </Grid>
        </Grid>
      </Card>
      <Grid sx={{ marginTop: "20px" }}>
        <Typography>
          Comments
        </Typography>
      </Grid>

      <Dialog
        open={open}

        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {state.name}
        </DialogTitle> */}
        <DialogContent>
          <div style={{ height: "70vh" }}>
            <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={navigation.originalPlant + state.img_url}></img>

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  )
}

export default PlantDetails