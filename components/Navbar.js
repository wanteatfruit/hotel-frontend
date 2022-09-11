import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HotelIcon from "@mui/icons-material/Hotel";
import CloseIcon from "@mui/icons-material/Close";
import { List,Box, Button, Drawer, IconButton, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FaceIcon from "@mui/icons-material/Face"; //temporary icon for logged in user
//传入是否已登录，决定用户处显示内容
export default function NavBar({isLoggedIn}) {
  const pages = [
    { name: "City", link: "/city" },
    { name: "Hotel", link: "/hotel" },
    { name: "Rooms", link: "/rooms" },
  ]; // 跳转到的界面名称
const settings = ["Profile", "Account", "Dashboard", "Logout"]; // 点用户图标后出来的选项

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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

  const handleDrawerToggle = () =>{
    setDrawerOpen(!drawerOpen);
  }

  return (
    <AppBar position="relative">
      {/* <Container maxWidth="xl"> */}
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/*设置小屏菜单显示*/}

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={handleDrawerToggle} color="inherit">
            <MenuIcon />
          </IconButton>
          <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
            <List>
              <ListItem sx={{width:"fit-content"}}>
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
        </Box>
        {/* 小屏只显示logo，在屏幕中心*/}
        <HotelIcon
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
          }}
        />
        {/*大屏显示完整跳转名称*/}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          

          <HotelIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2, mt:1 }} />
          {/* 大屏显示酒店logo和名称*/}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            gutterBottom
            sx={{ display: { xs: "none", md: "flex" },mt:1,mr:1 }}
          >
            一家连锁酒店
          </Typography>
          {pages.map((item) => (
            <Button color="inherit" size="large">{item.name}</Button>
          ))}
        </Box>
        {/*用户图标大小屏都在最右边*/}
        <Box>
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
            {settings.map((item) => (
              <MenuItem key={item} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{item}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
