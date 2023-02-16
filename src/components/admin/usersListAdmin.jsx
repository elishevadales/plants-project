import { Container } from '@mui/system'
import { useState,useEffect } from 'react';
import React from 'react'
import { API_URL, doApiGet } from '../../services/apiService';
import UserItem from './userItem';
import CheckAdmin from './checkAdmin'
import styles from './css/usersListAdmin.module.css'


const UsersListAdmin = () => {

  const [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL+"/users/usersList";
    try{
      let resp = await doApiGet(url);
      console.log(resp.data.data);
      setAr(resp.data.data);
      console.log(resp);
    }
    catch(err){
      console.log(err);
      alert("there problem ,try again later")
    }

  }


  return (
    <main>
      <Container>
        
      <h1 style={{textAlign:"center", color:"#57b846"}}>List of users in systems:</h1>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Img-URL</th>
            <th>Date-created</th>
            <th>Role</th>
            <th>Active</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <UserItem key={item._id} doApi={doApi} index={i} item={item}/>
            )
          })}
        </tbody>
      </table>
      </Container>
    </main>
  )
}

export default UsersListAdmin