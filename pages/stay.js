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
    Slider,
    ThemeProvider,
    createTheme,

} from "@mui/material";
import {Stack} from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React from "react";
import RoomCard from "../components/RoomCard";
import {AddCircleOutline} from "@mui/icons-material";
import {roomImageUrl} from "../data";
import RefreshIcon from '@mui/icons-material/Refresh';
import NavBar from "../components/Navbar";

export async function getStaticProps() {

    const hotel_response = await axios.get('http://120.25.216.186:8888/hotel/getAll');
    const hotel_list = hotel_response.data
    const room_respose = await axios.get('http://120.25.216.186:8888/roomtype/getAll');
    const room_list = room_respose.data
    return {
        props: {
            hotel_list, room_list
        },
        revalidate: 10
    }


}


export default function Stay({hotel_list}) {
    const [roomList, setRoomList] = React.useState(null)
    const [openAdd, setOpenAdd] = React.useState(false);
    const [roomName, setRoomName] = React.useState('')
    const [roomIntro, setRoomIntro] = React.useState([false, false, false])  //get roomtype by hotel
    const [hotel, setHotel] = React.useState('深圳湾1号');
    const [priceRange, setPriceRange] = React.useState([270,1000])
    const [guestsNumber, setGuestNum] = React.useState(2);
    const minPriceDiff = 30;
    const guestsNumberMarks = [
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
        {value: 4, label: '4'},
        {value: 5, label: '5'},

    ]

    React.useEffect(() => {
        if (hotel === '') {
            axios.get("http://120.25.216.186:8888/roomtype/getAll").then((resp) => {
                setRoomList(resp.data)
            })
            console.log(roomList)
        }
    }, [openAdd])

    React.useEffect(() => {
        if (hotel !== '') {
            axios.get(`http://120.25.216.186:8888/roomtype/hotel?hotelName=${hotel}`).then((resp) => {
                setRoomList(resp.data)
            })
        }
    }, [hotel, openAdd])

    function convertYesNo(bool) {
        if (bool === false) {
            return "无"
        } else return "有"
    }

    const theme = createTheme({
        typography: {
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 15
        },
        palette: {
            secondary: {
                main: '#fff'
            }
        }
    })

    return (

        <ThemeProvider theme={theme} >
            <NavBar />
                <Grid container spacing={2} columns={16} sx={{ padding: 1 }}>

                <Grid item xs={16} sm={3}>
                    <Paper elevation={false} sx={{padding: 2}}>
                        <Stack gap={2}>
                            <Typography variant="h5">筛选</Typography>
                            <Typography>
                                房间名
                            </Typography>
                            <TextField size="small" value={roomName} onChange={(event) => {
                                setRoomName(event.target.value);
                            }}>
                            </TextField>
                            <Typography>
                                价格
                            </Typography>
                            <Slider min={10} max={1000} valueLabelDisplay='on' value={priceRange}
                                    onChange={(event, newValue, activeThumb) => {
                                        if (activeThumb == 0) {
                                            setPriceRange([Math.min(newValue[0], priceRange[1] - minPriceDiff), priceRange[1]])
                                        } else {
                                            setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minPriceDiff)])
                                        }
                                    }}>
                            </Slider>
                            <Typography>
                                入住人数
                            </Typography>
                            <Slider min={1} max={5} valueLabelDisplay value={guestsNumber} marks={guestsNumberMarks}
                                    onChange={(event, newValue) => {
                                        setGuestNum(newValue);
                                    }}>
                            </Slider>
                            <FormGroup sx={{padding: 0}}>
                                <FormControlLabel control={<Checkbox checked={roomIntro[0]}
                                                                     onChange={(event) => setRoomIntro([event.target.checked, roomIntro[1], roomIntro[2]])}/>}
                                                  label="窗户"/>
                                <FormControlLabel control={<Checkbox checked={roomIntro[1]}
                                                                     onChange={(event) => setRoomIntro([roomIntro[0], event.target.checked, roomIntro[2]])}/>}
                                                  label="阳台"/>
                                <FormControlLabel control={<Checkbox checked={roomIntro[2]}
                                                                     onChange={(event) => setRoomIntro([roomIntro[0], roomIntro[1], event.target.checked])}/>}
                                                  label="洗衣房"/>
                            </FormGroup>
                            <Stack direction='row' justifyContent='space-between'>
                                <Button fullWidth onClick={() => setOpenAdd(false)}>取消</Button>
                                <Button fullWidth variant="contained" onClick={() => {
                                    handleAdd();
                                    setOpenAdd(false)
                                }}>提交</Button>

                            </Stack>
                        </Stack>

                    </Paper>

                </Grid>

                <Grid item xs={16} sm={13}>
                    <Stack
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        direction="row"
                        gap={2}
                        padding={1}
                    >
                        <div>
                            <Typography variant="h5">房型查询</Typography>
                        </div>
                        <FormControl variant="standard" sx={{width: '30%'}}>
                            <InputLabel>分店</InputLabel>
                            <Select value={hotel} label="分店" onChange={(e) => {
                                setHotel(e.target.value)
                            }}>
                                {hotel_list !== undefined && hotel_list.map((item) => (
                                    <MenuItem key={item.hotelid} value={item.hotelname}>{item.hotelname}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Grid container columns={12}>
                        {roomList != null ? (
                            roomList.map((item) => (
                                <Grid key={item.roomtypeid} item xs={12} md={6} lg={4} xl={4} padding={2}>
                                    <RoomCard hotelID={item.hotelid} hotelName={hotel} admin={false} roomName={item.roomname}
                                              roomInfo={item} roomTypeID={item.roomtypeid}
                                              imageUrl={roomImageUrl[item.roomtypeid % roomImageUrl.length]}></RoomCard>
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
        </ThemeProvider>
    );

}