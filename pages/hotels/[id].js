import { Box, Grid } from "@mui/material"
import { Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import RoomCard from "../../components/RoomCard";
import styles_index from "../../styles/HotelPage.module.css";

export default function HotelDetail() {
    const router = useRouter()
    const id = router.query.id
    //id为酒店名，动态路径
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
                <div className={styles_index.picWrapper}>
                    <div className={styles_index.picEach}>
                        <Image layout="fill" src="https://images.pexels.com/photos/3201922/pexels-photo-3201922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></Image>
                    </div>
                    <div className={styles_index.picContent}>
                        <p className={styles_index.stay}>{id}</p>
                    </div>
                </div>
                <Box sx={{backgroundColor:'antiquewhite'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <RoomCard />
                        </Grid>
                        <Grid item xs={12}>
                            <RoomCard />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>

    )
}