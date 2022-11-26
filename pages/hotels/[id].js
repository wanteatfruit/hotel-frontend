import { useMediaQuery, Box, Button, Dialog, DialogContent, Grid, IconButton, Typography, DialogTitle, Stack } from "@mui/material"
import Image from "next/image";
import { useRouter } from "next/router"
import React from "react";
import BranchIntro from "../../components/BranchIntroduction";
import Layout from "../../components/Layout"
import RoomCard from "../../components/RoomCard";
import styles from "../../styles/HotelPage.module.css";
import axios from "axios";
import { roomImageUrl } from "../../data";
import CommentArea from "./comment-area";
import FloorPlanA from "../../components/floor-plan-a";
import FloorPlanC from "../../components/floor-plan-c";
import { CloseOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../../components/Navbar";
import { motion } from "framer-motion";

// export async function getStaticPaths() { //确定酒店名字后写死
//     return {
//       paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//       fallback: false, // can also be true or 'blocking'
//     }
//   }


export default function HotelDetail() {
    const router = useRouter()
    const hotel_name = router.query.id
    //id为酒店名，动态路径
    const [roomList, setRoomList] = React.useState([]);
    const [hotelInfo, setHotelInfo] = React.useState({})
    const [openFloorPlan, setOpenFloorPlan] = React.useState(false);

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
        <ThemeProvider theme={theme} >
            <NavBar />
            <Box
                component="main"
                sx={{
                    backgroundColor: 'white',
                    flexGrow: 1,
                    height: "max-content",
                    overflow: "auto",
                    paddingX: 5
                }}
            >
                <Box sx={{ display: 'flex', paddingY: 4, paddingX: {xs:0,sm:4}, justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography paddingBottom={2} variant="h4">开启您的旅程</Typography>
                    <BranchIntro hotelInfo={hotelInfo} name={hotel_name} url={"https://images.unsplash.com/photo-1608381742187-ea4b48c56630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1224&q=80"} description={'改革开放的起点'} />
                </Box>
                <Box sx={{ paddingX: {xs:0,sm:4}, paddingY: 6 }}>
                    <Grid container spacing={4} columns={24}>
                        <Grid item xs={24} xl={24} flexDirection='row'>
                            <Stack gap={2} direction='row'>
                                <Typography variant="h4">房型</Typography>
                                <Button sx={{ fontSize: 20 }} size='large' variant="contained" onClick={() => setOpenFloorPlan(true)}>查看平面图</Button>
                            </Stack>
                        </Grid>
                        {roomList.map((item, index) => (

                            <Grid key={item.roomtypeid} item xs={24} md={12} lg={8} xl={6}>
                                <motion.div viewport={{ once: true }} initial='offscreen' whileInView='onscreen' variants={cardVariants}>
                                    <RoomCard roomInfo={item} hotelName={hotel_name} imageUrl={roomImageUrl[item.roomtypeid % roomImageUrl.length]} admin={false}></RoomCard>
                                </motion.div>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
                <Box sx={{ paddingX: {xs:0,sm:4}, paddingY: 6 }}>
                    <CommentArea />
                </Box>
            </Box>
            <Dialog keepMounted onClose={() => setMapOpen(false)} fullScreen={fullScreenMap} fullWidth maxWidth='lg' sx={{ zIndex: 1000 }} open={openFloorPlan}>
                <DialogTitle>
                    酒店平面图
                    <IconButton onClick={() => setOpenFloorPlan(false)}>
                        <CloseOutlined />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* 根据hotelname给三家酒店写死平面图 */}
                    <FloorPlanA href1={"www.baidu.com"} href2={"www.baidu.com"} />

                </DialogContent>
            </Dialog>

        </ThemeProvider>
    )
}