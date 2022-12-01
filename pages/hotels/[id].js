import {
    useMediaQuery,
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Typography,
    DialogTitle,
    Stack
} from "@mui/material"
import Image from "next/image";
import {useRouter} from "next/router"
import React, {useEffect, useState} from "react";
import BranchIntro from "../../components/BranchIntroduction";
import Layout from "../../components/Layout"
import RoomCard from "../../components/RoomCard";
import styles from "../../styles/HotelPage.module.css";
import axios from "axios";
import {roomImageUrl} from "../../data";
import CommentArea from "./comment-area";
import {CloseOutlined} from "@mui/icons-material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import NavBar from "../../components/Navbar";
import {motion} from "framer-motion";

// export async function getStaticPaths() { //确定酒店名字后写死
//     return {
//       paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//       fallback: false, // can also be true or 'blocking'
//     }
//   }


export default function HotelDetail() {
    const router = useRouter()
    const hotel_name = router.query.id
    const book_url = `book/${hotel_name}`
    //id为酒店名，动态路径
    const [roomList, setRoomList] = React.useState([]);
    const [hotelInfo, setHotelInfo] = React.useState({})
    const [openFloorPlan, setOpenFloorPlan] = React.useState(false);
    const [userID, setUserID] = useState(0)
    const [markedHotels, setMarkedHotels] = useState([])
    const [markedRooms, setMarkedRooms] = useState([])

    async function getMarked() {
        let roomsInfo = ""
        await axios.get("http://120.25.216.186:8888/roomtypewishlist", {params: {"userId": userID}}).then((response) => {
            roomsInfo = response.data
        });
        let newList = []
        for (const roomsInfoKey in roomsInfo) {
            newList.push(roomsInfo[roomsInfoKey].roomTypeID)
        }
        setMarkedRooms(newList)
        let hotelsInfo = ""
        await axios.get("http://120.25.216.186:8888/hotelwishlist", {params: {"userId": userID}}).then((response) => {
            hotelsInfo = response.data
        });
        newList = []
        for (const hotelsInfoKey in hotelsInfo) {
            newList.push(hotelsInfo[hotelsInfoKey].hotelID)
        }
        setMarkedHotels(newList)
    }

    useEffect(() => {
        setUserID(localStorage.getItem("userID"))
    })

    useEffect(() => {
        if (userID !== "0") {
            getMarked()
        }
    }, [userID])

    React.useEffect(() => {
        if (router.isReady) {
            axios.get(`http://120.25.216.186:8888/hotel?hotelName=${hotel_name}`).then((resp) => {
                setHotelInfo(resp.data);
            })
        }
    }, [router.isReady])
    React.useEffect(() => {
        if (router.isReady) {
            axios.get(`http://120.25.216.186:8888/roomtype/hotel?hotelName=${hotel_name}`).then((resp) => {
                setRoomList(resp.data)
            })
        }
    }, [router.isReady])

    const theme = createTheme({
        typography: {
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 15
        },
        palette: {
            primary: {
                main: '#2E3B55'
            },
            secondary: {
                main: '#fff'
            }
        }
    })

    const cardVariants = { //for hotel card anim
        offscreen: {
            y: 300,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.2,
                duration: 0.8
            }
        }
    };

    const fullScreenMap = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ThemeProvider theme={theme}>
            <NavBar href={"/hotels/" + hotel_name} refreshUserInfo={() => {
                setUserID(0)
            }}/>
            <Box
                component="main"
                sx={{
                    backgroundColor: 'white',
                    flexGrow: 1,
                    height: "max-content",
                    overflow: "hidden",
                    paddingX: 5,
                    mt: '60px',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    paddingY: 4,
                    paddingX: {xs: 0, sm: 4},
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography paddingBottom={2} variant="h4">开启您的旅程</Typography>
                    <BranchIntro hotelInfo={hotelInfo} name={hotel_name} userID={userID}
                                 markedHotels={markedHotels}/>
                </Box>
                <Box sx={{paddingX: {xs: 0, sm: 4}, paddingY: 6}}>
                    <Grid container spacing={4} columns={24}>
                        <Grid item xs={24} xl={24} flexDirection='row'>
                            <Stack gap={2} direction='row'>
                                <Typography variant="h4">房型</Typography>
                                <Button sx={{fontSize: 20}} size='large' variant="contained"
                                        onClick={() => setOpenFloorPlan(true)}>查看平面图</Button>
                            </Stack>
                        </Grid>
                        {roomList.map((item, index) => (

                            <Grid key={item.roomtypeid} item xs={24} md={12} lg={8} xl={6}>
                                <motion.div viewport={{once: true}} initial='offscreen' whileInView='onscreen'
                                            variants={cardVariants}>
                                    <RoomCard roomInfo={item} hotelName={hotel_name} hotelID={item.hotelid}
                                              admin={false} needMarkBox={true} userID={userID} markedRooms={markedRooms}
                                              imageUrl={roomImageUrl[item.roomtypeid]}
                                              roomTypeID={item.roomtypeid}></RoomCard>

                                </motion.div>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
                <Box sx={{paddingX: {xs: 0, sm: 4}, paddingY: 6}}>
                    <CommentArea hotelID={hotel_name}/>
                </Box>
            </Box>
            <Dialog keepMounted onClose={() => setMapOpen(false)} fullScreen={fullScreenMap} fullWidth maxWidth='lg'
                    sx={{zIndex: 1000}} open={openFloorPlan}>
                <DialogTitle>
                    酒店平面图
                    <IconButton onClick={() => setOpenFloorPlan(false)}>
                        <CloseOutlined/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{display: 'flex', justifyContent: 'center'}}>
                    <iframe src={"/floor-plans/"+hotel_name+".html"} id="floor-plan" height="500" width="600" frameBorder="0"
                            style={{borderRadius: 10}}></iframe>
                </DialogContent>
            </Dialog>

        </ThemeProvider>
    )
}