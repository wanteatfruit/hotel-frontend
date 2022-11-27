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
import {hotelImageUrl} from "../data";
import Ticket, {
    TicketCQ,
    TicketGZ,
    TicketSH,
    TicketSZ,
} from "../components/CityTicket";

import HotelCard from "../components/HotelCard";
import {motion} from "framer-motion";
import Image from "next/future/image";
import {Paper, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
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


export default function Home({hotel_list, room_list}) {
    const router = useRouter()
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

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn"))
        setUsername(localStorage.getItem("username"))
        setSessionKey(localStorage.getItem("sessionKey"))
        setID(localStorage.getItem("userID"))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            {/* <SpeedDial ariaLabel="chooseCity" sx={{ position: 'fixed', bottom: 16, right: 16 }} icon={<LocationCityOutlined />}>

                {jumpToCity.map((action) => (
                    <SpeedDialAction tooltipOpen icon={<SpeedDialIcon/>} key={action.name} tooltipTitle={action.name}
                                     title={action.name} onClick={() => {
                        router.push(`/${action.href}`)
                    }}/>
                ))}

            </SpeedDial> */}
            <CssBaseline/>
            <div>
                <NavBar hotel_list={hotel_list} room_list={room_list} href={"/"}
                        buttonsMode={0}/>
            </div>
            <main>
                <div className={styles.picOne}>
                    <Box sx={{display: {xs: 'block', sm: 'block'}}}>
                        <motion.div initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0}} transition={{
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
                        <Stack paddingTop={14} paddingBottom={10} justifyContent='space-evenly'
                            direction={{ xs: 'column', sm: 'row' }} id="guangzhou">
                            <motion.div viewport={{ once: true }} style={{ display: 'flex' }} initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
                                <p className={styles.city}>
                                    广州
                                </p>
                            </motion.div>
                            <motion.div viewport={{ once: true }} initial='offscreen' whileInView='onscreen'
                                variants={cardVariants}>
                                <Stack paddingX={0} gap={10} direction={{ xs: 'column', sm: 'row' }}>
                                    {hotel_list.map((item, index) => (item.cityname == "广州" &&
                                        <HotelCard hotelName={item.hotelname} key={item.hotelid}
                                            imageSrc={hotelImageUrl[index]} />
                                    ))}
                                </Stack>
                            </motion.div>
                        </Stack>
                        <Stack paddingY={4} paddingBottom={10} justifyContent='space-evenly' direction={{ xs: 'column', sm: 'row' }}
                            id="shanghai">
                            <motion.div viewport={{ once: true }} style={{ display: 'flex' }} initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
                                <p className={styles.city}>
                                    上海
                                </p>
                                {/* <Typography textAlign='end'  sx={{paddingBottom:{sm:0, xs:5}, writingMode: {sm:'vertical-lr',xs:'horizontal-tb'} }} variant="h1">上海</Typography> */}
                            </motion.div>
                            <motion.div viewport={{ once: true }} initial='offscreen' whileInView='onscreen'
                                variants={cardVariants}>
                                <Stack paddingX={0} gap={10} direction={{ xs: 'column', sm: 'row' }}>
                                    {hotel_list.map((item, index) => (item.cityname == "上海" &&
                                        <HotelCard hotelName={item.hotelname} key={item.hotelid}
                                            imageSrc={hotelImageUrl[index]} />
                                    ))}
                                </Stack>
                            </motion.div>
                        </Stack>
                        <Stack paddingY={4} justifyContent='space-evenly' direction={{ xs: 'column', sm: 'row' }}
                            id="chongqing">
                            <motion.div viewport={{ once: true }} style={{ display: 'flex' }} initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
                                <p className={styles.city}>
                                    重庆
                                </p>
                            </motion.div>
                            <motion.div viewport={{ once: true }} initial='offscreen' whileInView='onscreen'
                                variants={cardVariants}>

                                <Stack paddingX={0} gap={10} direction={{ xs: 'column', sm: 'row' }}>

                                    {hotel_list.map((item, index) => (item.cityname == "重庆" &&
                                        <HotelCard hotelName={item.hotelname} key={item.hotelid}
                                            imageSrc={hotelImageUrl[index]} />
                                    ))}
                                </Stack>
                            </motion.div>
                        </Stack>
                    </Paper>

                </Stack>
            </main>
            <Footer />
        </ThemeProvider>
    );
}
