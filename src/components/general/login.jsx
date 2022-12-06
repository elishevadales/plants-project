import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import styles from './css/login.module.css'
import { Container, style } from '@mui/system'
import { Button } from '@mui/material'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TbFlower } from 'react-icons/tb';
import { GiFireFlower } from 'react-icons/gi';
import { API_URL, doApiMethod, TOKEN_NAME } from '../../services/apiService';
import { hover } from '@testing-library/user-event/dist/hover'
// import {AppBar ,Toolbar,Typography ,Button ,IconButton} from "@mui/material"
// import {MenuIcon} from "@mui/icons-material"





const Login = () => {
  const nav = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSub = (bodyData) => {
    console.log(bodyData);
    doApiForm(bodyData);
  }

  const doApiForm = async (bodyData) => {
    let url = API_URL + "/users/login"
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      // לשמור את הטוקן
      localStorage.setItem(TOKEN_NAME, resp.data.token);
      // לשגר לעמוד של רשימת המשתמשים
      if (resp.data.role == "admin") {
        nav("/admin")
      }
      else { nav("/user") }

      console.log(resp.data)
    }
    catch (err) {
      console.log(err.response);
      alert("User or password worng, or service down");
    }
  }

  return (




    <div className={styles.loginPage}>
      <Container>
        <form onSubmit={handleSubmit(onSub)} className={styles.form}>
          <div className={styles.formDiv}>
            <label>Email:</label><br />
            <input className={styles.input}{...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="text"></input><br />
            {errors.email && <div style={{ color: "red" }}>Enter valid name</div>}
            <label>Password:</label><br />
            <input className={styles.input} {...register("password", { required: true, minLength: 2 })} type="Password"></input>
            {errors.password && <div style={{ color: "red" }}>Enter valid password</div>}
            <br /><br />
            <div className={styles.buttonDiv}>
                          <Button className={styles.button} sx={{ background: "#57b846", color: "white"}} type='submit'>Log-in</Button>

            </div>
            <p style={{textAlign:"center"}}>you don't have an account? <Link to="/signUp">sign-up</Link></p>
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
              <GiFireFlower className={styles.myIcon3} style={{ fontSize: "150px" }} />
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