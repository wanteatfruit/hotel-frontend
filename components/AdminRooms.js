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
  MenuItem
} from "@mui/material";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React from "react";
import RoomCard from "./RoomCard";
import { AddCircleOutline } from "@mui/icons-material";
import { roomImageUrl } from "../data";


export default function AdminRooms({hotel_list}) {
  const [roomList, setRoomList] = React.useState(null)
  const [openAdd,setOpenAdd] = React.useState(false);
  const [roomName, setRoomName] = React.useState('')
  const [roomPrice, setRoomPrice] = React.useState()
  const [roomIntro, setRoomIntro] = React.useState([false, false, false])  //get roomtype by hotel

  React.useEffect(() => {
    axios.get("http://120.25.216.186:8888/roomtype/getAll").then((resp) => {
      setRoomList(resp.data)
    })
    console.log(roomList)
  }, [])



  React.useEffect(()=>{
    
  })

  const [hotel,setHotel] = React.useState('');

  const [citySelect, setCitySelect] = React.useState({
    sz: false,
    gz: false,
    cq: false,
    sh: false,
  });
  const handleCityChange = (event) => {
    setCitySelect({
      ...citySelect,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <>
    <Paper >
      <Grid container columns={16} sx={{padding:1}}>
        <Grid item xs={16} md={12}>
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
            {/* <IconButton>
              <AddCircleOutline />
            </IconButton> */}
            <Button sx={{marginTop:1}} onClick={()=>{setOpenAdd(!openAdd)}} endIcon={<AddCircleOutline />}>
                添加房间
            </Button>
            </div>
            <FormControl variant="standard" sx={{width:'30%'}}>
                  <InputLabel >分店</InputLabel>
                  <Select value={hotel} label="分店" onChange={(e) => {
                    setHotel(e.target.value)
                  }}>
                    {hotel_list!==undefined && hotel_list.map((item)=>(
                      <MenuItem key={item.hotelid} value={item.hotelname}>{item.hotelname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

            {/* <FormControl>
              <InputLabel>搜索房型</InputLabel>
              <OutlinedInput 
                sx={{width:'100%'}}
                label="搜索房型"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </FormControl> */}
          </Stack>
          <Grid container columns={12} >
            {roomList !=null ? (
              roomList.map((item) => (
                <Grid  key={item.roomtypeid} item xs={12} md={6} lg={6} xl={4} padding={2}>
                  <RoomCard admin roomName={item.roomname} roomInfo={item} imageUrl={roomImageUrl[item.roomtypeid]}></RoomCard>
                </Grid>
              ))
            ) : (
              <Grid container justifyContent="center" padding={3}>
                <Typography variant="body2">No Rooms</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item sm={0} md={4} sx={{}}>
          <Stack padding="8px" sx={{display:'flex',justifyContent:'center'}}>
            <FormLabel>选择城市</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="深圳"
                control={
                  <Checkbox
                    checked={citySelect.sz}
                    onChange={handleCityChange}
                    name="sz"
                  />
                }
              />
              <FormControlLabel
                label="广州"
                control={
                  <Checkbox
                    checked={citySelect.gz}
                    onChange={handleCityChange}
                    name="gz"
                  />
                }
              />
              <FormControlLabel
                label="重庆"
                control={
                  <Checkbox
                    checked={citySelect.cq}
                    onChange={handleCityChange}
                    name="cq"
                  />
                }
              />
              <FormControlLabel
                label="上海"
                control={
                  <Checkbox
                    checked={citySelect.sh}
                    onChange={handleCityChange}
                    name="sh"
                  />
                }
              />
            </FormGroup>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
    <Backdrop open={openAdd} sx={{zIndex:100000}}>
      <Paper sx={{ width: 'max-content', padding: 2 }} >
      <Typography variant="h4" sx={{marginBottom:3}}>添加房间</Typography>
                    <Stack gap={2}>
                        <TextField value={roomName} onChange={(event) => {
                            setRoomName(event.target.value);
                        }} label="房间名" required>
                        </TextField>
                        <TextField value={roomPrice} onChange={(event)=>{
                            setRoomPrice(event.target.value)
                        }} inputProps={{ type: 'numeric', pattern:"^([0-9]*[.])?[0-9]+$"}}  label="价格" required>
                        </TextField>
                        <Typography variant="h6">杂项</Typography>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={roomIntro[0]} onChange={(event)=>setRoomIntro([event.target.checked,roomIntro[1],roomIntro[2]])}/>} label="窗户" />
                            <FormControlLabel control={<Checkbox checked={roomIntro[1]} onChange={(event) => setRoomIntro([roomIntro[0], event.target.checked,roomIntro[2]])} />} label="阳台" />
                            <FormControlLabel control={<Checkbox checked={roomIntro[2]} onChange={(event) => setRoomIntro([roomIntro[0], roomIntro[1], event.target.checked])} />} label="洗衣房" /> 
                        </FormGroup>
                    </Stack>
                    <Button onClick={()=>setOpenAdd(false)}>取消</Button>
                    <Button variant="contained" onClick={()=>console.log(roomIntro)}>提交</Button>

      </Paper>
    </Backdrop>
    </>
  );
}
