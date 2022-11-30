import {  AttachMoneyOutlined, CottageOutlined, DirectionsSubwayOutlined, HotelOutlined, IcecreamOutlined, LocalHotelOutlined, LocationCityOutlined, PersonOutlineOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia, createTheme, Grid, IconButton, Paper, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback } from "react";
import { Brush,Sector, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";

export default function AdminDashboard({ }) {
  const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px'
  }))
  const [hotRoom, setHotRoom] = React.useState(null);
  const [hotCity, setHotCity] = React.useState(null);
  const [hotHotel, setHotHotel] = React.useState(null);
  const [orderCnt, setOrderCnt] = React.useState(null);
  const [custCnt, setCustCnt] = React.useState(null);
  const [timeSales, setTimeSales] = React.useState(null);
  const [salesByCity, setSalesByCity] = React.useState(null);
  const [salesByHotel, setSalesByHotel] = React.useState(null);
  const [timeCustomers, setTimeCustomers] = React.useState(null);
  const [timeSalesSZ, setTimeSalesSZ] = React.useState(null);
  const [timeSalesGZ, setTimeSalesGZ] = React.useState(null);
  const [timeSalesSH, setTimeSalesSH] = React.useState(null);
  const [timeSalesCQ, setTimeSalesCQ] = React.useState(null);
  const [timeCustomersSZ, setTimeCustomersSZ] = React.useState(null);
  const [timeCustomersGZ, setTimeCustomersGZ] = React.useState(null);
  const [timeCustomersSH, setTimeCustomersSH] = React.useState(null);
  const [timeCustomersCQ, setTimeCustomersCQ] = React.useState(null);

  React.useEffect(() => {

    const fetchData = async () => {
      await axios.get(
        "http://120.25.216.186:8888/manager/hotCity"
      ).then((resp) => setHotCity(resp.data));
      console.log()
      await axios.get(
        "http://120.25.216.186:8888/manager/hotHotel"
      ).then((resp) => setHotHotel(resp.data));
      await axios.get(
        "http://120.25.216.186:8888/manager/hotRoomType"
      ).then((resp) => setHotRoom(resp.data));
      await axios.get(
        "http://120.25.216.186:8888/manager/orderedRoomNums"
      ).then((resp) => setOrderCnt(resp.data));
      await axios.get(
        "http://120.25.216.186:8888/manager/currentCustomer"
      ).then((resp) => setCustCnt(resp.data));
      await axios.get(
        "http://120.25.216.186:8888/manager/salesByCity"
      ).then((resp) => { setSalesByCity(resp.data) })
      await axios.get(
        "http://120.25.216.186:8888/manager/salesByHotel"
      ).then((resp) => setSalesByHotel(resp.data))
      await axios.get(
        "http://120.25.216.186:8888/manager/customer-time?city="
      ).then((resp) => setTimeCustomers(resp.data))
      await axios.get(
        "http://120.25.216.186:8888/manager/sales?city="
      ).then((resp) => setTimeSales(resp.data))
    }
    // console.log(salesByCity)
    fetchData()

  }, [])

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={0} textAnchor="middle" fill={fill}>
          {/* `${payload.city}` */}
          {`${payload.city}`}
        </text>
        <text style={{ display: { xl: 'none' } }} x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
          {/* `${payload.city}` */}

          {`${payload.sales}元`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}元`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  const [pieCityIndex, setPieCityIndex] = React.useState(0);
  const onPieCityEnter = useCallback(
    (_,index)=>{
      setPieCityIndex(index)
    },[setPieCityIndex]
  )
  const [pieHotelIndex, setPieHotelIndex] = React.useState(0);
  const onPieHotelEnter = useCallback((_,index)=>{
    setPieHotelIndex(index)
  },[setPieHotelIndex])
  return (
    <>
      <Grid container columns={24} spacing={3}>
        <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
          <Paper sx={{ borderRadius: '20px' }}>
            <Stack sx={{ p: 4 }}>
              <Typography variant="h2" component='h2'>欢迎回来</Typography>
              <Typography variant="h6">请查看最新数据</Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={24} sm={12} md={12} lg={12} xl={12}>
          <StyledCard sx={{ borderRadius: '20px' }}>
            <CardHeader title={"订房数量"} avatar={<HotelOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }}>

            </CardHeader>
            <CardContent>
              {/* <Typography variant="h4">订房数量</Typography> */}
              <Typography variant="h4">{orderCnt}</Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={24} sm={12} md={12} lg={12} xl={12}>
          <StyledCard>
            <CardHeader title="入住人数" avatar={<PersonOutlineOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }} />
            <CardContent>
              <Typography variant="h4">{custCnt}</Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <StyledCard sx={{ transform: 'scaleX(-1)', height: '22vh', backgroundImage: 'url("https://images.pexels.com/photos/212269/pexels-photo-212269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', transform: 'scaleX(-1)' }}>
              <CardHeader title="热门房型" avatar={<CottageOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }}/>
              <CardContent>
                <Typography variant="h4" sx={{  }}>{hotRoom}</Typography>
              </CardContent>
            </div>
          </StyledCard>

        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <StyledCard sx={{ height: '22vh', transform: 'scaleX(-1)', backgroundImage: 'url("https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?cs=srgb&dl=pexels-expect-best-323705.jpg&fm=jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', transform: 'scaleX(-1)', }}>
              <CardHeader title="热门分店" avatar={<LocationCityOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }}></CardHeader>
              <CardContent>
                <Typography variant="h4">{hotHotel}</Typography>
              </CardContent>
            </div>
          </StyledCard>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <StyledCard sx={{ height: '22vh', backgroundImage: 'url("https://images.pexels.com/photos/3386540/pexels-photo-3386540.jpeg?cs=srgb&dl=pexels-andre-moura-3386540.jpg&fm=jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', }}>
              <CardHeader titleTypographyProps={{ variant: 'h5' }} avatar={<DirectionsSubwayOutlined fontSize="large"/>} title="热门城市" sx={{ color: 'white' }}></CardHeader>
              <CardContent>
                <Typography variant="h4" color="white">
                  {hotCity}
                </Typography>
              </CardContent>
            </div>
          </StyledCard>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
          <StyledCard >
            <CardHeader sx={{pb:0}} title="客流数据" avatar={<PersonOutlineOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }}>
            </CardHeader>
            <CardContent sx={{ height: '42vh', paddingRight: '25px' }}>
            <ToggleButtonGroup size='small' color="primary" sx={{paddingBottom:'20px'}}>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/customer-time?city="
                      ).then((resp) => setTimeCustomers(resp.data))
                }}>
                  全部
                </ToggleButton>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/customer-time?city=深圳"
                      ).then((resp) => setTimeCustomers(resp.data))
                }}>
                  深圳
                </ToggleButton>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/customer-time?city=广州"
                      ).then((resp) => setTimeCustomers(resp.data))
                }}>
                  广州
                </ToggleButton>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/customer-time?city=上海"
                      ).then((resp) => setTimeCustomers(resp.data))
                }}>
                  上海
                </ToggleButton>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/customer-time?city=重庆"
                      ).then((resp) => setTimeCustomers(resp.data))
                }}>
                  重庆
                </ToggleButton>

              </ToggleButtonGroup>

              <ResponsiveContainer width="100%" height="80%"  >
                <LineChart width={500}
          height={300} data={timeCustomers} title="销售数据">
                  <XAxis dataKey="time" minTickGap={10} />
                  <YAxis />
                  <Line dot={false} type="monotone" dataKey="y"></Line>
                  <Tooltip />
                  <Brush height={20}/>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={24} sm={24} md={24} lg={12} xl={12}>
          <StyledCard>
            <CardHeader  sx={{ pb: 0 }} title="各城市销售额" avatar={<AttachMoneyOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }} />
            <CardContent sx={{ height: '35vh', p: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie isAnimationActive={false} activeIndex={pieCityIndex} activeShape={renderActiveShape} innerRadius={70} onMouseEnter={onPieCityEnter} nameKey='city' dataKey='sales' data={salesByCity} cx='50%' cy='50%' outerRadius={100} fill='#8884d8'>

                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={12} xl={12}>
          <StyledCard sx={{ pb: 0 }}>
            <CardHeader  sx={{ pb: 0 }} title="各分店销售额" avatar={<AttachMoneyOutlined fontSize="large" />} titleTypographyProps={{ variant: 'h5' }} />
            <CardContent sx={{ height: '35vh', p: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie  isAnimationActive={false} activeIndex={pieHotelIndex} activeShape={renderActiveShape} innerRadius={70} onMouseEnter={onPieHotelEnter} nameKey='city' dataKey='sales' data={salesByHotel} cx='50%' cy='50%' outerRadius={100} fill='#8884d8'>

                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
          <StyledCard >
            <CardHeader sx={{pb:0}} avatar={<AttachMoneyOutlined fontSize="large"/>} titleTypographyProps={{ variant: 'h5' }} title="销售额数据">
            </CardHeader>
            <CardContent sx={{ height: '42vh',paddingRight:'25px' }}>
            <ToggleButtonGroup size='small' color="primary" sx={{paddingBottom:'20px'}}>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/sales?city="
                      ).then((resp) => setTimeSales(resp.data))
                }}>
                  全部
                </ToggleButton>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/sales?city=深圳"
                      ).then((resp) => setTimeSales(resp.data))
                }}>
                  深圳
                </ToggleButton>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/sales?city=广州"
                      ).then((resp) => setTimeSales(resp.data))
                }}>
                  广州
                </ToggleButton>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/sales?city=上海"
                      ).then((resp) => setTimeSales(resp.data))
                }}>
                  上海
                </ToggleButton>
                <ToggleButton onClick={async ()=>{
                      await axios.get(
                        "http://120.25.216.186:8888/manager/sales?city=重庆"
                      ).then((resp) => setTimeSales(resp.data))
                }}>
                  重庆
                </ToggleButton>
              </ToggleButtonGroup>

              <ResponsiveContainer width="100%" height="80%"  >
                <LineChart width={500}
          height={300} data={timeSales} title="销售数据">
                  <XAxis dataKey="time" minTickGap={10} />
                  <YAxis />
                  <Line dot={false} stroke="#82ca9d" type="monotone" dataKey="y"></Line>
                  <Tooltip />
                  <Brush height={20}/>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

      </Grid>
    </>
  );
}