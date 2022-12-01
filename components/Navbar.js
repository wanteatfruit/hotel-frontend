import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LoginIcon from '@mui/icons-material/Login';
import HotelIcon from "@mui/icons-material/Hotel";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
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
    useTheme,
    createTheme, Paper

} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FaceIcon from "@mui/icons-material/Face"; //temporary icon for logged in user
import {login, pages, roomImageUrl, settings} from "../data";
import {Stack, width} from "@mui/system";
import BookingDrawer from "./BookingDrawer";
import {
    AlarmOnOutlined,
    ChevronLeftOutlined,
    HotelOutlined,
    ImportContacts,
    PlaceOutlined,
    SportsBarOutlined,
    StormOutlined
} from "@mui/icons-material";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import PlaceOrder from "./PlaceOrderDrawer";
import RoomCard from "./RoomCard";
//传入是否已登录，决定用户处显示内容
export default function NavBar({
                                   hotel_list,
                                   room_list,
                                   buttonsMode,
                                   href,
                                   refreshUserInfo
                               }) {
    const router = useRouter()
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [bookingOpen, setBookingOpen] = React.useState(null);

    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [chatDialogOpen, setChatDialogOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState("false")
    const [adminLoggedIn, setAdminLoggedIn] = useState("false")
    const [saleDialogOpen, setSaleDialogOpen] = useState(false)
    const [displaySales, setDisplaySalesOpen] = useState(true);
    const [eventInfo, setEventInfo] = useState(null);

    const [saleRoomInfo, setSaleRoomInfo] = useState({ roomtypeid: 1 });

    const [orderOpen, setOrderOpen] = useState(false) //change it to other pages later


    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn"))
        setAdminLoggedIn(localStorage.getItem("adminLoggedIn"))
        axios.get('http://120.25.216.186:8888/event/haveEvent').then((resp) => {
            setEventInfo(resp.data)
        })

        //check for sale
        // axios.get('http://120.25.216.186:8888/event/haveEvent').then((resp)=>{
        //     if(resp.data.)
        // })
    }, [])
    useEffect(() => {
        if (eventInfo !== null) {
            axios.get(`http://120.25.216.186:8888/roomtype?id=${eventInfo.roomtypeid}`).then((resp) => {
                setSaleRoomInfo(resp.data)
            })
        }
    }, [eventInfo])
    const [mapOpen, setMapOpen] = React.useState(false);

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
            query: {href: href},
        })
    }
    ``

    function ChatDialog() {
        return (
            <>
                <Dialog
                    open={chatDialogOpen}
                    onClose={() => {
                        setChatDialogOpen(false)
                    }}
                    maxWidth='lg'
                    // PaperProps={{
                    //     sx: {
                    //         position: "fixed",
                    //         width: "100%",
                    //         height: "100%",
                    //         maxWidth: "md",
                    //         backgroundColor: "transparent"
                    //     }
                    // }}
                    // fullWidth
                >
                    <Paper width={"100%"} elevation={6} square>
                        <DialogContent>
                            <iframe src={"/chat-app.html"} frameBorder="0"></iframe>
                        </DialogContent>
                    </Paper>
                </Dialog>
            </>
        )
    }

    function clearLogInfo() {
        localStorage.setItem("username", "")
        localStorage.setItem("userID", "0")
        localStorage.setItem("sessionKey", "")
        localStorage.setItem("isLoggedIn", "false")
        localStorage.setItem("adminLoggedIn", "false")
        setIsLoggedIn("false")
        setAdminLoggedIn("false")
        if (refreshUserInfo) {
            refreshUserInfo()
        }
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
                            确认登出你的账号？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsLogoutDialogOpen(false)}>取消</Button>
                        <Button onClick={() => {
                            clearLogInfo()
                            setIsLogoutDialogOpen(false);
                        }}>登出</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    function getButtons() {
        if (adminLoggedIn === "true") {
            return (
                <>
                    <Tooltip title={"登出"}>
                        <IconButton onClick={() => {
                            setIsLogoutDialogOpen(true)
                        }} color="inherit">
                            <LogoutIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="管理中心">
                        <IconButton onClick={() => {
                            router.push({
                                pathname: "/admin/dashboard"
                            })
                        }} color="inherit">
                            <SupervisorAccountIcon/>
                        </IconButton>
                    </Tooltip>
                </>
            )
        } else if (buttonsMode === 1) {
            return (
                <>
                    <Tooltip title="聊天室">
                        <IconButton onClick={() => {
                            setChatDialogOpen(true)
                        }} color="inherit">
                            <ChatIcon/>
                        </IconButton>
                    </Tooltip>
                </>
            )
        } else {
            if (isLoggedIn === "false") {
                return (
                    <>
                        <Tooltip title={"登录"}>
                            <IconButton onClick={handleLogin} color="inherit">
                                <LoginIcon/>
                            </IconButton>
                        </Tooltip>
                    </>
                )
            } else {
                return (
                    <>
                        <Tooltip title={"登出"}>
                            <IconButton onClick={() => {
                                setIsLogoutDialogOpen(true)
                            }} color="inherit">
                                <LogoutIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="用户中心">
                            <IconButton onClick={() => {
                                let path = "/account-center/account-center"
                                router.push({
                                    pathname: path
                                }, path)
                            }} color="inherit">
                                <FaceIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="聊天室">
                            <IconButton onClick={() => {
                                setChatDialogOpen(true)
                            }} color="inherit">
                                <ChatIcon/>
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



            <Dialog keepMounted onClose={() => setMapOpen(false)} fullScreen={fullScreenMap} open={mapOpen} fullWidth
                    maxWidth='lg' sx={{zIndex: 1000}}>
                <DialogTitle>
                    实时地图
                    <IconButton onClick={() => setMapOpen(false)}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{flexDirection: {md: 'row', xs: 'column'}, display: 'flex'}}>
                    <iframe src={"/map.html"} id="city_map" height="500" width="600" frameBorder="0"
                            style={{borderRadius: 10}}></iframe>
                    <Stack sx={{display: {xs: 'none', md: 'flex'}, marginLeft: 2}} gap={2}>
                        <TicketSZ onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(114.04, 22.57)
                        }}/>
                        <TicketGZ onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(113.23, 23.16)
                        }}/>
                        <TicketCQ onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(106.54, 29.59);
                            console.log("clicked change city position")
                        }}/>
                        <TicketSH onClick={() => {
                            document.getElementById('city_map').contentWindow.setNewCenter(121.4, 31.2)
                        }}/>

                    </Stack>
                    <Stack direction='row'
                           sx={{display: {xs: 'flex', md: 'none'}, marginTop: 2, justifyContent: 'center'}} gap={2}>
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
                    <ChevronLeftOutlined fontSize="large"/>
                </IconButton>
            </BookingDrawer>
            <AppBar
                position="fixed"
                color="transparent"
                variant='outlined'
                sx={{zIndex: 1000, backgroundColor: '#fff',}}
            >
                {/* <Container maxWidth="xl"> */}
                <Toolbar sx={{justifyContent: "space-between"}}>
                    {/*设置小屏菜单显示*/}
                    <Box sx={{display: {xs: "flex", md: "none"}, alignItems: "center"}}>
                        <IconButton onClick={handleDrawerToggle} color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
                            <List>
                                <ListItem sx={{width: "fit-content"}}>
                                    <ListItemButton onClick={handleDrawerToggle}>
                                        <CloseIcon/>
                                    </ListItemButton>
                                </ListItem>
                                {pages.map((item) => (
                                    <ListItem
                                        key={item.name}
                                        disablePadding
                                        sx={{width: "100vw"}}
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
                    <Box sx={{display: {xs: "none", md: "flex"},}}>
                        <Button variant="outlined" color='secondary' disableElevation sx={{
                            fontFamily: 'Roboto', '&:hover': {
                                backgroundColor: 'var(--color-5)',
                                borderColor: 'var(--color-5)',
                                boxShadow: 'none',
                            }, backgroundColor: 'var(--color-4)', borderRadius: 10, mr: 1
                        }} href="/" size="large"
                                startIcon={<SportsBarOutlined fontSize="24px"/>}>
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


                    <Stack direction='row' gap={1}>
                        {adminLoggedIn!=true && <>
                            <Tooltip title='秒杀活动'>
                            <IconButton color='secondary'

                                size='large' sx={{
                                    backgroundColor: 'var(--color-4)', '&:hover': {
                                        backgroundColor: 'var(--color-5)',
                                        borderColor: 'var(--color-5)',
                                        boxShadow: 'none',
                                    }
                                }} onClick={() => setSaleDialogOpen(true)}>
                                <AlarmOnOutlined fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='酒店位置'>
                            <IconButton color="inherit"
                                        size="large" onClick={() => setMapOpen(true)}>
                                <PlaceOutlined/>
                            </IconButton>
                        </Tooltip></>}

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
                        {/* 
                        {buttonsMode === 0 && adminLoggedIn === "false" &&
                            <Button sx={{
                                px: 3,
                                py: 0,
                                fontSize: '1rem',
                                backgroundImage: 'linear-gradient(90deg, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100% )'
                            }} variant="contained" onClick={() => {
                                setBookingOpen(!bookingOpen)
                            }}>预定</Button>
                        } */}
                    </Stack>
                </Toolbar>
            </AppBar>
            {LogoutDialog()}
            {ChatDialog()}
            <Dialog sx={{ borderRadius: 5,zIndex:1001 }} fullScreen={fullScreenMap} open={saleDialogOpen} maxWidth='lg' onClose={() => setSaleDialogOpen(false)}>
                <DialogTitle>
                    {eventInfo !== null &&
                        <Link style={{ textDecoration: 'underline' }} href={`/hotels/${eventInfo.hotelname}`}>
                            {eventInfo.hotelname}
                        </Link>
                    }
                    的一个房型正在秒杀！
                    <IconButton onClick={() => setSaleDialogOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography></Typography>
                    <RoomCard hotelName={eventInfo === null ? '' : eventInfo.hotelname} admin={false} roomInfo={saleRoomInfo} imageUrl={roomImageUrl[saleRoomInfo.roomtypeid % roomImageUrl.length]} />
                    <Divider sx={{ mt: 2 }} />
                    <Typography>截至{eventInfo === null ? '' : eventInfo.endtime}</Typography>
                </DialogContent>
            </Dialog>

        </>


    );
}
