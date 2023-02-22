import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { API_URL, doApiGet } from '../services/apiService';
import { API_URL, doApiGet } from '../../services/apiService';
import { TOKEN_NAME } from '../../services/apiService';

export default function CheckAdminComp() {
  const nav = useNavigate();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    try{
      let url = API_URL+"/users/checkToken"
      let resp = await doApiGet(url);
      if(resp.data.role != "admin"){
        localStorage.removeItem(TOKEN_NAME);
        nav("/");
        alert("You are not an admin");
        
      }
      
    }
    catch(err){
      alert("There problem ,try log in again");
      nav("/")
    }


  }
  
  return (
    <React.Fragment></React.Fragment>
  )
}
