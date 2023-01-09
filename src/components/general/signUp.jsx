import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { API_URL } from '../../services/apiService'
import { doApiMethod } from '../../services/apiService'
import { style } from '@mui/system'
import styles from './css/signUp.module.css'
import { Button, Box } from '@mui/material'


const SignUp = () => {

  const nav = useNavigate();
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();

  const onSub = (bodyData) => {
    console.clear();
    delete bodyData.emailAgain;
    delete bodyData.passwordAgain;

    console.log(bodyData);
    doApiForm(bodyData);
  }

  const doApiForm = async (bodyData) => {
    let url = API_URL + "/users"
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      // return to login page
      nav("/")
    }
    catch (err) {
      // if(){
      //   alert("you allready have an acount. please try login");
      // }
      console.log(err.response);
      alert("sign-up problem");
    }
  }

  return (
    <div className={styles.formDiv}>
      <form onSubmit={handleSubmit(onSub)} className={styles.form}>

        <label>Name:</label>
        <input className="form-control" {...register("name", { required: { value: true, message: 'first name is requried' }, minLength: { value: 3, message: "name must be at least 3 characters" } })} type="text"></input>
        {errors.name && errors.name.type == 'required' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
        {errors.name && errors.name.type == 'minLength' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}


        <label>Email:</label>
        <input className="form-control" {...register("email", { required: { value: true, message: 'email is requried' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email" } })} type="text"></input>
        {errors.email && errors.email.type == 'required' && <small style={{ color: "red" }}>{errors?.email?.message}</small>}
        {errors.email && errors.email.type == 'pattern' && <small style={{ color: "red" }}>{errors?.email?.message}</small>}

        <label>Email again:</label>
        <input className="form-control" {...register("emailAgain", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, validate: (value) => value === getValues("email") })} type="text"></input>
        {errors.emailAgain && <small style={{ color: "red" }}>Email is not match</small>}


        <label>Password:</label>
        <input className="form-control" {...register("password", { required: { value: true, message: 'password is requried' }, minLength: { value: 6, message: "name must be at least 6 characters" } })} type="password"></input>
        {errors.password && errors.password.type == 'required' && <small style={{ color: "red" }}>{errors?.password?.message}</small>}
        {errors.password && errors.password.type == 'minLength' && <small style={{ color: "red" }}>{errors?.password?.message}</small>}

        <label>Password again:</label>
        <input className="form-control" {...register("passwordAgain", { required: true, minLength: 2, validate: (value) => value === getValues("password") })} type="password"></input>
        {errors.passwordAgain && <small style={{ color: "red" }}>Password is not match</small>}


        <label>Profile Image:</label>
        <input className="form-control" {...register("img_url")} type="text"></input>
        {/* <input onChange={onChangeImg} {...register("img_url")} type="file" /> */}

        <Box textAlign='center'>
          <Button type='submit' style={{ background: "#57b846", width: "130px", height: "40px", color: "white" }}>Sign-up</Button>
        </Box>
      </form>
      <p>allready have an account? <Link to="/">log-in</Link></p>
      <hr></hr>
    </div>
  )
}

export default SignUp