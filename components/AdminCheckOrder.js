import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  Stack,
  Input,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { branchHotels, orderColumns, orderRows } from "../data";
import { DataGrid, zhCN } from "@mui/x-data-grid";
import axios from "axios";




export default function AdminCheckOrder({hotel_list}) {
  const [submit  ,setSubmit] = React.useState(false)
  const [dataRows, setDataRows] = React.useState([])
  const orderColumns = [
    { field: 'customerName', headerName: '顾客', width: 90 },
    { field: 'telephone', headerName: '电话', width: 120 },
    { field: 'roomTypeName', headerName: '房型', width: 90 },
    { field: 'hotelName', headerName: '分店', width: 120 },
    { field: 'checkInTime', headerName: '入住时间', width: 150 },
    { field: 'checkOutTime', headerName: '退房时间', width: 150 },
  ]
  // 表格状态，用于搜索
  const [form, setForm] = React.useState({
    customer: '',
    hotel: '',
    city: '',
    telephone: ''
  });

  React.useEffect(() => {
    axios.get("http://120.25.216.186:8888/orders/findAll").then((resp) => setDataRows(resp.data))
  }, [])

  React.useEffect(()=>{
    setDataRows({...dataRows})
  },[submit])

  const router = useRouter();

 function handleSubmit(event) {
    // event.preventDefault();
    // alert(form.id);
    // setSubmit(!submit);
    // router.push({
    //   query: { customer:form.customer, hotel:form.hotel, city:form.city, telephone:form.telephone },
    // });
    console.log(form)

    // const url= router.query
    // const params = url.split("?")
    let get_url = "http://120.25.216.186:8888/orders/findbyparameters?customer="+form.customer+"&hotel="+form.hotel+"&city="+form.city+"&telephone="+form.telephone
    if(form.customer==""&&form.hotel==""&&form.city==""&&form.telephone==""){
      get_url = "http://120.25.216.186:8888/orders/findAll"
    }
    console.log(get_url)
    axios.get(get_url).then((resp)=>{setDataRows(resp.data); console.log(resp.data)})
    setSubmit(!submit);
  }

  return (
    <React.Fragment>
      {/* <Head>
        <meta charSet="utf-8" httpEquiv="Content-type" content="text/html"></meta>
      </Head> */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <Card>
            <CardHeader title="筛选" />
            <CardContent sx={{ pt: 0 }}>
              <Stack
                component="form"
                gap={2}
                sx={{ display: "flex", flexDirection: "column", }}
                onSubmit={handleSubmit}
              >
                <TextField
                  value={form.customer}
                  label="顾客"
                  onChange={(e) => {
                    setForm({ ...form, customer: e.target.value });
                  }}
                  sx={{}}
                ></TextField>
                  <FormControl >
                  <InputLabel >分店</InputLabel>
                  <Select value={form.hotel} label="分店" onChange={(e) => {
                    setForm({ ...form, hotel: e.target.value })
                  }}>
                    {hotel_list.map((item)=>(
                      <MenuItem key={item.hotelid} value={item.hotelname}>{item.hotelname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  value={form.telephone}
                  label="电话"
                  onChange={(e) => {
                    setForm({ ...form, telephone: e.target.value });
                  }}
                  sx={{}}
                ></TextField>
                <FormControl >
                  <InputLabel >城市</InputLabel>
                  <Select value={form.city} label="城市" onChange={(e) => {
                    setForm({ ...form, city: e.target.value })
                  }}>
                    <MenuItem value="深圳">深圳</MenuItem>
                    <MenuItem value="广州">广州</MenuItem>
                    <MenuItem value="重庆">重庆</MenuItem>
                    <MenuItem value="上海">上海</MenuItem>
                    <MenuItem value="">无</MenuItem>
                  </Select>
                </FormControl>
                <Button onClick={handleSubmit} variant="contained">
                  筛选
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Card>
            <CardHeader title="订单" />
            <CardContent sx={{}}>
              <DataGrid  pageSize={10} rowsPerPageOptions={[10,20,50]}  getRowId={(row) => row.customerName + row.orderTime} rows={dataRows} columns={orderColumns} autoHeight localeText={zhCN.components.MuiDataGrid.defaultProps.localeText} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
