import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import styles from './css/login.module.css'
import { Container, Grid } from '@mui/material'
import { Button, Typography,Box } from '@mui/material'
import { FaMapMarkerAlt } from 'react-icons/fa';

import { TbFlower } from 'react-icons/tb';
import { GiFireFlower, GiCottonFlower, GiSpotedFlower } from 'react-icons/gi';
import { API_URL, doApiMethod, TOKEN_NAME, doApiGet } from '../../services/apiService';
import MapUser from '../user/mapUser'
import { updateUserInfo } from '../../reducer/userInfoSlice';
import { useSelector, useDispatch } from 'react-redux';


const Login = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSub = async (bodyData) => {
    console.log(bodyData);
    await doApiForm(bodyData);
    // doApiInfo();
    console.log(bodyData);
  }

  const iconDiv = {
    textAlign: "center",
    width: "200px",
    margin: "20px",
    minWidth: "20%",
  }


  const doApiForm = async (bodyData) => {
    let url = API_URL + "/users/login"
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      console.log(resp.data)
      // delete old token
      localStorage.removeItem(TOKEN_NAME);
      // לשמור את הטוקן
      localStorage.setItem(TOKEN_NAME, resp.data.token);
      // לשגר לעמוד של רשימת המשתמשים
      if (resp.data.active == false) {
        alert("Your account is blocked. Please contact the site administrator")
        nav("/")
      }
      else if (resp.data.role == "admin") {
        console.log("you loged in as an admin")

        dispatch(updateUserInfo({
          update: resp.data
        }))
        
        nav("/admin/plantsList")
      }
      else {
        nav("/user")
      }

      console.log(resp.data)
    }
    catch (err) {
      console.log(err.response);
      alert("User or password worng, or service down");
    }
  }


  return (

    <Container sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", padding: "30px" }}>

      <Grid className={styles.form}>
        <form onSubmit={handleSubmit(onSub)} className={styles.formDiv}>
          <label>Email:</label>
          <input className="form-control" style={{ width: "300px" }} {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="text"></input>
          {errors.email && <div style={{ color: "red" }}>Enter valid name</div>}
          <label style={{marginTop:"10px"}}>Password:</label>
          <input className="form-control" style={{ width: "300px" }} {...register("password", { required: true, minLength: 2 })} type="Password"></input>
          {errors.password && <div style={{ color: "red" }}>Enter valid password</div>}
          <Box className={styles.buttonDiv}>
            <Button style={{ background: "#57b846", color: "white"}} type='submit'>Log-in</Button>

          </Box>
          <p style={{ textAlign: "center" }}>you don't have an account? <Link style={{color:"#57b846"}} to="/signUp">sign-up</Link></p>
        </form>
      </Grid>


      <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
        <Grid className={styles.icons}>
          <Grid sx={iconDiv}>
            <FaMapMarkerAlt className={styles.myIcon1} style={{ fontSize: "150px" }} />
            <div className={styles.info}>
              Dolore nihil qui soluta consequatur, officiis doloribus dignissimos consectetur, ipsum exercitationem adipisci cum quam a.
            </div>
          </Grid>
          <Grid sx={iconDiv}>
            <TbFlower className={styles.myIcon2} style={{ fontSize: "150px" }} />
            <div className={styles.info}>
              Dolore nihil qui soluta consequatur, officiis doloribus dignissimos consectetur, ipsum exercitationem adipisci cum quam a.
            </div>
          </Grid>
          <Grid sx={iconDiv}>
            <GiSpotedFlower className={styles.myIcon3} style={{ fontSize: "150px" }} />
            <div className={styles.info}>
              Dolore nihil qui soluta consequatur, officiis doloribus dignissimos consectetur, ipsum exercitationem adipisci cum quam a.
            </div>
          </Grid>
        </Grid>

      </Grid>

    </Container>

  )
}

export default Login
