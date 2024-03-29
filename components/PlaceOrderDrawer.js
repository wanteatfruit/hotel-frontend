import { ChevronLeftOutlined, ChevronRightRounded, IcecreamOutlined } from "@mui/icons-material";
import { Dialog, DialogActions, Drawer, Box, Stack, TextField, Tabs, Button, Tab, Typography, List, ListItem, ListItemButton, ListItemText, IconButton, Slider, createTheme, ThemeProvider, Autocomplete, FormControl, InputLabel, Select, MenuItem, Grid, DialogTitle, DialogContent, Chip, CircularProgress, CardHeader } from "@mui/material";
import { DatePicker, LocalizationProvider, PickersDay, zhCN } from "@mui/x-date-pickers";
import React from "react";
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from 'react-modern-calendar-datepicker';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { branchHotels, roomImageUrl, roomTypes } from "../data";
import RoomCard from "./RoomCard";
import axios from "axios";
export default function PlaceOrder({ open, hotelName, roomInfo, children, onSale }) {
    const [selectDateOpen, setSelectDateOpen] = React.useState(false);
    const [bookingCity, setBookingCity] = React.useState(0);
    const [bookingCost, setBookingCost] = React.useState(0);
    const [loadingDialog, setLoadingDialog] = React.useState(false);
    const [confirmDialog, setConfirmDialog] = React.useState(false);
    const [emptyRooms, setEmptyRooms] = React.useState([])
    const [orderReply, setOrderReply] = React.useState('订房成功')
    const [query, setQuery] = React.useState('idle');
    const timerRef = React.useRef();
    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [],
    );

    const handleClickQuery = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (query !== 'idle') {
            setQuery('idle');
            return;
        }

        setQuery('progress');
        timerRef.current = window.setTimeout(() => {
            setQuery('success');
        }, 1000);
    };

    const [bookingInfo, setBookingInfo] = React.useState({
        startDate: dayjs().startOf("day").add(1, 'day'),
        endDate: dayjs().startOf("day").add(2, 'day'),
        roomName: roomInfo.roomname,
        roomPrice: roomInfo.price,
        roomID: roomInfo !== null ? roomInfo.roomtypeid : '',
        guestNum: 2,
        hotelName: hotelName == null ? '' : hotelName.toString(),
        roomNumber: '504'
    })
    const calculateCost = () => {
        const days = bookingInfo.endDate.diff(bookingInfo.startDate, 'day')
        console.log(days)
        const pricePerDay = bookingInfo.roomPrice
        const cost1 = days * pricePerDay
        setBookingCost(cost1)
    }

    const startDateRenderer = (date, selectedDates, pickerDayProps) => {
        let validDates = []
        const today = dayjs().startOf('day')
        validDates.push(today)
        for (const key in emptyRooms) {
            if (Object.hasOwnProperty.call(emptyRooms, key)) {
                const element = emptyRooms[key];
                if (element == 1) { // dont have room
                    const newDay = today.add(key, 'days')
                    validDates.push(newDay)
                }
            }
        }
        if (validDates.includes(date)) {
            return <PickersDay {...pickerDayProps} />
        }
        return <PickersDay disabled {...pickerDayProps} />

    }

    React.useEffect(() => {

        calculateCost()
        console.log(bookingInfo)
    }, [bookingInfo.startDate, bookingInfo.endDate])

    React.useEffect(() => {
        axios.get(`http://10.26.111.227:8888/roomtype/haveRoom?roomtypeid=${roomInfo.roomtypeid}`).then((resp) => {
            setEmptyRooms(resp.data)
        })
    }, [roomInfo.roomtypeid])
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

    function handleInvalidDate() {
        if (bookingCost < 0) {
            alert("请重新选择日期！")
            return false
        }
    }

     function handleOrder(event) {

        if (localStorage.getItem("isLoggedIn") === "false") {
            alert("请先登录！")
            return false
        }
        const uname = localStorage.getItem("username")
        const uid = localStorage.getItem("userID")
        axios.get(`http://10.26.111.227:8888/customer/getbyid?id=${uid}`).then((resp)=>{
            if(resp.data.money<bookingCost){
                alert("用户余额不足！")
                return false
            }
        })

        if (onSale) {
            const saleOrderInfo = {
                startDate: bookingInfo.startDate.format('YYYY-MM-DD HH:mm:ss'),
                endDate: bookingInfo.endDate.format('YYYY-MM-DD HH:mm:ss'),
                roomType: bookingInfo.roomName,
                hotelName: hotelName,
                cost: bookingCost,
                username: uname,
                roomtypeid: roomInfo.roomtypeid
            }
            fetch('http://10.26.111.227:8888/sec', {
                method: 'POST',
                body: JSON.stringify(saleOrderInfo),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((resp)=>{
                if(resp.status==201){
                    setOrderReply('您选择的日期已无空房，请重新选择日期')
                }
                else{
                    setOrderReply('预定成功！')
                }
            })

            return
        }
        const orderInfo = {
            startDate: bookingInfo.startDate.format('YYYY-MM-DD HH:mm:ss'),
            endDate: bookingInfo.endDate.format('YYYY-MM-DD HH:mm:ss'),
            roomType: bookingInfo.roomName,
            hotelName: hotelName,
            cost: bookingCost,
            username: uname
        }
        console.log(orderInfo)

        fetch('http://10.26.111.227:8888/orders/booking', {
            method: 'POST',
            body: JSON.stringify(orderInfo),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resp)=>{
            if(resp.status==201){
                setOrderReply('您选择的日期已无空房，请重新选择日期')
            }
            else{
                setOrderReply('预定成功！')
            }
        })

        return true;
        console.log(resp)
        // router.push("/account-center/account-center")
    }




    return (
        <ThemeProvider theme={theme}>
            <Dialog open={loadingDialog} maxWidth='md' onClose={() => setLoadingDialog(false)} sx={{ zIndex: 100000001 }} >
                <DialogContent sx={{ justifyContent: 'center', p: 8 }}>
                    {query === 'success' ? (
                        <Typography variant="h5">{orderReply}</Typography>
                    ) : (<CircularProgress />)}

                </DialogContent>
                {query === 'success' &&
                    <DialogActions>

                        <Button href={'/account-center/account-center'}>前往用户中心</Button>
                        <Button onClick={() => { setLoadingDialog(false); handleClickQuery() }}>确定</Button>

                    </DialogActions>}
            </Dialog>
            <Dialog open={confirmDialog} sx={{ zIndex: 100000000 }}>
                <DialogTitle>确定订单</DialogTitle>
                <DialogContent>
                    <Typography>入住时间：{bookingInfo.startDate.format('YYYY-MM-DD')}</Typography>
                    <Typography>离店时间：{bookingInfo.endDate.format('YYYY-MM-DD')}</Typography>
                    <Typography>￥{bookingCost} 将会从你的账户中扣除</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog(false)}>取消</Button>
                    <Button onClick={() => { setConfirmDialog(false); if (handleOrder() !== false) { handleClickQuery();  setLoadingDialog(true);} }}>确认订单</Button>
                </DialogActions>
            </Dialog>
            <Drawer id="select_city" anchor="right" open={open} sx={{ position: 'absolute', width: '80vw', zIndex: 1003 }}>
                <Box sx={{ width: { md: '77vw', xs: '100vw' } }}>
                    <Stack >
                        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/887723/pexels-photo-887723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundSize: 'cover', height: '30vh', display: 'flex', alignItems: 'flex-end' }}>
                            {children}
                        </div>
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={8} pl={2} pt={6} alignItems='center' justifyContent='space-evenly'>
                        <div style={{ marginTop: 10, maxWidth: { xs: '80vw', sm: '25vw' }, minWidth: { xs: '80vw', sm: '25vw' } }}>
                            <RoomCard imageUrl={roomImageUrl[roomInfo.roomtypeid]} hotelName={hotelName} roomInfo={roomInfo} />
                        </div>
                        <Stack mt={3} gap={0} alignItems='center' width={{ xs: '90vw', md: '25vw' }}>
                            <Typography gutterBottom textAlign='start' variant='h6'>{`￥${roomInfo.price}/晚`}</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={zhCN} >
                                <Stack mt={2} marginBottom={0} direction='row' gap={0} justifyContent='center' >
                                    <DatePicker
                                        label='入住日期'
                                        minDate={dayjs().startOf("day")}
                                        maxDate={dayjs().startOf('day').add(29, 'days')}
                                        inputFormat="YYYY/MM/DD"
                                        value={bookingInfo.startDate}
                                        disabled={onSale}
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
                                        maxDate={dayjs().startOf('day').add(30, 'days')}
                                        inputFormat="YYYY/MM/DD"
                                        disabled={onSale}
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

                                <Select placeholder="入住人数" sx={{ width: { xs: '90vw', md: '25vw' }, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 0, borderTopRightRadius: 0 }} value={bookingInfo.guestNum} onChange={(e) => setBookingInfo({ ...bookingInfo, guestNum: e.target.value })}>
                                    <MenuItem value={1}>1位</MenuItem>
                                    <MenuItem value={2}>2位</MenuItem>
                                    <MenuItem value={3}>3位</MenuItem>
                                    <MenuItem value={4}>4位</MenuItem>
                                    <MenuItem value={5}>5位</MenuItem>
                                </Select>
                            </FormControl>
                            <Button onClick={() => {
                                if (handleInvalidDate() !== false) {
                                    setConfirmDialog(true)
                                }

                            }} color="secondary" fullWidth sx={{ borderRadius: 3, height: '50px', fontSize: '1.2rem', mt: 2, width: '25vw', backgroundImage: 'linear-gradient(90deg, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100% )', }}>立即预定</Button>
                            {/* <Typography variant="h6" sx={{ mt: 2,pb:2 }}>{`合计 ￥${bookingCost}`}</Typography> */}

                        </Stack>

                    </Stack>
                </Box>
            </Drawer>
        </ThemeProvider>

    )
}