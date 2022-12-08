import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Container, Box } from '@mui/material';
import { useForm } from "react-hook-form"
import { doApiMethod } from '../../services/apiService';
import { API_URL, doApiGet } from '../../services/apiService';
import styles from './css/myInfo.module.css'
import profile from '../../images/profile.png'

const MyInfo = () => {

  const [ar, setAr] = useState([]);
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();

  console.log(ar)

  useEffect(() => {
    doApi();
  }, [])

  const onDelImg = () => {
    if(window.confirm("do you want to delete your profile image?")){
      alert("done")
    }
  }

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      // console.clear();
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr([resp.data]);

    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
    }

  }

  const doApiForm = async (bodyData) => {
    let url = API_URL + "/users/changeMyInfo"
    try {
      let resp = await doApiMethod(url, "PUT", bodyData);
      alert("changes saved")

    }
    catch (err) {

      console.log(err.response);
      alert("update problem");
    }
  }

  const onSub = (bodyData) => {
    // if(bodyData.img_url == ""){
    //   delete bodyData.img_url
    // }
    console.clear();
    console.log(bodyData)
    doApiForm(bodyData);
  }

  return (
    <Container >
      <form onSubmit={handleSubmit(onSub)} className={styles.form}>
        {ar.map((item, i) => {
          return (
            <div key={item._id} className={styles.mapDiv}>
              <div className={styles.formDiv}>
                <label>Name:</label>
                <input {...register("name", { required: { value: true, message: 'first name is requried' }, minLength: { value: 3, message: "name must be at least 3 characters" } })} defaultValue={item.name}></input>
                {errors.name && errors.name.type == 'required' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
                {errors.name && errors.name.type == 'minLength' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
                <label>Email:</label>
                <input disabled={item.email} defaultValue={item.email}></input>
                <label>Date-Created</label>
                <input disabled={item.date_created} defaultValue={item.date_created}></input>
                <label>Profile image</label>
                <input {...register("img_url")} defaultValue={item.img_url}></input>
                
                {item.active ? <p style={{ color: "green", textAlign: "center" }}>Your account is active</p> : <p style={{ color: "white", background: "red", textAlign: "center" }}>Your account is blocked</p>}
                <Box textAlign='center'>
                  <Button style={{ background: "#57b846", width: "130px", height: "40px", color: "white", justifyContent: "center" }} display="flex" type="submit">update</Button>
                </Box>
              </div>


              {
                !item.img_url ?
                  <div className={styles.imgDiv} style={{ backgroundImage: `url(${profile})` }}></div>
                    :
                    <div className={styles.imgDiv} style={{ backgroundImage: `url(${item.img_url})` }}></div>

                }
                <p onClick={onDelImg} className={styles.delBtn}>delete image</p>




                    
                  </div>


          )
        })}

            </form>
    </Container>
  )
}

export default MyInfo