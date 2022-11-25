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
import {createTheme, ThemeProvider} from "@mui/material/styles";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import {cities} from "../data";
import Ticket, {
    TicketCQ,
    TicketGZ,
    TicketSH,
    TicketSZ,
} from "../components/CityTicket";
import SendIcon from "@mui/icons-material/Send";
import {motion} from "framer-motion";
import Image from "next/future/image";
import {positions} from "@mui/system";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide} from "@mui/material";
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {isLeaf} from "@mui/x-data-grid";

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


export default function Home({hotel_list, room_list}) {
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

    useEffect(() => {
        setIsLoggedIn(_isLoggedIn)
        setUsername(_username)
        setSessionKey(_sessionKey)
        setID(_id)
    }, [_isLoggedIn, _username, _sessionKey, _id])

    function clearLogInfo() {
        setIsLoggedIn(false)
        setUsername("")
        setSessionKey("")
        setID(-1)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>

                <NavBar id={id} hotel_list={hotel_list} room_list={room_list} isLoggedIn={isLoggedIn}
                        buttonsMode={0} clearLogInfo={clearLogInfo}/>
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
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundSize: 'cover',
                        backgroundImage: 'url("https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
                    }}
                >
                    <Box sx={{display: {xs: 'block', sm: 'block'}}}>
                        <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{
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
                    {/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <p className={styles.grad}>
                                盛夏小酒
                            </p>
                        </Box> */}

                </Box>
                <div>
                    {/*城市卡片*/}
                    <Grid sx={{display: {sm: 'flex', xs: 'none'}}} container spacing={20} columnGap={2} padding={2}
                          columns={12} justifyContent='center'>
                        <Grid item justifyContent='center'>
                            <TicketSZ/>
                        </Grid>
                        <Grid item>
                            <TicketGZ/>
                        </Grid>
                        <Grid item>
                            <TicketCQ/>
                        </Grid>
                        <Grid item>
                            <TicketSH/>
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
            <Footer/>
        </ThemeProvider>
    );
}
