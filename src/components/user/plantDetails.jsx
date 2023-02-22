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
import { Container, Link, IconButton, Avatar, CardHeader, DialogTitle, Button, Dialog, DialogContentText, DialogContent, DialogActions, Typography, Grid, Card, CardMedia, Paper } from '@mui/material';



const PlantDetails = (props) => {

  const { state } = useLocation();
  const nav = useNavigate();
  console.log(state)
  const [like, setLike] = useState(state.like)
  const [item, setItem] = useState(state.item);
  const [isHover, setHover] = useState(false);
  const date = state.item.date_created.slice(8, 10) + "/" + state.item.date_created.slice(5, 7) + "/" + state.item.date_created.slice(0, 4);
  const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)
  const [likesCount, setlikesCount] = useState(state.likes)

  const [center, setCenter] = useState({ lat: state.item.mapLocation.lat.$numberDecimal, lng: state.item.mapLocation.long.$numberDecimal });
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
      let url = API_URL + "/plants/editLike/" + state.item._id;

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


  useEffect(() => {



    setlikesCount(state.likes)

    doApiPlantDetailes();


  }, [like])

  const doApiPlantDetailes = async () => {
    let url = API_URL + "/plants/single/" + state.item._id;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      console.log(item)
      setItem(resp.data);

    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")

    }

  }



  const handleHover = () => {
    setHover(true);

  }
  const handleOverLeave = () => {
    setHover(false);
  }
  const onClickUser = () => {
    nav(
      '/user/userDetails', {
      state: state.item.user_id
    });
  }


  return (
    <Container sx={{ marginTop: "80px" }}>
      <Card sx={{ marginTop: "20px" }}>
        <CardHeader
          sx={{ background: "#efefef", marginBottom: "20px" }}
          avatar={
            <Avatar aria-label="recipe" src={item.user_id.img_url_preview}>

            </Avatar>
          }


          title={
            props.role == "admin"?
            <span>{state.item.user_id.name}</span>
            :
            <span onClick={onClickUser} onMouseEnter={handleHover} onMouseLeave={handleOverLeave} style={{ cursor: "pointer", textDecoration: isHover ? "underLine" : "none" }}>{state.item.user_id.name}</span>

          }
          subheader={date}
        >

        </CardHeader>

        <Grid sx={{ display: "flex", flexWrap: "wrap", paddingX: "20px", paddingBottom: "20px" }}>

          <Grid sx={{ height: "70vh", width: { xs: "100%", md: "58%" }, marginRight: { md: "20px" } }}>
            <Grid onClick={handleClickOpen} sx={{ height: "70%", backgroundRepeat: "no-repeat",border:"1px solid grey", borderRadius: "5px", display: "flex", justifyContent: "right", alignItems: "end", backgroundSize: "cover", cursor: "pointer", backgroundPosition: "center", backgroundImage: `url(${item.img_url})` }}>
              <div style={{ background: "rgba(255, 255, 255, 0.732)", margin: "10px", borderRadius: "10px" }}>
                <IconButton onClick={(e) => { e.stopPropagation(); onLike() }} aria-label="add to favorites">
                  {

                    like ?
                      <FavoriteIcon style={{ color: "red" }} />
                      :

                      <FavoriteIcon />

                  }


                </IconButton>
                {

                  item.likes == 0 ?
                    <></>
                    :
                    <span style={{ paddingRight: "10px"}}>{item.likes}</span>
                }
              </div>
            </Grid>
            <hr></hr>
            <Grid>
              <h5><b>{item.name}</b></h5>
              <Typography>{item.description}</Typography>


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
                <Marker position={[item.mapLocation.lat.$numberDecimal, item.mapLocation.long.$numberDecimal]} icon={markerIcon}>
                  <Popup>
                    <b>{item.name}</b>
                    <div style={{ backgroundImage: `url(${item.img_url_preview})`, height: 100, width: 100, backgroundSize: "cover", backgroundPosition: "center" }} />

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
        <DialogTitle id="alert-dialog-title">
          {state.name}
        </DialogTitle>
        <DialogContent
          sx={{ width: "500px", height: "500px", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center", backgroundImage: `url(${item.img_url})` }}
        >

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