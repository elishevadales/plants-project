import React from 'react'
import { useState,useEffect } from 'react';
import {doApiGet } from '../../services/apiService';
import { Link } from 'react-router-dom';


const PageNav = (props) => {

    const [pages,setPages] = useState(0);

    useEffect(() => {
      doApi();
    },[])

    const doApi = async() => {
        let url = props.urlPageApi;
        let resp = await doApiGet(url);
        let totalPages = Math.ceil(resp.data.count/props.perPage)
        // מגדיר את מספר העמודים
        setPages(totalPages);
    
        console.log(resp.data); 
      }

  return (
    <div>
    <span>Page:</span>
    {/* נרצה לעשות לולאה לפי מספר העמודים ולייצר לינקים */}
    {/* [...Array(pages)] -> מייצר מערך זמני לפי מספר כדי שנוכל לבצע על מספר לולאה כערך המספר */}
    {[...Array(pages)].map((item,i) => {
      return(
        <Link to={props.navToDir + (i+1)} className={props.cssClass} key={i}>{i+1}</Link>
      )
    })}
  </div>
  )
}

export default PageNav