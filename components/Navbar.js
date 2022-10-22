import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HotelIcon from "@mui/icons-material/Hotel";
import CloseIcon from "@mui/icons-material/Close";
import { List, Box, Button, Drawer, IconButton, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Tooltip, Divider, Autocomplete, TextField, Tabs } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FaceIcon from "@mui/icons-material/Face"; //temporary icon for logged in user
import { login, pages, settings } from "../data";
import Booking from "./BookingMenu";
import { Stack, width } from "@mui/system";
import BookingDrawer from "./BookingDrawer";
//传入是否已登录，决定用户处显示内容
export default function NavBar({ isLoggedIn }) {

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [bookingOpen, setBookingOpen] = React.useState(null);
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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <>
      <BookingDrawer  open={bookingOpen}/>
      <AppBar
        position="relative"
        sx={{ background: "#2E3B55", zIndex: 1 }}
      >
        {/* <Container maxWidth="xl"> */}
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/*设置小屏菜单显示*/}

          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton onClick={handleDrawerToggle} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
              <List>
                <ListItem sx={{ width: "fit-content" }}>
                  <ListItemButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                  </ListItemButton>
                </ListItem>
                {pages.map((item) => (
                  <ListItem
                    key={item.name}
                    disablePadding
                    sx={{ width: "100vw" }}
                  >
                    <ListItemButton onClick={handleDrawerToggle}>
                      <ListItemText primary={item.name}></ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <HotelIcon
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                ml: 1,
              }}
            />
          </Box>
          {/* 小屏只显示logo，在屏幕中心*/}

          {/*大屏显示完整跳转名称*/}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton color="inherit" href="/">
              <HotelIcon
                sx={{ display: { xs: "none", md: "flex" } }}
              />
            </IconButton>

            {/* 大屏显示酒店logo和名称*/}
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              gutterBottom
              sx={{ display: { xs: "none", md: "flex" }, mt: 1, mr: 1 }}
            >
              一家连锁酒店
            </Typography>
            {pages.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                size="large"
                href={item.link}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          {/*用户图标大小屏都在最右边*/}
          <Box sx={{ display: "flex" }}>
            {/*avatar，后续可改成avatar组件*/}
            <Tooltip title="Account center">
              <IconButton onClick={handleOpenUserMenu} color="inherit">
                {!isLoggedIn && <AccountCircleIcon />}
                {isLoggedIn && <FaceIcon />}
              </IconButton>
            </Tooltip>
            {/*drop down menu*/}
            <Menu
              keepMounted
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn &&
                settings.map((item) => (
                  <MenuItem key={item} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{item}</Typography>
                  </MenuItem>
                ))}
              {!isLoggedIn &&
                login.map((item) => (
                  <MenuItem key={item} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{item}</Typography>
                  </MenuItem>
                ))}
            </Menu>
            <Divider
              orientation="vertical"
              color="success"
              flexItem
              sx={{ mx: 2 }}
            />
            {/* <Button color="error" size="large" variant="contained">
            Book
          </Button> */}
            <Button color="error" variant="contained" onClick={() => { setBookingOpen(!bookingOpen) }}>预定</Button>
            {/* <Booking sx={{zIndex:2}} /> */}
          </Box>
        </Toolbar>
        {/* </Container> */}
      </AppBar>
    </>

  );
}
