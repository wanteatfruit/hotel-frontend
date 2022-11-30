import { ChevronLeftOutlined, ChevronRightRounded, IcecreamOutlined } from "@mui/icons-material";
import { Drawer, Box, Stack, TextField, Tabs, Button, Tab, Typography, List, ListItem, ListItemButton, ListItemText, IconButton, Slider, createTheme, ThemeProvider, Autocomplete, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from 'react-modern-calendar-datepicker';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { branchHotels, roomImageUrl, roomTypes } from "../data";
import RoomCard from "./RoomCard";
export default function PlaceOrder({ open, hotelName, roomInfo, children }) {
    const [selectDateOpen, setSelectDateOpen] = React.useState(false);
    const [bookingCity, setBookingCity] = React.useState(0);
    const [bookingCost, setBookingCost] = React.useState(0);
    const [bookingInfo, setBookingInfo] = React.useState({
        startDate: dayjs().startOf("day"),
        endDate: dayjs().startOf("day").add(7, 'day'),
        roomName: roomInfo.roomname,
        roomPrice: roomInfo.price,
        roomID: roomInfo !== null ? roomInfo.roomtypeid : '',
        guestNum: 2,
        hotelName: hotelName == null ? '' : hotelName.toString(),
    })
    const calculateCost = () => {
        const days = bookingInfo.endDate.diff(bookingInfo.startDate, 'day')
        console.log(days)
        const pricePerDay = bookingInfo.roomPrice
        const cost1 = days * pricePerDay
        setBookingCost(cost1)
    }
    React.useEffect(() => {

        calculateCost()
        console.log(bookingInfo)
    }, [bookingInfo.startDate, bookingInfo.endDate])

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2E3B55'
            },
            secondary: {
                main: '#fff'
            }
        },
        typography: {
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14
        }
    })

    async function handleOrder(event) {
        event.preventDefault()
        if (localStorage.getItem("isLoggedIn") === "false") {
            alert("请先登录！")
            return
        }
        const uname = localStorage.getItem("username")
        const uid = localStorage.getItem("userID")
        const userInfo = await axios.get(`http://120.25.216.186:8888/customer/getbyid?id=${uid}`)
        if (userInfo.data.money < bookingCost) {
            alert("用户余额不足！")
            return
        }
        const orderInfo = {
            startDate: bookingInfo.startDate.format('YYYY-MM-DD HH:mm:ss'),
            endDate: bookingInfo.endDate.format('YYYY-MM-DD HH:mm:ss'),
            roomType: bookingInfo.roomName,
            hotelName: bookingInfo.hotelName,
            cost: bookingCost,
            username: uname
        }

        const resp = await fetch('http://120.25.216.186:8888/orders/booking', {
            method: 'POST',
            body: JSON.stringify(orderInfo),
            headers: {
                'Content-type': 'application/json'
            }
        })
        console.log(orderInfo)
        router.push("/account-center/account-center")
    }




    return (
        <ThemeProvider theme={theme}>
            <Drawer id="select_city" anchor="right" open={open} sx={{ position: 'absolute', width: '80vw' }}>
                <Box sx={{ width: { md: '77vw', xs: '100vw' } }}>
                    <Stack >
                        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/887723/pexels-photo-887723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundSize: 'cover', height: '30vh', display: 'flex', alignItems: 'flex-end' }}>
                            {children}
                        </div>
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={8} pl={4} pt={4} alignItems='center' justifyContent='center'>
                        {/* <div style={{ width: { xs: '90vw', md: '25vw' }, marginTop: 10 }}> */}
                            <RoomCard imageUrl={roomImageUrl[roomInfo.roomtypeid]} hotelName={hotelName} roomInfo={roomInfo} />
                        {/* </div> */}
                        <Stack mt={3} gap={0} alignItems='center' width={{xs:'90vw', md:'25vw'}}>
                            <Typography gutterBottom textAlign='start' variant='h6'>{`￥${roomInfo.price}/晚`}</Typography>

                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack mt={2} marginBottom={0} direction='row' gap={0} justifyContent='center' >

                                    <DatePicker

                                        label='入住日期'
                                        minDate={dayjs().startOf("day")}
                                        inputFormat="YYYY/MM/DD"
                                        value={bookingInfo.startDate}
                                        onChange={(newDate) => {
                                            setBookingInfo({ ...bookingInfo, startDate: newDate })
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <TextField
                                                label="入住日期"

                                                {...inputProps}
                                                ref={inputRef}
                                                InputProps={{ sx: { mb: 0, borderTopLeftRadius: 15, borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightStyle: 'none' }, endAdornment: InputProps.endAdornment }}

                                                required
                                                margin="none"
                                                onKeyDown={(e) => e.preventDefault()}
                                            />
                                        )}
                                    >
                                    </DatePicker>
                                    <DatePicker
                                        label="离开日期"
                                        value={bookingInfo.endDate}
                                        minDate={bookingInfo.startDate.add(1, 'day')}
                                        inputFormat="YYYY/MM/DD"
                                        onChange={(newDate) => {
                                            setBookingInfo({ ...bookingInfo, endDate: newDate })
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <TextField
                                                {...inputProps}
                                                label='离开日期'
                                                ref={inputRef}
                                                InputProps={{ sx: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 15, borderBottomRightRadius: 0, borderLeftColor: '#fff' }, endAdornment: InputProps.endAdornment }}
                                                placeholder='离开日期'
                                                required

                                                onKeyDown={(e) => e.preventDefault()}
                                            />
                                        )}
                                    >
                                    </DatePicker>
                                </Stack>
                            </LocalizationProvider>
                            <FormControl>

                                <Select placeholder="入住人数" sx={{ width: {xs:'90vw', md:'25vw'}, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 0, borderTopRightRadius: 0 }} value={bookingInfo.guestNum} onChange={(e) => setBookingInfo({ ...bookingInfo, guestNum: e.target.value })}>
                                    <MenuItem value={1}>1位</MenuItem>
                                    <MenuItem value={2}>2位</MenuItem>
                                    <MenuItem value={3}>3位</MenuItem>
                                    <MenuItem value={4}>4位</MenuItem>
                                    <MenuItem value={5}>5位</MenuItem>
                                </Select>
                            </FormControl>
                            <Button color="secondary" fullWidth sx={{ borderRadius: 3, height: '50px', fontSize: '1.2rem', mt: 2, width: '25vw', backgroundImage: 'linear-gradient(90deg, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100% )', }}>立即预定</Button>
                            <Typography variant="h6" sx={{ mt: 2,pb:2 }}>{`合计 ￥${bookingCost}`}</Typography>

                        </Stack>

                    </Stack>
                </Box>
            </Drawer>
        </ThemeProvider>

    )
}