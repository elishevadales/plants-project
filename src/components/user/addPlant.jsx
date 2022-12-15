import React from 'react'
import { Button, Container } from '@mui/material'
import styles from './css/addPlant.module.css'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const AddPlant = () => {
  // console.clear()
  const [flag, setFlag] = useState(false)
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();
  const [plant, setPlant] = useState({});

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  console.log(plant)

  const componentDidMount = () => {
    if ("geolocation" in navigator) {
      alert("Available")

    } else {

      alert("Not Available")
    }
  }

  const componentDidMount2 = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let updatePlant = { "lat": position.coords.latitude, "long": position.coords.longitude };

      setPlant(plant => ({
        ...plant, ...updatePlant
      }))
      // console.log(updatePlant);
      setFlag(true);
      console.log(flag)

    });
  }

  const onSub = () => {

  }
  return (
    <Container className={styles.container}>

      <form onSubmit={handleSubmit(onSub)} className={styles.form}>

        <div className={styles.box}>
          <FormControl fullWidth className={styles.FormControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              {...register("name", { required: { value: true, message: 'plant name is requried' } })}
              className={styles.textField}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Rakefet</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
             

            </Select>
            {errors.name && errors.name.type == 'required' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
          </FormControl>
          {/* <TextField
              {...register("name", { required: { value: true, message: 'first name is requried' }, minLength: { value: 3, message: "name must be at least 3 characters" } })}
              className={styles.textField}
              style={{}}
              id="standard-basic"
              label="Plant name"
            />
            {errors.name && errors.name.type == 'required' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
            {errors.name && errors.name.type == 'minLength' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
            <br /> */}
          <Box>
            <TextField className={styles.textField}
              id="standard-basic"
              label="Image url"
            />
          </Box>

          {/* <Button onClick={componentDidMount}>Check location access permission</Button> */}
          <Button onClick={componentDidMount2}>Share current location</Button>
          {
            flag == true ? <p>you chose current location</p> : <></>
          }
          <Button style={{ background: "#57b846", width: "130px", height: "40px", color: "white" }} type='submit'>Add Plant</Button>
        </div>

      </form>



    </Container>
  )
}

export default AddPlant