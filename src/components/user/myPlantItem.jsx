import React from 'react'
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { API_URL } from '../../services/apiService';
import { doApiMethod } from '../../services/apiService';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MyPlantItem = (props) => {
  const nav = useNavigate();
  const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)
  let userId = myUserInfo.user._id;

  const [like, setLike] = useState(false)
  const [likesCount, setlikesCount] = useState(props.item.likes)

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  console.log(props.previewAvatar + "+" + props.item.user_id.img_url_preview)
  console.log(props.preview + "+" + props.item.img_url_preview)
  return (

    <Card sx={{ width: { xs: "80%", md: "40%" }, margin: 2 }}>
      <CardHeader
        onClick={onClickItem}
        avatar={
          <Avatar aria-label="recipe" src={props.previewAvatar + props.item.user_id.img_url_preview}>

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
        sx={{
          height: {
            xs: "300px",
            sm: "350px",
            md: "400px"
          }
        }}
        component="img"
        // height="500"
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
          likesCount == 0 ?
            <></>
            :
            <>{likesCount}</>
        }

      </CardActions>
      <CardActions disableSpacing>
        <b style={{ marginLeft: "10px" }}>{props.item.name}</b>
        {props.item.description ?
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          :
          <></>
        }

      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.item.description}</Typography>
        </CardContent>
      </Collapse>

    </Card>

  )
}

export default MyPlantItem