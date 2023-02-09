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
import { API_URL, TOKEN_NAME } from '../../services/apiService';
import { doApiMethod } from '../../services/apiService';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { useHistory } from 'react-router-dom';


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

const PlantItem = (props) => {

  const nav = useNavigate();
  const navigationServer = useSelector((myStore) =>
  myStore.navigationSlice)
  const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)
  let userId = myUserInfo.user._id;

  const [like, setLike] = useState(false)
  const [likesCount, setlikesCount] = useState(props.item.likes)
  const [expanded, setExpanded] = React.useState(false);
  const date = props.item.date_created.slice(8, 10) + "/" + props.item.date_created.slice(5, 7) + "/" + props.item.date_created.slice(0, 4);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    if (props.item.likesList.includes(userId)) {
      setLike(true)
    }

  }, [])

  const onLike = async () => {
    if (!localStorage[TOKEN_NAME]) {
      nav("/")
    }
    else {


      let url = API_URL + "/plants/editLike/" + props.item._id;
      let url2 = API_URL + "/plants/deleteLike/" + props.item._id;
      try {
        let resp = await doApiMethod(url, "PATCH")
        setlikesCount(resp.data.likes)
        if (like) {
          setLike(false)
        }
        else {
          setLike(true)
        }



        console.log(resp.data)
      }
      catch (err) {
        console.log(err.response);
        alert("There is a problem with editting LIKE");
      }


    }
  }


  const onClickItem = () => {
    // nav("/user/plantDetails")

      nav(
        '/user/plantDetails',{
        state: props.item
      });


  }


  return (

    <Card sx={{ width: { xs: "80%", md: "50%" }, margin: 2 }}>
      <CardHeader

        avatar={
          <Avatar aria-label="recipe" src={navigationServer.navigate.previewAvatar + props.item.user_id.img_url_preview}>

          </Avatar>
        }

        title={props.item.user_id.name}
        subheader={props.item.date_created}
      />
      <CardMedia
        onClick={onClickItem}
        style={{ cursor: "pointer" }}
        sx={{
          height: {
            xs: "300px",
            sm: "350px",
            md: "500px"
          }
        }}
        component="img"
        // height="500"
        image={navigationServer.navigate.previewPlant + props.item.img_url_preview}
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

export default PlantItem