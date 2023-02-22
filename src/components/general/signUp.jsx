import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { API_URL, TOKEN_NAME } from '../../services/apiService'
import { doApiMethod } from '../../services/apiService'
import { style } from '@mui/system'
import { Button, Box, Container ,Grid} from '@mui/material'
import { Login } from '@mui/icons-material'


const SignUp = () => {

  const nav = useNavigate();
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();

  const labelStyle = {
    marginTop: '10px'
  }

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
      // nav("/")
      
      //get in site
      console.log(bodyData)
      delete bodyData.name
      login(bodyData);
    }
    catch (err) {
      // if(){
      //   alert("you allready have an acount. please try login");
      // }
      console.log(err.response);
      alert("sign-up problem");
    }
  }

  const login = async(bodyData) => {
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
    <Container sx={{display:"flex",justifyContent:"center"}}>
      <Grid sx={{marginTop:"40px",width:"300px"}}>
      <form onSubmit={handleSubmit(onSub)}>

        <label >Name:</label>
        <input className="form-control" {...register("name", { required: { value: true, message: 'first name is requried' }, minLength: { value: 3, message: "name must be at least 3 characters" } })} type="text"></input>
        {errors.name && errors.name.type == 'required' && <><small style={{ color: "red" }} className='error'>{errors?.name?.message}</small><br /></>}
        {errors.name && errors.name.type == 'minLength' && <><small style={{ color: "red" }} className='error'>{errors?.name?.message}</small><br /></>}


        <label style={labelStyle}>Email:</label>
        <input className="form-control" {...register("email", { required: { value: true, message: 'email is requried' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email" } })} type="text"></input>
        {errors.email && errors.email.type == 'required' && <><small style={{ color: "red" }}>{errors?.email?.message}</small><br /></>}
        {errors.email && errors.email.type == 'pattern' && <><small style={{ color: "red" }}>{errors?.email?.message}</small><br /></>}

        <label style={labelStyle}>Email again:</label>
        <input className="form-control" {...register("emailAgain", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, validate: (value) => value === getValues("email") })} type="text"></input>
        {errors.emailAgain && <><small style={{ color: "red" }}>Email is not match</small><br /></>}


        <label style={labelStyle}>Password:</label>
        <input className="form-control" {...register("password", { required: { value: true, message: 'password is requried' }, minLength: { value: 6, message: "name must be at least 6 characters" } })} type="password"></input>
        {errors.password && errors.password.type == 'required' && <small style={{ color: "red" }}>{errors?.password?.message}</small>}
        {errors.password && errors.password.type == 'minLength' && <small style={{ color: "red" }}>{errors?.password?.message}</small>}

        <label style={labelStyle}>Password again:</label>
        <input className="form-control" {...register("passwordAgain", { required: true, minLength: 2, validate: (value) => value === getValues("password") })} type="password"></input>
        {errors.passwordAgain && <><small style={{ color: "red" }}>Password is not match</small><br /></>}


        <label style={labelStyle}>Profile Image:</label>
        <input className="form-control" {...register("img_url")} type="text"></input>
        {/* <input onChange={onChangeImg} {...register("img_url")} type="file" /> */}

        <Box textAlign='center'>
          <Button type='submit' style={{ background: "#57b846", width: "130px", height: "40px", color: "white" ,marginTop:"30px",marginBottom:"10px"}}>Sign-up</Button>
        </Box>
      </form>
      <p style={{textAlign:"center"}}>allready have an account? <Link style={{color:"#57b846"}} to="/">log-in</Link></p>

    </Grid>
    </Container>
    
  )
}

export default SignUp