import React, { useRef, useEffect, useState, setState } from 'react'
import { Button, Container, Box, Card, CardContent, Grid, TextField, FormControl, MenuItem, Stack, Checkbox, Typography } from '@mui/material'
import styles from './css/addPlant.module.css'
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';
import { BsCheckLg } from 'react-icons/bs';
import { MdAddAPhoto } from 'react-icons/md';
import { setTranslateValue } from '@mui/material/node/Slide/Slide';
import { API_URL, TOKEN_NAME } from '../../services/apiService';
import { doApiMethod } from '../../services/apiService';
import axios from 'axios';
import options from '../../constants/plantsNames'
import Geocode from "react-geocode";
// import geocoder from "geocoder"



const AddPlant = (props) => {
  const nav = useNavigate();
  const [photoFlag, setPhotoFlag] = useState(false)
  const [locationFlag, setLocationFlag] = useState(false)
  const photoRef = useRef();
  const { register, getValues, handleSubmit, setValue, formState: { errors } } = useForm();
  const [plant, setPlant] = useState({ name: "default", mapLocation: { lat: 12345, long: 12345 }, img_file: "default" });

  Geocode.setLanguage("en");
  Geocode.setRegion("il");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();

  useEffect(() => {
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }

    // Geocode.fromLatLng("31.509965", "34.920394").then(
    //   (response) => {
    //     const address = response.results[0].formatted_address;
    //     console.log(address);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

  }, [])

  const onInputPhoto = () => {
    setPhotoFlag("true")
  }


  // add location
  const componentDidMount = () => {

    navigator.geolocation.getCurrentPosition((position) => {
      let updatePlant = { mapLocation: { "lat": position.coords.latitude, "long": position.coords.longitude } };

      setPlant(plant => ({
        ...plant, ...updatePlant
      }))
      setLocationFlag(true);

    });
  }


  const onSub = async (data) => {
    console.log(data)
    let img_file = data.img_file
    delete data.img_file
    console.log(data.mapLocation.lat)
    console.log(img_file)
    if (img_file.length == 0) {
      return alert("you need to choose file and then upload it")
    }
    if (img_file[0].size > 2 * 1024 * 1024) {
      return alert("file too big")
    }
    let ext_file = img_file[0].name.split('.').pop();
    if (ext_file != "png" && ext_file != "jpeg" && ext_file != "gif" && ext_file != "jpg") {
      return alert("you can send only png, jpeg, gif")
    }
    await doApiLocation(data, img_file);




  }

  const doApiLocation = async (data, img_file) => {

    const lat = data.mapLocation.lat;
    const lng = data.mapLocation.long;

    let url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    try {
      let resp = await doApiMethod(url, "GET");
      
      if (resp.data.address == undefined) {
        data.location = "מיקום לא ידוע"
      }
      else if (resp.data.address.state != undefined) {
        data.location = resp.data.address.state
      }
      else if (resp.data.address.country != undefined) {
        data.location = resp.data.address.country
      }
      else {
        data.location = "מיקום לא ידוע"
      }

      await doApiForm(data, img_file);


    }
    catch (err) {
      alert("there is an error, try again later")
      console.log(err);
    }

  }

  const doApiForm = async (bodyData, img_file) => {
    let url = API_URL + "/plants"
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      console.log(resp.data._id)
      addPlantImg(img_file, resp.data._id);
    }
    catch (err) {

      console.log(err.response);
      alert("adding-plant problem");
    }

  }

  const addPlantImg = async (img_file, plantId) => {


    const formData = new FormData();
    formData.append("plant", img_file[0]);
    let url = API_URL + "/upload/plant/" + plantId;

    try {

      let resp = await axios.post(url, formData, {
        headers: {
          'x-api-key': localStorage[TOKEN_NAME]
        }
      })
      console.log(resp.data)
      if (resp.data.status) {
        alert("file uploaded")
        if (props.role == "admin") {
          nav("/admin")
        }
        else {
          nav("/user")
        }


      }
      else {
        alert("file didn't upload")
      }
    }
    catch (err) {
      alert("there error, try again later")
      console.log(err);
    }
  }




  return (

    <form onSubmit={handleSubmit(onSub)}>

      <Container className={styles.container}>
        <Box >
          <Grid justifyContent={"center"} container spacing={1}>
            <Grid xs={12} sm={6} item>

              <h4 style={{ color: "#57b846" }}>Plant photo</h4>
              {/* photo input */}


              <div style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                // display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
                height: "200px",

              }} className="custom-file-upload">

                <input
                  {...register("img_file")} className={"custom-file-input"} required onChange={onInputPhoto} style={{}} type="file" accept="image/png, image/gif, image/jpeg, image/jpg"
                />

                <MdAddAPhoto style={{ marginRight: "6px" }} />



              </div>


              {/* {photoFlag == false ? <></> : <BsCheckLg style={{ color: "green", marginLeft: "10px" }} />} */}

              <br />

              {/* name input */}

              <h4 style={{ color: "#57b846" }}>Plant name</h4>
              <select className="form-select" {...register("name")} required>
                <option value="">select...</option>
                {options.map((item, i) => {
                  return (
                    <option key={i} value={item.value}>{item.label}</option>
                  )
                })}
              </select>
              <br />


              {/* location input */}
              <h4 style={{ color: "#57b846" }}>Location</h4>
              <Button onClick={componentDidMount}>Share current location</Button>
              <br />
              {locationFlag == true ?
                <div>

                  <label>Latitude:</label>
                  <br />

                  <input required className="form-control" defaultValue={plant.mapLocation.lat} {...register("mapLocation.lat")}></input>

                  <label>Longitude:</label>
                  <input required className="form-control" defaultValue={plant.mapLocation.long} {...register("mapLocation.long")}></input>
                </div>
                :
                <div>
                  <label>Latitude:</label>
                  <br />
                  <input required className="form-control"></input>

                  <label>Longitude:</label>
                  <br />
                  <input required className="form-control"></input>
                </div>
              }
              <h4 style={{ color: "#57b846" }}>you can add a description:</h4>
              <textarea {...register("description")} maxLength="400" className="form-control"></textarea>

              {/* submit button */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button style={{ background: "#57b846", width: "130px", height: "40px", color: "white" }} type='submit'>Add Plant</Button>
              </div>


            </Grid>
          </Grid>
        </Box>
      </Container>

    </form >

  )
}

export default AddPlant

