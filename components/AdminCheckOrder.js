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
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { branchHotels, orderColumns, orderRows } from "../data";
import { DataGrid, zhCN } from "@mui/x-data-grid";
import axios from "axios";

export default function AdminCheckOrder() {

  const [dataRows, setDataRows] = React.useState([])
  const orderColumns = [
    {field:'customerName',headerName:'顾客',width:90},
    { field: 'telephone', headerName: '电话', width: 120 },
    { field: 'roomTypeName', headerName: '房型', width: 90 },
    { field: 'hotelName', headerName: '分店', width: 120 },
    { field: 'checkInTime', headerName: '入住时间', width: 150 },
    { field: 'checkOutTime', headerName: '退房时间', width: 150 },
]
  // 表格状态，用于搜索
  const [form, setForm] = React.useState({
    id: '',
    branch: ''
  });

  React.useEffect(() => {
    axios.get("http://10.26.133.163:8888/orders/findAll").then((resp) => setDataRows(resp.data))
  },[])

  //自动补全状态
  const [autoValue, setAutoValue] = React.useState(branchHotels[0]);

  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    // alert(form.id);
    router.push({
      query: { id: form.id, branch: form.branch.name },
    });
    console.log(form.branch)
    console.log(autoValue);
  }

  return (
    <React.Fragment>
      {/* <Head>
        <meta charSet="utf-8" httpEquiv="Content-type" content="text/html"></meta>
      </Head> */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <Card>
            <CardHeader title="Filter" />
            <CardContent sx={{ pt: 0 }}>
              <Stack
                component="form"
                gap={2}
                sx={{ display: "flex", flexDirection: "column", }}
                onSubmit={handleSubmit}
              >
                <TextField
                  value={form.id}
                  label="订单ID"
                  onChange={(e) => {
                    setForm({ ...form, id: e.target.value });
                  }}
                  sx={{}}
                ></TextField>

                <Autocomplete
                  sx={{}}
                  value={autoValue}
                  onChange={(event, newvalue) => {
                    setAutoValue(newvalue);
                    setForm({ ...form, branch: newvalue });
                  }}
                  options={branchHotels}
                  groupBy={(option) => option.city}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="分店" />
                  )}
                ></Autocomplete>
                <Button type="submit" variant="contained">
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
              <DataGrid getRowId={(row)=>row.customerName+row.orderTime} rows={dataRows} columns={orderColumns} autoHeight localeText={zhCN.components.MuiDataGrid.defaultProps.localeText} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
