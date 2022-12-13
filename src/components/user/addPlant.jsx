import React from 'react'
import { Button, Container } from '@mui/material'
import styles from './css/addPlant.module.css'
import { useEffect, useState } from 'react';
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField';

const AddPlant = () => {

  const [plant, setPlant] = useState({});

  const componentDidMount = () => {
    if ("geolocation" in navigator) {
      alert("Available")

    } else {

      alert("Not Available")
    }
  }

  const componentDidMount2 = () => {
    navigator.geolocation.getCurrentPosition( (position) => {
      console.clear()
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      let updatePlant = { "lat": position.coords.latitude, "long": position.coords.longitude };
      
      setPlant(plant => ({
        ...plant, ...updatePlant
      }))
      console.log(updatePlant)
      console.log(plant)

    });
  }

  return (
    <Container className={styles.container}>
      <Box >
        <div className={styles.box}>

        <TextField className={styles.textField}
          id="standard-basic"
          label="Plant name"
        // variant="standard"
        />
        <br />

        <TextField className={styles.textField}
          id="standard-basic"
          label="Image url"
        // variant="standard"
        />
        <br />

        <TextField className={styles.textField}
          id="standard-basic"
          label="Map location"

        // variant="standard"
        />

      <Button onClick={componentDidMount}>Check location access permission</Button>
      <Button onClick={componentDidMount2}>Share current location</Button>
      <Button style={{ background: "#57b846", width: "130px", height: "40px", color: "white" }} type='submit'>Add Plant</Button>
        </div>

      </Box>

    </Container>
  )
}

export default AddPlant