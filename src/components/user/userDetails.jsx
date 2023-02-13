import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Paper, Container, Box, Grid, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL, doApiGet } from '../../services/apiService';


const UserDetails = () => {
    const { state } = useLocation();
    const [open, setOpen] = React.useState(false);
    const date = state.date_created.slice(8, 10) + "/" + state.date_created.slice(5, 7) + "/" + state.date_created.slice(0, 4);

    const navigation = useSelector((myStore) =>
        myStore.navigationSlice)


    useEffect(() => {
        console.log(state.img_url_preview)


    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Container >

            <Paper sx={{ padding: "80px", marginTop: "30px" }}>


                <Grid sx={{ display: "flex", justifyContent: "center" }}>

                    <Grid sx={{ display: "flex",justifyContent:"center", flexDirection: "column" }}>
                    <b>name:</b>
                        <p>{state.name}</p>
                        <b>email:</b>
                        <p>{state.email}</p>
                        <b>here since:</b>
                        <p>{date}</p>




                    </Grid>


                    

                        <Grid onClick={handleClickOpen} sx={{ cursor: "pointer", backgroundImage: `url(${navigation.navigation.previewAvatar + state.img_url_preview})`, height: "200px", width: "200px", marginLeft: "40px", marginTop: "10px", backgroundSize: "cover", borderRadius: "300px", border: "10px solid rgb(239, 239, 239)",display:"flex",justifyContent:"center", backgroundPosition: "center" }}></Grid>


                    
                </Grid>
                <Box textAlign='center'>
                    <Button style={{ background: "#57b846", color: "white", marginTop: "20px" }}>show {state.name}'s posts</Button>
                </Box>

            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >

                <DialogContent
                    sx={{ width: "500px", height: "500px", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center", backgroundImage: `url(${navigation.navigation.originalAvatar + state.img_url})` }}
                >

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default UserDetails