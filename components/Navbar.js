import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LoginIcon from '@mui/icons-material/Login';
import HotelIcon from "@mui/icons-material/Hotel";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import Ticket, {
    TicketCQ,
    TicketGZ,
    TicketSH,
    TicketSZ,
} from "../components/CityTicket";

import {
    Backdrop,
    List,
    Box,
    Button,
    Drawer,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    Divider,
    Autocomplete,
    TextField,
    DialogContentText,
    Tabs,
    Dialog,
    useMediaQuery,
    DialogActions,
    DialogTitle,
    DialogContent,
    Slide,
    ThemeProvider,
    useTheme

} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FaceIcon from "@mui/icons-material/Face"; //temporary icon for logged in user
import { login, pages, settings } from "../data";
import { Stack, width } from "@mui/system";
import BookingDrawer from "./BookingDrawer";
import { ChevronLeftOutlined, HotelOutlined } from "@mui/icons-material";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useState} from "react";

//传入是否已登录，决定用户处显示内容
export default function NavBar({
                                   userID,
                                   isLoggedIn,
                                   hotel_list,
                                   room_list,
                                   buttonsMode,
                                   clearLogInfo
                               }) {

    const router = useRouter()
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [bookingOpen, setBookingOpen] = React.useState(null);

    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [chatDialogOpen, setChatDialogOpen] = useState(false)
const [mapOpen, setMapOpen] = React.useState(false);
    useEffect(() => {
        console.log("check login status: ", isLoggedIn, "; id: ", userID, "; session: ")
    })
    

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
    const handleLogin = () => {
        router.push({
            pathname: "/sign-in",
            query: { href: "/" },
        })
    }

    function ChatDialog() {
        return (
            <>
                <Dialog
                    open={chatDialogOpen}
                    onClose={() => {
                        setChatDialogOpen(false)
                    }}
                    PaperProps={{
                        sx: {
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            maxWidth: "md",
                            backgroundColor: "#f1cec2"
                        }
                    }}
                >
                    <DialogContent>
                        <iframe src={"/chat-app.html"} height="95%" width="100%" frameBorder="0"></iframe>
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    function LogoutDialog() {
        return (
            <>
                <Dialog
                    open={isLogoutDialogOpen}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setIsLogoutDialogOpen(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    {/*<DialogTitle>{"Use Google's location service?"}</DialogTitle>*/}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            You are logging out of your account...
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsLogoutDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => {
                            clearLogInfo()
                            setIsLogoutDialogOpen(false);
                        }}>Log out</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    function getButtons() {
        if (buttonsMode === 1) {
            return (
                <>
                    <Tooltip title="Chat Room">
                        <IconButton onClick={() => {
                            setChatDialogOpen(true)
                        }} color="inherit">
                            <ChatIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )
        } else {
            if (!isLoggedIn) {
                return (
                    <>
                        <Tooltip title={"Login"}>
                            <IconButton onClick={handleLogin} color="inherit">
                                <LoginIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            } else {
                return (
                    <>
                        <Tooltip title={"Log out"}>

                            <IconButton onClick={() => {
                                setIsLogoutDialogOpen(true)
                            }} color="inherit">
                                <LogoutIcon/>

                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Account center">
                            <IconButton onClick={() => {
                                let path = "/account-center/account-center"
                                router.push({
                                    pathname: path,

                                    query: {"userID": userID},

                                }, path)
                            }} color="inherit">
                                <FaceIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Chat Room">
                            <IconButton onClick={() => {
                                setChatDialogOpen(true)
                            }} color="inherit">
                                <ChatIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    }


    const theme = useTheme()
    const fullScreenMap = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Dialog keepMounted onClose={() => setMapOpen(false)} fullScreen={fullScreenMap} open={mapOpen} fullWidth maxWidth='lg' sx={{ zIndex: 1000 }}>
                <DialogTitle>
                    实时地图
                    <IconButton onClick={() => setMapOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ flexDirection: { md: 'row', xs: 'column' }, display: 'flex' }}>
                    <iframe src={"map.html"} id="city_map" height="500" width="600" frameBorder="0" style={{ borderRadius: 10 }}></iframe>
                    <Stack sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 2 }} gap={2}>
                        <TicketSZ onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(114.04, 22.57)
                        }} />
                        <TicketGZ onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(113.23, 23.16)
                        }} />
                        <TicketCQ onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(106.54, 29.59);
                            console.log("clicked change city position")
                        }} />
                        <TicketSH onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(121.4, 31.2)
                        }} />

                    </Stack>
                    <Stack  direction='row' sx={{ display: { xs: 'flex', md: 'none' }, marginTop: 2, justifyContent:'center' }} gap={2}>
                        <Button onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(114.04, 22.57)
                        }} variant="outlined" fullWidth>深圳</Button>
                        <Button onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(113.23, 23.16)
                        }} variant="outlined" fullWidth>广州</Button>
                        <Button onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(106.54, 29.59)
                        }} variant="outlined" fullWidth>重庆</Button>
                        <Button onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(121.4, 31.2)
                        }} variant="outlined" fullWidth>上海</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            <BookingDrawer open={bookingOpen} hotel_list={hotel_list} room_list={room_list}>
                <IconButton onClick={() => setBookingOpen(false)} color="secondary">
                    <ChevronLeftOutlined fontSize="large" />
                </IconButton>
            </BookingDrawer>
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
                                        <ListItemButton href={item.link}>
                                            <ListItemText primary={item.name}></ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}

                            </List>
                        </Drawer>
                        <Typography>
                            盛夏小酒
                        </Typography>
                    </Box>
                    {/* 小屏只显示logo，在屏幕中心*/}

                    {/*大屏显示完整跳转名称*/}
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Button sx={{ paddingRight: 2, marginRight: 2 }} href="/" fullWidth size="large"
                            variant="outlined" color="secondary" startIcon={<HotelOutlined fontSize="24px" />}>
                            盛夏小酒
                        </Button>
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
                        <Button color="inherit"
                            size="large" onClick={() => setMapOpen(true)}>
                            测试地图
                        </Button>

                        {/*avatar，后续可改成avatar组件*/}
                        {getButtons()}
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

                        {buttonsMode === 0 &&
                            <Divider
                                orientation="vertical"
                                color="success"
                                flexItem
                                sx={{ mx: 2 }}
                            /> &&
                            <Button color="error" variant="contained" onClick={() => {
                                setBookingOpen(!bookingOpen)
                            }}>预定</Button>
                        }
                        {/* <Button color="error" variant="contained" href="/book" >预定</Button> */}
                    </Box>
                </Toolbar>
            </AppBar>
            {LogoutDialog()}
            {ChatDialog()}
        </>


    );
}
