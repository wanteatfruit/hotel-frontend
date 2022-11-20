import { Box, Grid } from "@mui/material"
import { Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router"
import React from "react";
import BranchIntro from "../../components/BranchIntroduction";
import Layout from "../../components/Layout"
import RoomCard from "../../components/RoomCard";
import styles_index from "../../styles/HotelPage.module.css";
import axios from "axios";
export default function HotelDetail() {
    const router = useRouter()
    const id = router.query.id
    //id为酒店名，动态路径
    const [roomList, setRoomList] = React.useState([]);
    const [hotelInfo, setHotelInfo] = React.useState({})
    React.useEffect(()=>{
        axios.get(`http://120.25.216.186:8888/hotel?id=1`).then((resp)=>{
            setHotelInfo(resp.data);
        })
    },[])
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
                {/* <div className={styles_index.picWrapper}>
                    <div className={styles_index.picEach}>
                        <Image objectFit="cover" layout="fill" src="https://images.pexels.com/photos/3201922/pexels-photo-3201922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></Image>
                    </div>
                    <div className={styles_index.picContent}>
                        <p className={styles_index.stay}>{id}</p>
                    </div>
                </div> */}
                <Box sx={{backgroundColor:'purple', display:'flex', paddingY:6, justifyContent:'center'}}>
                    <BranchIntro hotelInfo={hotelInfo}  name={id} url={"https://images.unsplash.com/photo-1608381742187-ea4b48c56630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1224&q=80"} description={'改革开放的起点'} />
                </Box>
                <Box sx={{ backgroundColor: 'antiquewhite', paddingY: '40px', paddingX:'30px' }}>
                    <Grid container spacing={4} columns={24}>
                        <Grid item xs={24} md={12}>
                            {/* <RoomCard hotelName={id} roomName={'豪华大床房'}
                                imageUrl={'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                                description={'xxx大酒店的豪华单人间采用明清建筑的豪宅风格，配置1.8米豪华大床，选用顶级舒适的床上用品、拥有最豪华的布艺、家具和设施，以浓重而不失活泼的色调、奔放且大气的布局、近似自然优美的线条，营造豪华舒适、至尊至贵的假日体验。'} /> */}
                        </Grid>
                        <Grid item xs={24} md={12} >
                            {/* <RoomCard roomName={'总统套房'} description={'介绍'} /> */}
                        </Grid>
                        <Grid item xs={24} md={12} >
                            {/* <RoomCard roomName={'总统套房'} description={'介绍'} /> */}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>

    )
}