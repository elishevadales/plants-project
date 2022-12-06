import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import { API_URL } from '../../services/apiService'
import { doApiMethod } from '../../services/apiService'


const SignUp = () => {

  const nav = useNavigate();
  const {register,getValues, handleSubmit, formState:{errors}} = useForm();

  const onSub = (bodyData) => {
    delete bodyData.emailAgain;
    delete bodyData.passwordAgain;
    // if(!bodyData.img_url){
    //   delete bodyData.img_url;
    // }
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
    <div>
        <form onSubmit={handleSubmit(onSub)}>

          <label>Name:</label><br />
          <input {...register("name", { required: { value: true, message: 'first name is requried' }, minLength: { value: 3, message: "name must be at least 3 characters" } })} type="text"></input><br />
          {errors.name && errors.name.type == 'required' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
          {errors.name && errors.name.type == 'minLength' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
          <br />

          <label>Email:</label><br />
          <input {...register("email", { required: { value: true, message: 'email is requried' }, pattern: {value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message:"invalid email"} })} type="text"></input><br />
          {errors.email && errors.email.type == 'required'&& <small style={{ color: "red" }}>{errors?.email?.message}</small>}
          {errors.email && errors.email.type == 'pattern'&& <small style={{ color: "red" }}>{errors?.email?.message}</small>}
          <br />
          <label>Email again:</label><br/>
          <input {...register("emailAgain", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, validate:(value) => value===getValues("email") })} type="text"></input><br />
          {errors.emailAgain && <small style={{ color: "red" }}>Email is not match</small>}
          <br />

          <label>Password:</label><br />
          <input {...register("password", { required: { value: true, message: 'password is requried' }, minLength: { value: 6, message: "name must be at least 6 characters" } })} type="password"></input><br />
          {errors.password && errors.password.type == 'required'&& <small style={{ color: "red" }}>{errors?.password?.message}</small>}
          {errors.password && errors.password.type == 'minLength'&& <small style={{ color: "red" }}>{errors?.password?.message}</small>}
          <br />
          <label>Password again:</label><br/>
          <input {...register("passwordAgain", { required: true, minLength: 2, validate:(value) => value===getValues("password") })} type="password"></input><br />
          {errors.passwordAgain && <small style={{ color: "red" }}>Password is not match</small>}
          <br />

          <label>Profile Image:</label><br />
          <input {...register("img_url")} type="text"></input>
          <br /><br />

          <button>Sign-up</button>
        </form>
        <p>allready have an account? <Link to="/">log-in</Link></p>
        <hr></hr>
    </div>
  )
}

export default SignUp