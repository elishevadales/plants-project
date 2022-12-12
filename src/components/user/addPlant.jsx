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
    navigator.geolocation.getCurrentPosition(function (position) {
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
        <Box className={styles.box}>

          <TextField className={styles.textField}
            id="standard-number"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />

          <TextField className={styles.textField}
            id="standard-number"
            label="Image url"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />

          <TextField className={styles.textField}
            id="standard-number"
            label="Number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />

        </Box>
        <Button type='submit'></Button>
      <button onClick={componentDidMount}>Check location access permission</button>
      <button onClick={componentDidMount2}>Share current location</button>
    </Container>
  )
}

export default AddPlant