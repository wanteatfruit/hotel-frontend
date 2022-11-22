import { Box, Grid, Typography } from "@mui/material"
import Image from "next/image";
import { useRouter } from "next/router"
import React from "react";
import BranchIntro from "../../components/BranchIntroduction";
import Layout from "../../components/Layout"
import RoomCard from "../../components/RoomCard";
import styles_index from "../../styles/HotelPage.module.css";
import axios from "axios";
import { roomImageUrl } from "../../data";
import CommentArea from "./comment-area";
import FloorPlanA from "../../components/floor-plan-a";
import FloorPlanC from "../../components/floor-plan-c";
export default function HotelDetail() {
    const router = useRouter()
    const id = router.query.id
    //id为酒店名，动态路径
    const [roomList, setRoomList] = React.useState([]);
    const [hotelInfo, setHotelInfo] = React.useState({})
    React.useEffect(() => {
        if(router.isReady){
        axios.get(`http://120.25.216.186:8888/hotel?hotelName=${id}`).then((resp) => {
            setHotelInfo(resp.data);
        })
    }
    }, [router.isReady])
    React.useEffect(() => {
        if(router.isReady){
        axios.get(`http://120.25.216.186:8888/roomtype/hotel?hotelName=${id}`).then((resp) => {
            setRoomList(resp.data)
        })
    }
    }, [router.isReady])
    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "max-content",
                    overflow: "auto",
                }}
            >
                <Box sx={{display: 'flex', paddingY: 4, paddingX:2, justifyContent: 'center', flexDirection:'column' }}>
                    <Typography paddingBottom={2} variant="h4">开启您的旅程</Typography>
                    <BranchIntro hotelInfo={hotelInfo} name={id} url={"https://images.unsplash.com/photo-1608381742187-ea4b48c56630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1224&q=80"} description={'改革开放的起点'} />
                </Box>
                <Box sx={{  paddingX: 6, paddingY:6 }}>
                    <Grid container spacing={4} columns={24}>
                        <Grid item xs={24} xl={24}>
                            <Typography variant="h4">房型</Typography>
                        </Grid>
                        {roomList.map((item, index) => (
                            <Grid key={item.roomtypeid} item xs={24} md={12} lg={8} xl={6}>
                                <RoomCard roomInfo={item} hotelName={id} imageUrl={roomImageUrl[item.roomtypeid%roomImageUrl.length]} admin={false}></RoomCard>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
                <Box sx={{paddingX:6}}>
                <Typography variant="h4">评论</Typography>

                    <CommentArea />
                    {/* <FloorPlanA></FloorPlanA>
                    <FloorPlanC /> */}
                </Box>
            </Box>
        </Layout>

    )
}