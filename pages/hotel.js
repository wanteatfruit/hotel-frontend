import Layout from "../components/Layout";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import styles from "../styles/HotelPage.module.css";
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
          
        </div>
      </Box>
    </Layout>
  );
}
