import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Container, Box } from '@mui/material';
import { useForm } from "react-hook-form"
import { doApiMethod } from '../../services/apiService';
import { API_URL, doApiGet } from '../../services/apiService';
import styles from './css/myInfo.module.css'
import profile from '../../images/profile.png'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddAvatar from './addAvatar';
import { ModeEdit} from '@mui/icons-material';
import { RiDeleteBinLine } from 'react-icons/ri';


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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ar, setAr] = useState([]);

  
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();

  console.log(ar)

  useEffect(() => {
    doApi();
    console.clear();
  }, [])



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
    // if(bodyData.img_url == ""){
    //   delete bodyData.img_url
    // }
    console.clear();
    console.log(bodyData)
    doApiForm(bodyData);
  }

  const onDelClick =() => {

  }

  return (
    <Container >
      <div className={styles.container}>

        {ar.map((item, i) => {
          return (
            <div key={item._id} className={styles.formDiv}>

              <form onSubmit={handleSubmit(onSub)} className={styles.form}>

                <label>Name:</label>
                <input {...register("name", { required: { value: true, message: 'first name is requried' }, minLength: { value: 3, message: "name must be at least 3 characters" } })} defaultValue={item.name}></input>
                {errors.name && errors.name.type == 'required' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
                {errors.name && errors.name.type == 'minLength' && <small style={{ color: "red" }} className='error'>{errors?.name?.message}</small>}
                <label>Email:</label>
                <input disabled={item.email} defaultValue={item.email}></input>
                <label>Date-Created</label>
                <input disabled={item.date_created} defaultValue={item.date_created}></input>

                <Box textAlign='center'>
                  <Button style={{ background: "#57b846", color: "white", marginTop: "20px" }} type="submit">update details</Button>
                </Box>

              </form>

              <div>
                {
                  !item.img_url ?
                    <div className={styles.imgDiv} style={{ backgroundImage: `url(${profile})` }}></div>
                    :
                    <div className={styles.imgDiv} style={{ backgroundImage: `url(${item.img_url})` }}></div>

                }
<div style={{display:"flex",justifyContent:"end"}}>
                  <p onClick={handleOpen} className={styles.editBtn}><ModeEdit/></p>
                  <p onClick={onDelClick} className={styles.editBtn}><RiDeleteBinLine/></p>
                
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
          )
        })}


      </div>
    </Container>
  )
}

export default MyInfo