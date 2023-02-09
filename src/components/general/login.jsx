import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import styles from './css/login.module.css'
import { Container, style } from '@mui/system'
import { Button, Typography } from '@mui/material'
import { FaMapMarkerAlt } from 'react-icons/fa';

import { TbFlower } from 'react-icons/tb';
import { GiFireFlower, GiCottonFlower, GiSpotedFlower } from 'react-icons/gi';
import { API_URL, doApiMethod, TOKEN_NAME, doApiGet } from '../../services/apiService';
import MapUser from '../user/mapUser'
import { updateUserInfo } from '../../reducer/userInfoSlice';
import { useSelector, useDispatch } from 'react-redux';
// import {AppBar ,Toolbar,Typography ,Button ,IconButton} from "@mui/material"
// import {MenuIcon} from "@mui/icons-material"





const Login = () => {
  // const dispatch = useDispatch();
  const nav = useNavigate();
  // const [ar, setAr] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSub = async (bodyData) => {
    console.log(bodyData);
    await doApiForm(bodyData);
    // doApiInfo();
    console.log(bodyData);
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
        console.clear();
        nav("/admin")
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

  // const doApiInfo = async () => {
  //   let url = API_URL + "/users/myInfo";
  //   try {
  //     let resp = await doApiGet(url);
  //     console.log(resp.data);
  //     setAr([resp.data]);
  //     dispatch(updateUserInfo({
  //       update: resp.data
        
  //     }));

  //   }
  //   catch (err) {
  //     console.log(err);
  //     alert("there problem ,try again later")
  //     nav("/")
  //   }
  // }

  return (




    <div className={styles.loginPage}>
      <Container>
        <form onSubmit={handleSubmit(onSub)} className={styles.form}>
          <div className={styles.formDiv}>
            <label>Email:</label><br />
            <input className="form-control" style={{ width: "300px" }} {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="text"></input><br />
            {errors.email && <div style={{ color: "red" }}>Enter valid name</div>}
            <label>Password:</label><br />
            <input className="form-control" style={{ width: "300px" }} {...register("password", { required: true, minLength: 2 })} type="Password"></input>
            {errors.password && <div style={{ color: "red" }}>Enter valid password</div>}
            <br /><br />
            <div className={styles.buttonDiv}>
              <Button className={styles.button} sx={{ background: "#57b846", color: "white" }} type='submit'>Log-in</Button>

            </div>
            <p style={{ textAlign: "center" }}>you don't have an account? <Link to="/signUp">sign-up</Link></p>




          </div>

          <div className={styles.icons}>
            <div className={styles.div}>
              <FaMapMarkerAlt className={styles.myIcon1} style={{ fontSize: "150px" }} />
              <div className={styles.info}>
                Dolore nihil qui soluta consequatur, officiis doloribus dignissimos consectetur, ipsum exercitationem adipisci cum quam a.
              </div>
            </div>
            <div className={styles.div}>
              <TbFlower className={styles.myIcon2} style={{ fontSize: "150px" }} />
              <div className={styles.info}>
                Dolore nihil qui soluta consequatur, officiis doloribus dignissimos consectetur, ipsum exercitationem adipisci cum quam a.
              </div>
            </div>
            <div className={styles.div}>
              <GiSpotedFlower className={styles.myIcon3} style={{ fontSize: "150px" }} />
              <div className={styles.info}>
                Dolore nihil qui soluta consequatur, officiis doloribus dignissimos consectetur, ipsum exercitationem adipisci cum quam a.
              </div>
            </div>
          </div>


        </form>

      </Container>


    </div>
  )
}

export default Login