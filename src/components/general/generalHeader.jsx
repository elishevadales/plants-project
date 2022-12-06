import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './css/generalHeader.module.css'
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { Container } from '@mui/material';
import { grey } from '@mui/material/colors';
import { GiCottonFlower } from 'react-icons/gi';


const GeneralHeader = () => {
    const location = useLocation();
    const color = grey[500]

    const nav = useNavigate();

    const onClick = () => {
        location.pathname == "/" ? nav("/signUp") : nav("/")
    }

    return (

        <div className={styles.header}>
            <div style={{ display: "flex",alignItems:"center"}}>
            <GiCottonFlower style={{ color: "#57b846", fontSize: "40px",marginRight:"10px"}}/>
                {/* <ParkTwoToneIcon style={{ color: "#57b846", fontSize: "40px",marginRight:"10px"}} /> */}
                <h1><span>EZ</span>plant</h1>
            </div>

            <Button className='log-btn' style={{ background: "#57b846", width: "130px", height: "40px" }} variant="contained" onClick={onClick}>
                {location.pathname == "/" ? "sign-up" : "login"}
            </Button>
        </div>
    )
}

export default GeneralHeader