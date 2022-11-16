import { HotelOutlined, IcecreamOutlined, PersonOutlineOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia, createTheme, Grid, IconButton, Paper, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AdiminDashTimeline from "./admindashboard/Timeline";
import axios from "axios";

export default function AdminDashboard({ hot_room, hot_hotel, hot_city, cust_cnt, ordered_cnt, sales }) {
  const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px'
  }))

  const [adminData,setAdminData] = React.useState({
    hot_room:null,
     hot_hotel:null, 
     hot_city:null,
      cust_cnt:0, 
      ordered_cnt:0, 
      sales:null
  })

  React.useEffect(()=>{
    // const fetchRoom = async ()=>{
    //   await axios.get(
    //     "http://10.26.133.163:8888/manager/hotCity"
    //   )
    // }
    // const fetchHotel = async () => {
    //   await axios.get(
    //     "http://10.26.133.163:8888/manager/hotHotel"
    //   )
    // }
    // const fetchCity = async () => {
    //   await axios.get(
    //     "http://10.26.133.163:8888/manager/hotCity"
    //   )
    // }
    // const fetchCus = async () => {
    //   await axios.get(
    //     "http://10.26.133.163:8888/manager/hotCity"
    //   )
    // }
    // const fetchOrder = async () => {
    //   await axios.get(
    //     "http://10.26.133.163:8888/manager/hotCity"
    //   )
    // }
    // const fetchSales = async () => {
    //   await axios.get(
    //     "http://10.26.133.163:8888/manager/hotCity"
    //   )
    // }

    const fetchData = async()=>{
      await axios.get(
        "http://10.26.133.163:8888/manager/hotCity"
      ).then((resp) => setAdminData({ ...adminData, hot_city: resp.data }));
      console.log(adminData)
      await axios.get(
        "http://10.26.133.163:8888/manager/hotHotel"
      ).then((resp) => setAdminData({ ...adminData, hot_hotel: resp.data }));
      await axios.get(
        "http://10.26.133.163:8888/manager/hotRoomType"
      ).then((resp) => setAdminData({ ...adminData, hot_room: resp.data }));
      await axios.get(
        "http://10.26.133.163:8888/manager/orderedRoomNums"
      ).then((resp) => setAdminData({ ...adminData, ordered_cnt: resp.data }));
      await axios.get(
        "http://10.26.133.163:8888/manager/currentCustomer"
      ).then((resp) => setAdminData({ ...adminData, cust_cnt: resp.data }));
      await axios.get(
        "http://10.26.133.163:8888/manager/sales"
      ).then((resp) => setAdminData({ ...adminData, sales: resp.data }));
    }
    
    fetchData()

  },[])
  console.log(adminData)
  return (
    <>
      {/* <Stack sx={{ pb: 4 }}>
        <Typography variant="h2">欢迎回来</Typography>
        <Typography variant="b1">请查看最新数据</Typography>
      </Stack> */}
      <Grid container columns={24} spacing={3}>
        <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
          <Paper sx={{borderRadius:'20px'}}>
            <Stack sx={{ p: 4 }}>
              <Typography variant="h2">欢迎回来</Typography>
              <Typography variant="h6">请查看最新数据</Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <StyledCard sx={{ borderRadius: '20px' }}>
            <CardHeader title={"订房数量"} avatar={<HotelOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }}>

            </CardHeader>
            <CardContent>
              {/* <Typography variant="h4">订房数量</Typography> */}
              <Typography variant="h4">{adminData.ordered_cnt}</Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <StyledCard>
            <CardHeader title="入住人数" avatar={<PersonOutlineOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }} />
            <CardContent>
              <Typography variant="h4">{adminData.cust_cnt}</Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <StyledCard sx={{ transform: 'scaleX(-1)', height: '22vh', backgroundImage: 'url("https://images.pexels.com/photos/212269/pexels-photo-212269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', transform: 'scaleX(-1)' }}>
              <CardHeader title="热门房型" />
              <CardContent>
                <Typography variant="h4">{adminData.hot_room}</Typography>
              </CardContent>
            </div>
          </StyledCard>

        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <StyledCard sx={{ height: '22vh', transform: 'scaleX(-1)', backgroundImage: 'url("https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?cs=srgb&dl=pexels-expect-best-323705.jpg&fm=jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', transform: 'scaleX(-1)', }}>
              <CardHeader title="热门分店"></CardHeader>
              <CardContent>
                <Typography variant="h4">{adminData.hot_hotel}</Typography>
              </CardContent>
            </div>
          </StyledCard>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <StyledCard sx={{ height: '22vh', backgroundImage: 'url("https://images.pexels.com/photos/3386540/pexels-photo-3386540.jpeg?cs=srgb&dl=pexels-andre-moura-3386540.jpg&fm=jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', }}>
              <CardHeader title="热门城市" sx={{ color: 'white' }}></CardHeader>
              <CardContent>
                <Typography variant="h4" color="white">
                  {adminData.hot_city}
                </Typography>
              </CardContent>
            </div>
          </StyledCard>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
          <StyledCard >
            <CardHeader title="销售数据"></CardHeader>
            <CardContent sx={{ height: '30vh', paddingRight: '50px' }}>
              {/* <ToggleButtonGroup size='small' color="primary" sx={{paddingBottom:'20px'}}>
                <ToggleButton>
                  全部
                </ToggleButton>
                <ToggleButton>
                  6月
                </ToggleButton>
                <ToggleButton>
                  1月
                </ToggleButton>
              </ToggleButtonGroup> */}
              <ResponsiveContainer >
                <LineChart data={adminData.sales} title="销售数据">
                  <XAxis dataKey="time" minTickGap={10} />
                  <YAxis />
                  <Line dot={false} type="monotone" dataKey="y"></Line>
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </>
  );
}