
import * as React from 'react';
import { doApiGet, TOKEN_NAME, API_URL } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom'
import { GiCottonFlower } from 'react-icons/gi';
import { Button } from '@mui/material';
import ConfirmButton from '../general/confirmButton';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../reducer/userInfoSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';



const HeaderAdmin = () => {
  //mui
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const address = window.location.pathname

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //end of mui

  const nav = useNavigate();
  const dispatch = useDispatch();
  const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)

  React.useEffect(() => {

    doApi();
    console.log("this is the admin header")

  }, [])

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      // console.clear();
      let resp = await doApiGet(url);
      console.log(resp.data);
      dispatch(updateUserInfo({
        update: resp.data

      }))

    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
      nav("/")
    }

  }

  const onClick = () => {
    localStorage.removeItem(TOKEN_NAME);
    nav("/");

  }
  const onClickLogo = () => {
    nav("/admin/plantsList");
  }
  console.log(myUserInfo)

  return (
    <div>
      <AppBar sx={{ background: "rgb(170, 249, 255)" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <GiCottonFlower style={{ color: "#57b846", fontSize: "40px" }} />

            </Box>

            <Typography
              variant="h6"
              noWrap
              component={'span'}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,

                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link to="/admin">
                <h1 style={{ color: "#57b846" }}><span style={{ color: "black" }}>EZ</span>plant</h1>
              </Link>
            </Typography>



            <Box sx={{ color: "#57b846", flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <Box>
                  <Link to="/admin/plantsList">
                    <MenuItem onClick={handleCloseNavMenu} sx={{background:address=="/admin/plantsList"? '#57b84680':''}}>
                      <Typography textAlign="center">Plants</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/admin">
                    <MenuItem onClick={handleCloseNavMenu} sx={{background:address=="/admin"? '#57b84680':''}}>
                      <Typography textAlign="center">Users</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/admin/myInfo">
                    <MenuItem onClick={handleCloseNavMenu} sx={{background:address=="/admin/myInfo"? '#57b84680':''}}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/admin/map">
                    <MenuItem onClick={handleCloseNavMenu} sx={{background:address=="/admin/map"? '#57b84680':''}}>
                      <Typography textAlign="center">Map</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/admin/newPlant">
                    <MenuItem onClick={handleCloseNavMenu} sx={{background:address=="/admin/newPlant"? '#57b84680':''}}>
                      <Typography textAlign="center">Add-plant</Typography>
                    </MenuItem>
                  </Link>
                </Box>

              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <GiCottonFlower style={{ color: "#57b846", fontSize: "40px" }} />

            </Box>

            <Typography
              variant="h5"
              noWrap
              component={'span'}

              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link to="/admin">
                <h1 style={{ color: "#57b846" }}><span style={{ color: "black" }}>EZ</span>plant</h1>
              </Link>

            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to="/admin/plantsList">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2,color:"black",borderRadius:"10px", background: address=="/admin/plantsList"? '#57b84680':'', display: 'block' }}
                >
                  Plants
                </Button>
              </Link>
              <Link to="/admin">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block',borderRadius:"10px", background: address=="/admin"? '#57b84680':'' }}
                >
                  Users
                </Button>
              </Link>
              <Link to="/admin/myInfo">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block',borderRadius:"10px", background: address=="/admin/myInfo"? '#57b84680':'' }}
                >
                  Profile
                </Button>
              </Link>
              <Link to="/admin/map">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block',borderRadius:"10px", background: address=="/admin/map"? '#57b84680':'' }}
                >
                  Map
                </Button>
              </Link>
              <Link to="/admin/newPlant">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block',borderRadius:"10px", background: address=="/admin/newPlant"? '#57b84680':'' }}
                >
                  Add-plant
                </Button>
              </Link>

            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar style={{ border: "2px solid white" }} src={myUserInfo?.user?.img_url_preview} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box>
                  <Box style={{ paddingRight: "10px", paddingLeft: "10px", color: "grey" }}>
                    <Typography textAlign="start">{myUserInfo?.user?.name}</Typography>
                    <Typography textAlign="start">{myUserInfo?.user?.email}</Typography>
                  </Box>
                  <hr></hr>

                  <Link to="/admin/myInfo">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                  <Box style={{ padding: "10px" }}>
                    <ConfirmButton
                      btnText="Log-out"
                      boxText="Are you sure you want to log-out?"
                      agree={onClick}
                      style={{ background: "#57b846", width: "130px", height: "40px", color: "white" }}
                    />
                  </Box>
                </Box>

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

    </div>
  )


}

export default HeaderAdmin