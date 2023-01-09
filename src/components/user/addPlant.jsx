import React, { useRef, useEffect, useState, setState } from 'react'
import { Button, Container, Box, Card, CardContent, Grid, TextField, FormControl, MenuItem, Stack, Checkbox, Typography } from '@mui/material'
import styles from './css/addPlant.module.css'
import { useForm, Controller } from "react-hook-form"
import Select from 'react-select';
import { options } from '../../constants/plantsNames';
import { BsCheckLg } from 'react-icons/bs';
import { MdAddAPhoto } from 'react-icons/md';
import { setTranslateValue } from '@mui/material/node/Slide/Slide';
import PlantsList from '../../constants/plantsList';


const AddPlant = () => {

  const [photoFlag, setPhotoFlag] = useState(false)
  const [locationFlag, setLocationFlag] = useState(false)
  const photoRef = useRef();
  // const nameRef = useRef();
  const { register, getValues, handleSubmit, setValue, formState: { errors } } = useForm();




  // const values = getValues('name');

  const [plant, setPlant] = useState({ name: "default", location: { lat: 12345, long: 12345 }, img_file: "default" });


  //add name
  const onName = () => {

    // setPlant({
    //   ...plant,
    //   // name: nameRef.current.props.value
    //   name: values
    //   })

    // let updateName = { name:  };

    // setPlant(plant => ({
    //   ...plant, ...updateName
    // }))
  }


  //add photo
  const onInputPhoto = () => {
    setPhotoFlag("true")
  }


  // add location
  const componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let updatePlant = { location: { "lat": position.coords.latitude, "long": position.coords.longitude } };

      setPlant(plant => ({
        ...plant, ...updatePlant
      }))
      setLocationFlag(true);

    });
  }


  const onSub = (data) => {


    console.log(data)
    console.log(data.img_file[0].size)
    if(data.img_file[0].size > 2 * 1024 * 1024){
      return alert("file too big")
    }


  }


  return (

    <form onSubmit={handleSubmit(onSub)}>

      <Container className={styles.container}>
        <Box >
          <Grid justifyContent={"center"} container spacing={1}>
            <Grid xs={12} sm={6} item>

<h4 style={{color:"#57b846" }}>Plant photo</h4>
              {/* photo input */}

              
              <div  style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                // display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
                height: "200px",
                
              }} className="custom-file-upload">
               
                  <input
                    {...register("img_file")} className={"custom-file-input"} required onChange={onInputPhoto} style={{}} type="file" accept="image/png, image/jpg, image/gif, image/jpeg"
                  />
                  <MdAddAPhoto style={{ marginRight: "6px" }} />
               


              </div>

              {/* {photoFlag == false ? <></> : <BsCheckLg style={{ color: "green", marginLeft: "10px" }} />} */}

              <br />

              {/* name input */}
              
              <h4 style={{color:"#57b846"}}>Plant name</h4>
              <select className="form-select" {...register("name")} required>
                {/* <option value="select..." >select...</option> */}
                <option value="">select...</option>
                <PlantsList></PlantsList>
              </select>
              <br/>

              {/* location input */}
              <h4 style={{color:"#57b846"}}>Location</h4>
              <Button onClick={componentDidMount}>Share current location</Button>
              <br />
              {locationFlag == true ?
                <div>

                  <label>Latitude:</label>
                  <br />

                  <input required className="form-control" defaultValue={plant.location.lat} {...register("location.lat")}></input>

                  <label>Longitude:</label>
                  <input required className="form-control" defaultValue={plant.location.long} {...register("location.long")}></input>
                </div>
                :
                <>
                  <label>Latitude:</label>
                  <br />
                  <input required className="form-control"></input>

                  <label>Longitude:</label>
                  <br />
                  <input required className="form-control"></input>
                </>
              }

              {/*map/*}
leaflet or maptiler


              {/* submit button */}
              <div style={{display:"flex", justifyContent:"center"}}>
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

