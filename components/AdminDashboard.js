import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AdiminDashTimeline from "./admindashboard/Timeline";

export default function AdminDashboard(){
    return (
      <>
        <Stack sx={{pb:4}}>
          <Typography variant="h2">欢迎回来</Typography>
          <Typography variant="b1">请查看最新数据</Typography>
        </Stack>
        <Grid container columns={24} spacing={2}>
          <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
            <Card>订房数量</Card>
          </Grid>
          <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
            <Card>入住人数</Card>
          </Grid>
          <Grid item xs={24} sm={24} md={24} lg={8} xl={7}>
            <Card>热门房型</Card>
          </Grid>
          <Grid item xs={24} sm={24} md={24} lg={8} xl={7}>
            <Card>热门分店</Card>
          </Grid>
          <Grid item xs={24} sm={24} md={24} lg={8} xl={7}>
            <Card>热门城市</Card>
          </Grid>
          <Grid item xs={24} md={8} xl={6}>
            <Card>
              <CardHeader title="订单记录">订单记录</CardHeader>
              <CardContent>
                <AdiminDashTimeline />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={24} lg={16} xl={18}>
            <Card>
              <CardHeader title="最近订单">最近订单</CardHeader>
            </Card>
          </Grid>
        </Grid>
      </>
    );
}