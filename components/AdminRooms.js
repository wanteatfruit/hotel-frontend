import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormLabel,
  Button,
  Backdrop,
  Select,
  MenuItem,
  ListSubheader,

} from "@mui/material";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React from "react";
import RoomCard from "./RoomCard";
import { AddCircleOutline } from "@mui/icons-material";
import { roomImageUrl } from "../data";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function AdminRooms({ hotel_list }) {
  const [roomList, setRoomList] = React.useState(null)
  const [openAdd, setOpenAdd] = React.useState(false);
  const [guestNum, setGuestNum] = React.useState()
  const [remain, setRemain] = React.useState()
  const [roomName, setRoomName] = React.useState('')
  const [roomPrice, setRoomPrice] = React.useState()
  const [roomIntro, setRoomIntro] = React.useState([false, false, false])  //get roomtype by hotel
  const [hotel, setHotel] = React.useState('深圳湾1号');
  const [addToHotel, setAddTo] = React.useState('');
  const roomColumns = [
    { field: 'hotelname', headerName: '分店', width: 120 },
    { field: 'roomtypeid', headerName: '房型ID', width: 90 },
    { field: 'roomname', headerName: '房型名', width: 120 },
    { field: 'price', headerName: '价格', width: 90 },
    { field: 'introduction', headerName: '杂项', width: 150 },
  ]
  React.useEffect(() => {
    if (hotel === '') {
      axios.get("http://10.26.111.227:8888/roomtype/getAll").then((resp) => {
        setRoomList(resp.data)
      })
      console.log(roomList)
    }
  }, [openAdd])

  React.useEffect(() => {
    if (hotel !== '') {
      axios.get(`http://10.26.111.227:8888/roomtype/hotel?hotelName=${hotel}`).then((resp) => {
        setRoomList(resp.data)
      })
    }
  }, [hotel, openAdd])

  function convertYesNo(bool) {
    if (bool === false) {
      return "无"
    }
    else return "有"
  }

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function handleRefresh() {
    // window.location.reload();
    await timeout(1)
    if (hotel === '') {
      axios.get("http://10.26.111.227:8888/roomtype/getAll").then((resp) => {
        setRoomList(resp.data)
      })
    }
    else {
      axios.get(`http://10.26.111.227:8888/roomtype/hotel?hotelName=${hotel}`).then((resp) => {
        setRoomList(resp.data)
      })
    }

    console.log("refreshed")

  }


  async function handleAdd() {
    const intro = `窗户|${convertYesNo(roomIntro[0])},阳台|${convertYesNo(roomIntro[1])},洗衣房|${convertYesNo(roomIntro[2])}`

    const newRoom = { roomName: roomName, price: roomPrice, introduction: intro, number: guestNum, remain: remain, hotelName: addToHotel }
    // console.log(newRoom)
    const resp = await fetch('http://10.26.111.227:8888/roomtype/addRoom', {
      method: 'POST',
      body: JSON.stringify(newRoom),
      headers: {
        'Content-type': 'application/json'
      }
    })
    console.log(resp.status)
  }




  return (
    <>
      <Paper >
        <Grid container columns={16} sx={{ padding: 1 }}>
          <Grid item xs={16}>
            <Stack
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              direction="row"
              gap={2}
              padding={1}
            >
              <div>
                <Typography variant="h5">房间信息</Typography>
                {/* <Button sx={{ marginTop: 1 }} onClick={() => { setOpenAdd(!openAdd) }} endIcon={<AddCircleOutline />}>
                  添加房间
                </Button> */}
                <Button  sx={{ marginTop: 1 }}  endIcon={<RefreshIcon />} onClick={()=>handleRefresh}>刷新</Button>
                {/* <IconButton sx={{ marginLeft: 1, marginTop: 1 }} color="primary" onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton> */}
              </div>
              <FormControl variant="standard" sx={{ width: '30%' }}>
                <InputLabel >分店</InputLabel>
                <Select value={hotel} label="分店" onChange={(e) => {
                  setHotel(e.target.value)
                }}>
                  <ListSubheader>
                    {hotel_list[0].cityname}
                  </ListSubheader>
                  {hotel_list !== undefined && hotel_list.map((item) => (
                    item.cityname == "深圳" && <MenuItem key={item.hotelid} value={item.hotelname}>{item.hotelname}</MenuItem>
                  ))}
                  <ListSubheader>
                    广州
                  </ListSubheader>
                  {hotel_list !== undefined && hotel_list.map((item) => (
                    item.cityname == "广州" && <MenuItem key={item.hotelid} value={item.hotelname}>{item.hotelname}</MenuItem>
                  ))}
                  <ListSubheader>
                    上海
                  </ListSubheader>
                  {hotel_list !== undefined && hotel_list.map((item) => (
                    item.cityname == "上海" && <MenuItem key={item.hotelid} value={item.hotelname}>{item.hotelname}</MenuItem>
                  ))}
                  <ListSubheader>
                    重庆
                  </ListSubheader>
                  {hotel_list !== undefined && hotel_list.map((item) => (
                    item.cityname == "重庆" && <MenuItem key={item.hotelid} value={item.hotelname}>{item.hotelname}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Grid container columns={12} >
              {roomList != null ? (
                roomList.map((item) => (
                  <Grid key={item.roomtypeid} item xs={12} md={6} lg={6} xl={4} padding={2}>
                    <RoomCard refresh={handleRefresh} admin={true} roomName={item.roomname} roomInfo={item} imageUrl={roomImageUrl[item.roomtypeid % roomImageUrl.length]}></RoomCard>
                  </Grid>
                ))
              ) : (
                <Grid container justifyContent="center" padding={3}>
                  <Typography variant="body2">没有房间</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Backdrop open={openAdd} sx={{ zIndex: 1 }}>
        <Paper sx={{ width: 'max-content', padding: 2 }} >
          <Typography variant="h4" sx={{ marginBottom: 3 }}>添加房间</Typography>
          <Stack gap={2}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel >添加到分店</InputLabel>
              <Select MenuProps={{ PaperProps: { sx: { zIndex: 100002 } } }} value={addToHotel} label="添加到分店" onChange={(e) => {
                setAddTo(e.target.value)
              }}>
                {hotel_list !== undefined && hotel_list.map((item) => (
                  <MenuItem sx={{}} key={item.hotelid} value={item.hotelname}>{item.hotelname}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField value={roomName} onChange={(event) => {
              setRoomName(event.target.value);
            }} label="房间名" required>
            </TextField>
            <TextField value={roomPrice} onChange={(event) => {
              setRoomPrice(event.target.value)
            }} inputProps={{ type: 'numeric', pattern: "^([0-9]*[.])?[0-9]+$" }} label="价格" required>
            </TextField>
            <TextField value={guestNum} onChange={(event) => {
              setGuestNum(event.target.value)
            }} inputProps={{ type: 'numeric', pattern: "^([0-9]*[.])?[0-9]+$" }} label="预期入住人数" required>
            </TextField>
            <TextField value={remain} onChange={(event) => {
              setRemain(event.target.value)
            }} inputProps={{ type: 'numeric', pattern: "^([0-9]*[.])?[0-9]+$" }} label="剩余数量" required>
            </TextField>
            <Typography variant="h6" >杂项</Typography>
            <FormGroup sx={{ padding: 0 }}>
              <FormControlLabel control={<Checkbox checked={roomIntro[0]} onChange={(event) => setRoomIntro([event.target.checked, roomIntro[1], roomIntro[2]])} />} label="窗户" />
              <FormControlLabel control={<Checkbox checked={roomIntro[1]} onChange={(event) => setRoomIntro([roomIntro[0], event.target.checked, roomIntro[2]])} />} label="阳台" />
              <FormControlLabel control={<Checkbox checked={roomIntro[2]} onChange={(event) => setRoomIntro([roomIntro[0], roomIntro[1], event.target.checked])} />} label="洗衣房" />
            </FormGroup>
          </Stack>
          <Button onClick={() => setOpenAdd(false)}>取消</Button>
          <Button variant="contained" onClick={() => { handleAdd(); setOpenAdd(false) }}>提交</Button>

        </Paper>
      </Backdrop>
    </>
  );
}
