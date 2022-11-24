import Layout from "../../components/Layout";

import { Box, Grid, Paper, Tab, Typography } from "@mui/material";

import Image from "next/image";
import styles from "../../styles/HotelPage.module.css";
import {Stack} from "@mui/system";
import HotelCard from "../../components/HotelCard";
import Slider from "react-slick";
import React from "react";
import axios from "axios";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { hotelImageUrl } from "../../data";
export async function getStaticProps() {
  const hotel_response = await axios.get('http://120.25.216.186:8888/hotel/getAll');
  const hotel_list = hotel_response.data
  const room_respose = await axios.get('http://120.25.216.186:8888/roomtype/getAll');
  const room_list = room_respose.data
  console.log(hotel_list)
  return {
    props: {
      hotel_list, room_list
    },
    revalidate: 10
  }
}

export default function Hotels({hotel_list, room_list, singlePage}){
  return(
    <Layout>
    <HotelPage hotel_list={hotel_list} room_list={room_list} singlePage={true} />
    </Layout>
  )
}

function HotelPage({ hotel_list, room_list, singlePage }) {
  const [tabValue, setTabValue] = React.useState('0');
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }
  return (
    <>
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
          paddingBottom: 2
        }}
      >
        {singlePage && <div className={styles.picWrapper}>
          <Image src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            layout="fill" objectFit="cover" ></Image>
          <div className={styles.picContent}>
            <p className={styles.stay}>入住</p>
          </div>
        </div>}
        <div className={styles.pickWrapper}>
          <Box sx={{ backgroundColor: 'grey' }}>
            <TabContext value={tabValue} sx={{ height: '100vh', fontSize:'30rem' }} >
              <TabList variant="fullWidth" sx={{ fontSize: '30rem' }} onChange={handleTabChange}>
                <Tab label="深圳" value="0"></Tab>
                <Tab label="广州" value="1"></Tab>
                <Tab label="重庆" value="2"></Tab>
                <Tab label="上海" value="3"></Tab>
              </TabList>

              <TabPanel value="0" >
                <Stack sx={{ padding: 2,  justifyContent: { sm: 'center', md: 'flex-start' }, alignItems: 'center' }} spacing={{xs:4,sm:4}} direction={{ sm: 'column', md: 'row' }}>
                  {hotel_list.map((item, index) => (item.cityname == "深圳" && <div>
                    <HotelCard hotelName={item.hotelname} key={item.hotelid} imageSrc={hotelImageUrl[index]} />
                  </div>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel value="1">
                <Stack sx={{ padding: 2, justifyContent: { sm: 'center', md: 'flex-start' }, alignItems: 'center' }} spacing={{xs:4,sm:4}} direction={{ sm: 'column', md: 'row' }}>
                  {hotel_list.map((item, index) => (item.cityname == "广州" && <div>
                    <HotelCard hotelName={item.hotelname} key={item.hotelid} imageSrc={hotelImageUrl[index]} />
                  </div>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel value="2">
                <Stack sx={{ padding: 2,  justifyContent: { sm: 'center', md: 'flex-start' }, alignItems: 'center' }} spacing={{xs:4,sm:4}} direction={{ sm: 'column', md: 'row' }}>
                  {hotel_list.map((item, index) => (item.cityname == "重庆" && <div>
                    <HotelCard hotelName={item.hotelname} key={item.hotelid} imageSrc={hotelImageUrl[index]} />
                  </div>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel value="3">
                <Stack sx={{ padding: 2,  justifyContent: { sm: 'center', md: 'flex-start' }, alignItems: 'center' }} spacing={{xs:4,sm:4}} direction={{ sm: 'column', md: 'row' }}>
                  {hotel_list.map((item, index) => (item.cityname == "上海" && <div>
                    <HotelCard hotelName={item.hotelname} key={item.hotelid} imageSrc={hotelImageUrl[index]} />
                  </div>
                  ))}
                </Stack>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </Box>
    </>
  );
}
