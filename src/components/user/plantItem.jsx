import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import { API_URL } from '../../services/apiService';
import { doApiMethod } from '../../services/apiService';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const PlantItem = (props) => {

  const nav = useNavigate();
  const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)
  let userId = myUserInfo.user._id;
  console.log(userId);
  console.log(props.item.likesList.userId);

  const [like, setLike] = useState(false)
  const [likesCount, setlikesCount] = useState(props.item.likes)

  useEffect(() => {
    if (props.item.likesList.includes(userId)) {
      setLike(true)
    }
    
  }, [])

  const onLike = async () => {
    let url = API_URL + "/plants/addLike/" + props.item._id;
    let url2 = API_URL + "/plants/deleteLike/" + props.item._id;
    if (like) {
      try {
        let resp = await doApiMethod(url2, "PATCH")
        setlikesCount(resp.data.likes)
        setLike(false)
        console.log(resp.data)
      }
      catch (err) {
        console.log(err.response);
        alert("There is a problem with delete LIKE");
      }
    }
    else {
      try {
        let resp = await doApiMethod(url, "PATCH")
        setlikesCount(resp.data.likes)
        setLike(true)
        console.log(resp.data)
      }
      catch (err) {
        console.log(err.response);
        alert("There is a problem with adding LIKE");
      }
    }

  }


  const onClickItem = () => {
    nav("/user/plantDetails")

  }


  return (

    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader
        onClick={onClickItem}
        avatar={
          <Avatar aria-label="recipe" src={props.preview + props.item.user_id.img_url_preview}>

          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.item.user_id.name}
        subheader={props.item.date_created}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.preview + props.item.img_url_preview}
        alt="Paella dish"

      />

      <CardActions disableSpacing>
        <IconButton onClick={onLike} aria-label="add to favorites">
          {

            like ?
              <FavoriteIcon style={{ color: "red" }} />
              :

              <FavoriteIcon />

          }

        </IconButton>
{
  likesCount==0?
  <></>
  :
  <>{likesCount}</>
}
        
      </CardActions>
      <p>{props.item.name}</p>
    </Card>

  )
}

export default PlantItem