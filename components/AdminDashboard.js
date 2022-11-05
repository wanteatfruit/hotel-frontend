import { IcecreamOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AdiminDashTimeline from "./admindashboard/Timeline";

export default function AdminDashboard({ hot_room, hot_hotel, hot_city, cust_cnt, ordered_cnt, sales }) {
  console.log(sales)

  return (
    <>
      <Stack sx={{ pb: 4 }}>
        <Typography variant="h2">欢迎回来</Typography>
        <Typography variant="b1">请查看最新数据</Typography>
      </Stack>
      <Grid container columns={24} spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card sx={{ borderRadius: '15px' }}>
            <CardHeader title={"订房数量"}>

            </CardHeader>
            <CardContent>
              {/* <Typography variant="h4">订房数量</Typography> */}
              <Typography variant="h4">{ordered_cnt}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card>
            <CardHeader title="入住人数" />
            <CardContent>
              <Typography variant="h4">{cust_cnt}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card sx={{ transform: 'scaleX(-1)', height: '22vh', backgroundImage: 'url("https://images.pexels.com/photos/212269/pexels-photo-212269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', transform: 'scaleX(-1)' }}>
              <CardHeader title="热门房型" />
              <CardContent>
                <Typography variant="h4">{hot_room}</Typography>
              </CardContent>
            </div>
          </Card>

        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card sx={{ height: '22vh', transform: 'scaleX(-1)', backgroundImage: 'url("https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?cs=srgb&dl=pexels-expect-best-323705.jpg&fm=jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', transform: 'scaleX(-1)', }}>
              <CardHeader title="热门分店"></CardHeader>
              <CardContent>
                <Typography variant="h4">{hot_hotel}</Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card sx={{ height: '22vh', backgroundImage: 'url("https://images.pexels.com/photos/3386540/pexels-photo-3386540.jpeg?cs=srgb&dl=pexels-andre-moura-3386540.jpg&fm=jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div style={{ backdropFilter: 'blur(2px)', height: '100%', }}>
              <CardHeader title="热门城市" sx={{ color:'white'}}></CardHeader>
              <CardContent>
                <Typography variant="h4" color="white">
                  {hot_city}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card >
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
                <LineChart data={sales} title="销售数据">
                  <XAxis dataKey="time" minTickGap={10} />
                  <YAxis />
                  <Line dot={false} type="monotone" dataKey="y"></Line>
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}