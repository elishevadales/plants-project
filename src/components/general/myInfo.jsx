import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Container, Box, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
import { doApiMethod } from '../../services/apiService';
import { API_URL, doApiGet } from '../../services/apiService';
import styles from './css/myInfo.module.css'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddAvatar from './addAvatar';
import { ModeEdit } from '@mui/icons-material';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../reducer/userInfoSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyInfo = () => {

  //redux
  const dispatch = useDispatch();
  const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)

  const nav = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const { register, getValues, handleSubmit, formState: { errors } } = useForm();



  useEffect(() => {
    doApi();
    

  }, [])



  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      // console.clear();
      let resp = await doApiGet(url);
      console.log(resp.data);
      dispatch(updateUserInfo({
        update: resp.data
        
      }))


    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
      nav("/")
    }

  }

  const doApiForm = async (bodyData) => {
    let url = API_URL + "/users/changeMyInfo"
    try {
      let resp = await doApiMethod(url, "PUT", bodyData);
      console.log(bodyData)
      alert("changes saved")
      doApi();

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

  const onDelClick = async () => {

    if (window.confirm("are you sure you want to delete your profile image?")) {

      let url = API_URL + "/upload/avatar";
      try {
        let resp = await doApiMethod(url, "DELETE");
        // console.log(ar)
        console.log(resp.data);
        alert("profile image wad deleted")
        doApi();



      }
      catch (err) {
        console.log(err);
        alert("there problem ,try again later")
      }
    }

  }

  return (
    <Container >
      
      <div className={styles.container}>


            <div className={styles.formDiv}>

              <form onSubmit={handleSubmit(onSub)} className={styles.form}>
                <label>Name:</label>
                <input className="form-control" {...register("name", { required: { value: true, message: 'first name is requried' }, minLength: { value: 3, message: "name must be at least 3 characters" } })} defaultValue={myUserInfo?.user?.name}></input>
                {errors.name && errors.name.type == 'required' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
                {errors.name && errors.name.type == 'minLength' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
                <label>Email:</label>
                <input className="form-control" disabled={myUserInfo?.user?.email} defaultValue={myUserInfo?.user?.email}></input>
                <label>Date-Created</label>
                <input className="form-control" disabled={myUserInfo?.user?.date_created} defaultValue={myUserInfo?.user?.date_created}></input>

                <Box textAlign='center'>
                  <Button style={{ background: "#57b846", color: "white", marginTop: "20px" }} type="submit">update details</Button>
                </Box>

              </form>


              <div>

                <div className={styles.imgDiv} style={{ backgroundImage: `url(${myUserInfo?.user?.img_url_preview})`,backgroundPosition:"center" ,backgroundSize:"cover"}}></div>


                <div style={{ display: "flex", justifyContent: "end" }}>
                  <p onClick={handleOpen} className={styles.editBtn}><ModeEdit /></p>
                  <p onClick={onDelClick} className={styles.editBtn}><RiDeleteBinLine /></p>
                </div>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >

                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Edit profile photo
                    </Typography>
                    <AddAvatar handleClose={handleClose} doApi={doApi} />
                  </Box>



                </Modal>
              </div>
            </div>


      </div>
    </Container>
  )
}

export default MyInfo