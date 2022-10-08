import Layout from "../components/Layout";
import { Box, Grid, Paper } from "@mui/material";
import Image from "next/image";
import styles from "../styles/HotelPage.module.css";
import { Stack } from "@mui/system";
import HotelCard from "../components/HotelCard";
export default function HotelPage() {
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
        <div className={styles.picWrapper}>
          <div className={styles.pic}></div>
          <div className={styles.picContent}>
            <p className={styles.stay}>入住</p>
          </div>
        </div>
        <Box sx={{backgroundColor:'aqua'}}>
          <div className={styles.introWrapper}>
            <p className={styles.introContent}>
              Beyond our legendary hotels, we offer our unique brand of
              hospitality at luxurious residences, one-of-a-kind private homes,
              and carefully curated partner hotels
            </p>
          </div>
        </Box>
        <div className={styles.pickWrapper}>
          <Box sx={{backgroundColor:'rebeccapurple'}}>
            <Stack sx={{padding:2}} spacing={2} direction='row'>
              <HotelCard hotelName={'分店1'} imageSrc={"https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=800"} />
              <HotelCard hotelName={'分店2'} imageSrc={"https://images.pexels.com/photos/13794096/pexels-photo-13794096.jpeg?auto=compress&cs=tinysrgb&w=800"}/>
                <HotelCard hotelName={'分店3'} />
            </Stack>
          </Box>
        </div>
      </Box>
    </Layout>
  );
}
