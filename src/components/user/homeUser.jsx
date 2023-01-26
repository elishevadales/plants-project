import { Container } from '@mui/system'
import PlantItem from './plantItem'
import { useState, useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import styles from "./css/homeUser.module.css";
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';


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



const HomeUser = () => {
  
  const nav = useNavigate();

  const [ar, setAr] = useState([]);
  const [originalImage, setOriginalImage] = useState("");
  const [previeImage, setPrevieImage] = useState("");


  useEffect(() => {
    doApi();
    
  }, [])

  const doApi = async () => {
    let url = API_URL + "/plants";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data.data);
      setAr(resp.data.data);
      setOriginalImage(resp.data.original);
      setPrevieImage(resp.data.preview);
      
    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
      nav("/")
    }

  }

  const onPlusBtn = () => {
    nav("/user/newPlant")
  }

  const onClickItem = () => {
    nav("/user/plantDetails")

  }

  const onLike = () => {
    alert("hey")
  }

  return (
    <Container>
      <div>
        <label>search:</label>
        <input type={"text"}></input>
        <label>sort:</label>
        <select></select>
      </div>

      <div className={styles.allPlants}>
        {ar.map((item, i) => {
          return (
            <Card   key={item._id} sx={{ maxWidth: 345 ,margin:2}}>
              <CardHeader
              onClick={onClickItem}
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.name}
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                image={previeImage+ item.img_url_preview}
                alt="Paella dish"
                
              />

              <CardActions disableSpacing>
                <IconButton  onClick={onLike} aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                {/* {item.likes==0?
                <></>:
                <>{item.likes}</>
              } */}
                <>{item.likes}</>
              </CardActions>

            </Card>
            // <PlantItem key={item._id} doApi={doApi} index={i} item={item} original={originalImage} preview={previeImage}/>
          )
        })}
      </div>
      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>

      </div>


    </Container>

  )
}

export default HomeUser