import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../styles/Main.module.css";
import Container from "@mui/material/Container";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { hotelImageUrl } from "../data";
import { cities } from "../data";
import Ticket, {
    TicketCQ,
    TicketGZ,
    TicketSH,
    TicketSZ,
} from "../components/CityTicket";
import SendIcon from "@mui/icons-material/Send";
import HotelCard from "../components/HotelCard";
import { motion } from "framer-motion";
import Image from "next/future/image";
import { Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LocationCityOutlined } from "@mui/icons-material";

const theme = createTheme();

// 获取酒店和房间列表，传给navbar

export async function getStaticProps() {

    const hotel_response = await axios.get('http://120.25.216.186:8888/hotel/getAll');
    const hotel_list = hotel_response.data
    const room_respose = await axios.get('http://120.25.216.186:8888/roomtype/getAll');
    const room_list = room_respose.data
    return {
        props: {
            hotel_list, room_list
        },
        revalidate: 10
    }


}


export default function Home({ hotel_list, room_list }) {
    const router = useRouter()
    let _sessionKey = router.query['sessionKey'];
    let _username = router.query['username'];
    let _isLoggedIn = router.query['isLoggedIn'];
    let _id = router.query['id'];
    // don't use the three above, the three below instead
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [sessionKey, setSessionKey] = useState('')
    const [id, setID] = useState(-1)
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [chatDialogOpen, setChatDialogOpen] = useState(false)
    const jumpToCity = [
        { name: '深圳', href: "#shenzhen" },
        { name: '广州', href: "#guangzhou" },
        { name: '上海', href: "#shanghai" },
        { name: '重庆', href: "#chongqing" },

    ]
    const cardVariants = { //for hotel card anim
        offscreen: {
            y: 300
        },
        onscreen: {
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.2,
                duration: 0.8
            }
        }
    };
    const theme = createTheme({
        typography: {
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 15
        },
        palette: {
            secondary: {
                main: '#fff'
            }
        }
    })

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
                            setIsLoggedIn(false)
                            setUsername("")
                            setSessionKey("")
                            setID(-1)
                            setIsLogoutDialogOpen(false);
                        }}>Log out</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    useEffect(() => {
        setIsLoggedIn(_isLoggedIn)
        setUsername(_username)
        setSessionKey(_sessionKey)
        setID(_id)
    }, [_isLoggedIn, _username, _sessionKey, _id])


    return (
        <ThemeProvider theme={theme}>
            <SpeedDial ariaLabel="chooseCity" sx={{ position: 'fixed', bottom: 16, right: 16 }} icon={<LocationCityOutlined />}>
                {jumpToCity.map((action) => (
                    <SpeedDialAction tooltipOpen icon={<SpeedDialIcon />} key={action.name} tooltipTitle={action.name} title={action.name} onClick={() => {
                        router.push(`/${action.href}`)
                    }} />
                ))}
            </SpeedDial>
            <CssBaseline />
            <div>

                <NavBar id={id} hotel_list={hotel_list} room_list={room_list} isLoggedIn={isLoggedIn}
                    openLoggedOutDialog={() => setIsLogoutDialogOpen(true)} buttonsMode={0} openChatDialog={() => {
                        setChatDialogOpen(true)
                    }} />
            </div>
            <div>
                {ChatDialog()}
                {LogoutDialog()}
            </div>
            <main>
                <Link
                    href={{
                        pathname: "/admin/dashboard",
                    }}
                >
                    temporary admin
                </Link>
                {/* Hero unit */}
                <div className={styles.picOne}
                    // sx={{
                    //     height: '100vh',
                    //     display: 'flex',
                    //     justifyContent: 'center',
                    //     backgroundSize: 'cover',
                    //     backgroundImage: 'url("https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
                    // }}
                >
                    <Box sx={{ display: { xs: 'block', sm: 'block' } }}>
                        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{
                            duration: 2,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                            <p className={styles.title}>
                                盛夏酒店
                            </p>
                        </motion.div>
                    </Box>
                    <svg className={styles.arrows}>
                        <path className={styles.a1} d="M0 0 L30 32 L60 0"></path>
                        <path className={styles.a2} d="M0 20 L30 52 L60 20"></path>
                        <path className={styles.a3} d="M0 40 L30 72 L60 40"></path>
                    </svg>
                </div>
                <Stack>

                    <Paper sx={{ backgroundColor: 'antiquewhite' }} elevation={0}>
                        <Stack paddingTop={14} paddingBottom={4} justifyContent='space-evenly' direction={{ xs: 'column', sm: 'row' }} id="guangzhou">
                            <motion.div viewport={{ once: true }} style={{ display: 'flex' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                                <p className={styles.city}>
                                    广州
                                </p>
                            </motion.div>
                            <motion.div viewport={{ once: true }} initial='offscreen' whileInView='onscreen' variants={cardVariants}>
                                <Stack paddingX={0} gap={10} direction={{ xs: 'column', sm: 'row' }}>
                                    {hotel_list.map((item, index) => (item.cityname == "广州" &&
                                        <HotelCard hotelName={item.hotelname} key={item.hotelid} imageSrc={hotelImageUrl[index]} />
                                    ))}
                                </Stack>
                            </motion.div>
                        </Stack>
                        <Stack paddingY={4} justifyContent='space-evenly' direction={{ xs: 'column', sm: 'row' }} id="shanghai">
                            <motion.div viewport={{ once: true }} style={{ display: 'flex' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                                <p className={styles.city}>
                                    上海
                                </p>
                                {/* <Typography textAlign='end'  sx={{paddingBottom:{sm:0, xs:5}, writingMode: {sm:'vertical-lr',xs:'horizontal-tb'} }} variant="h1">上海</Typography> */}
                            </motion.div>
                            <motion.div viewport={{ once: true }} initial='offscreen' whileInView='onscreen' variants={cardVariants}>
                                <Stack paddingX={0} gap={10} direction={{ xs: 'column', sm: 'row' }}>
                                    {hotel_list.map((item, index) => (item.cityname == "上海" &&
                                        <HotelCard hotelName={item.hotelname} key={item.hotelid} imageSrc={hotelImageUrl[index]} />
                                    ))}
                                </Stack>
                            </motion.div>
                        </Stack>
                        <Stack paddingY={4} justifyContent='space-evenly' direction={{ xs: 'column', sm: 'row' }} id="chongqing">
                            <motion.div viewport={{ once: true }} style={{ display: 'flex' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                                <p className={styles.city}>
                                    重庆
                                </p>
                            </motion.div>
                            <motion.div viewport={{ once: true }} initial='offscreen' whileInView='onscreen' variants={cardVariants}>

                                <Stack paddingX={0} gap={10} direction={{ xs: 'column', sm: 'row' }}>

                                    {hotel_list.map((item, index) => (item.cityname == "重庆" &&
                                        <HotelCard hotelName={item.hotelname} key={item.hotelid} imageSrc={hotelImageUrl[index]} />
                                    ))}
                                </Stack>
                            </motion.div>
                        </Stack>
                    </Paper>

                </Stack>
                <div >
                    {/*城市卡片*/}
                    <Grid sx={{ display: { sm: 'flex', xs: 'none' } }} container spacing={20} columnGap={2} padding={2} columns={12} justifyContent='center'>
                        <Grid item justifyContent='center'>
                            <TicketSZ />
                        </Grid>
                        <Grid item >
                            <TicketGZ />
                        </Grid>
                        <Grid item>
                            <TicketCQ />
                        </Grid>
                        <Grid item >
                            <TicketSH />
                        </Grid>
                    </Grid>
                </div>
                <Grid container sx={{
                    marginTop: 10,
                    marginBottom: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}>
                    <iframe src={"map.html"} height="500" width="600" frameBorder="0"></iframe>
                </Grid>
            </main>

            <Footer />
        </ThemeProvider>
    );
}
