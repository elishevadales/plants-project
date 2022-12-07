import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Container, Box } from '@mui/material';
import { useForm } from "react-hook-form"
import { doApiMethod } from '../../services/apiService';
import { API_URL, doApiGet } from '../../services/apiService';
import styles from './css/myInfo.module.css'

const MyInfo = () => {

  const [ar, setAr] = useState([]);
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();

  console.log(ar)

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      console.clear();
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
    console.clear();
    console.log(bodyData)
    doApiForm(bodyData);
  }

  return (
    <Container >
      <form onSubmit={handleSubmit(onSub)} className={styles.form}>
        {ar.map((item, i) => {
          return (
            <div key={item._id}>
              <label>Name:</label><br />
              <input {...register("name", { required: { value: true, message: 'first name is requried' }, minLength: { value: 3, message: "name must be at least 3 characters" } })} defaultValue={item.name}></input><br /><br />
              <label>Email:</label><br />
              <input disabled={item.email} defaultValue={item.email}></input><br /><br />
              <label>Date-Created</label><br />
              <input disabled={item.date_created} defaultValue={item.date_created}></input><br /><br />
              <label>Profile image</label><br />
              <input {...register("img_url")} defaultValue={item.img_url}></input><br />
              {item.active ? <p style={{ color: "green" ,textAlign:"center"}}>Your account is active</p> : <p style={{ color: "white",background:"red" ,textAlign:"center"}}>Your account is blocked</p>}

              <Box textAlign='center'>
                <Button style={{ background: "#57b846", width: "130px", height: "40px", color: "white", justifyContent: "center" }} display="flex" justifyContent="center" type="submit">update</Button>

              </Box>

              <p></p>
            </div>

          )
        })}

      </form>
    </Container>
  )
}

export default MyInfo