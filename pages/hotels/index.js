import Layout from "../../components/Layout";
import { Box, Grid, Paper, Tab } from "@mui/material";
import Image from "next/image";
import styles from "../../styles/HotelPage.module.css";
import { Stack } from "@mui/system";
import HotelCard from "../../components/HotelCard";
import Slider from "react-slick";
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
export default function HotelPage() {
  const [tabValue, setTabValue] = React.useState('0');
  const handleTabChange =(event, newValue)=>{
    setTabValue(newValue);
  }
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
          {/* <div className={styles.pic}></div> */}
          <Image src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            layout="fill" objectFit="cover" ></Image>
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
          <Box sx={{backgroundColor:'grey'}}>
            <TabContext value={tabValue} >
              <Box sx={{borderBottom:1,borderColor:'divider',paddingLeft:'20px'}}>
                <TabList variant="fullWidth" sx={{fontSize:'xx-large'}} onChange={handleTabChange}>
                  <Tab label="深圳" value="0"></Tab>
                  <Tab label="广州" value="1"></Tab>
                  <Tab label="重庆" value="2"></Tab>
                  <Tab label="上海" value="3"></Tab>
                </TabList>
              </Box>
              <TabPanel value="0">
                <Stack sx={{ padding: 2,overflow:'scroll',justifyContent:{sm:'center',md:'flex-start'},alignItems:'center' }} spacing={2} direction={{ sm: 'column', md: 'row' }}>
                  <div><HotelCard hotelName={'分店1'} imageSrc={"https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=800"} /></div>
                  <div><HotelCard hotelName={'分店2'} imageSrc={"https://images.pexels.com/photos/13794096/pexels-photo-13794096.jpeg?auto=compress&cs=tinysrgb&w=800"} /></div>
                  <div><HotelCard hotelName={'分店3'} imageSrc={'https://images.pexels.com/photos/5066935/pexels-photo-5066935.jpeg?auto=compress&cs=tinysrgb&w=800'} /></div>
                  <div><HotelCard hotelName={'分店3'} imageSrc={'https://images.pexels.com/photos/5066935/pexels-photo-5066935.jpeg?auto=compress&cs=tinysrgb&w=800'} /></div>
                  <div><HotelCard hotelName={'分店3'} imageSrc={'https://images.pexels.com/photos/5066935/pexels-photo-5066935.jpeg?auto=compress&cs=tinysrgb&w=800'} /></div>
                </Stack>
              </TabPanel>
              <TabPanel value="1">
                <HotelCard hotelName={'广州分店1'}></HotelCard>
              </TabPanel>
              <TabPanel value="2">
                <HotelCard hotelName={'广州分店1'}></HotelCard>
              </TabPanel>
              <TabPanel value="3">
                <HotelCard hotelName={'广州分店1'}></HotelCard>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </Box>
    </Layout>
  );
}
