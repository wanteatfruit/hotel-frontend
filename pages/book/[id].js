import Layout from "../../components/Layout";
import { CheckBox, ChevronLeftOutlined, ChevronRightRounded, IcecreamOutlined } from "@mui/icons-material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    Drawer,
    FormControl,
    Select,
    MenuItem,
    Box,
    Stack,
    TextField,
    Tabs,
    Button,
    Tab,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Slider,
    Autocomplete,
    Stepper,
    Step,
    StepLabel,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Rating,
    CardActionArea,
    CircularProgress
} from "@mui/material";
import { DatePicker, LocalizationProvider, zhCN } from "@mui/x-date-pickers";
import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from "next/router";
import { fontSize } from "@mui/system";
import handleIntroduction from "../../utils/utils";
import NavBar from "../../components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const steps = ['入住信息', '确认订单'];

export default function BookingPage({ }) {
    const router = useRouter()
    const hotelName = router.query.id
    const timerRef = React.useRef();
    const book_url = router.asPath.toString()
    const room_num = parseInt(book_url.substring(book_url.lastIndexOf('=') + 1))
    const [roomList, setRoomList] = React.useState(null)
    const [roomIntro, setRoomIntro] = React.useState([false, false, false])
    const [bookingCost, setBookingCost] = React.useState(0);
    const [roomTypeName, setRoomTypeName] = React.useState(null)
    const [selectedRoom, setSelectedRoom] = React.useState(0)
    const [loadingDialog, setLoadingDialog] = React.useState(false);
    const [roomNumber, setRoomNumber] = React.useState(101)
    const [bookingInfo, setBookingInfo] = React.useState({
        startDate: dayjs().startOf("day"),
        endDate: dayjs().startOf("day").add(7, 'day'),
        roomName: roomList !== null ? roomList[0].roomname : '',
        roomPrice: 0,
        hotelName: hotelName == null ? '' : hotelName.toString(),
        cost: 0,
        guestNum:2
    })
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
    const [query, setQuery] = React.useState('idle');

    //get roomtype by hotel
    React.useEffect(() => {
        if (router.isReady) {
            axios.get(`http://120.25.216.186:8888/roomtype/hotel?hotelName=${hotelName}`).then((resp) => {
                setRoomList(resp.data)
            })
            // console.log(roomList)

        }
    }, [router.isReady])
    React.useEffect(() => {
        setBookingInfo({ ...bookingInfo, hotelName: hotelName })
        if (roomList != null) {
            setRoomNumber(room_num);
            console.log(roomNumber)
            decideRoom()
            console.log(bookingInfo)
        }
    }, [roomList])
    const startDateRenderer=(date,selectedDates, pickerDayProps)=>{
        let validDates = []
        const today = dayjs().startOf('day')
        validDates.push(today)
        for (const key in emptyRooms) {
            if (Object.hasOwnProperty.call(emptyRooms, key)) {
                const element = emptyRooms[key];
                if(element==1){ // dont have room
                    const newDay = today.add(key,'days')
                    validDates.push(newDay)
                }
            }
        }
        if(validDates.includes(date)){
            return <PickersDay {...pickerDayProps} />
        }
        return <PickersDay disabled {...pickerDayProps} />

    }


    console.log(bookingInfo)

    const decideRoom = () => {
        if (roomNumber <= 206 && roomNumber >= 203) {
            setBookingInfo({ ...bookingInfo, roomName: roomList[0].roomname, roomPrice: roomList[0].price })
        }
        else if (roomNumber <= 202 && roomNumber >= 201) {
            setBookingInfo({ ...bookingInfo, roomName: roomList[1].roomname, roomPrice: roomList[1].price })
        }
        else if (roomNumber <= 309 && roomNumber >= 305) {
            setBookingInfo({ ...bookingInfo, roomName: roomList[0].roomname, roomPrice: roomList[0].price })
        }
        else if (roomNumber <= 304 && roomNumber >= 302) {
            setBookingInfo({ ...bookingInfo, roomName: roomList[1].roomname, roomPrice: roomList[1].price })
        }
        else if (roomNumber == 301) {
            setBookingInfo({ ...bookingInfo, roomName: roomList[2].roomname, roomPrice: roomList[2].price })
        }
        else if (roomNumber <= 414 && roomNumber >= 409) {
            setBookingInfo({ ...bookingInfo, roomName: roomList[0].roomname, roomPrice: roomList[0].price })
        }
        else if (roomNumber <= 408 && roomNumber >= 405) {
            setBookingInfo({ ...bookingInfo, roomName: roomList[1].roomname, roomPrice: roomList[1].price })
        }
        else if (roomNumber <= 404 && roomNumber >= 401) {
            setBookingInfo({ ...bookingInfo, roomName: roomList[2].roomname, roomPrice: roomList[2].price })
        }
        else {
            setBookingInfo({ ...bookingInfo, roomName: roomList[0].roomname, roomPrice: roomList[0].price })

        }
    }

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

        }
    })

    const [activeStep, setActiveStep] = React.useState(0);

    const calculateCost = () => {
        const days = bookingInfo.endDate.diff(bookingInfo.startDate, 'day')
        console.log(days)
        const pricePerDay = bookingInfo.roomPrice
        const cost1 = days * pricePerDay
        setBookingCost(cost1)
    }

    async function handleOrder() {
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
            hotelName: hotelName,
            cost: bookingCost,
            username: uname,
            location:roomNumber.toString()
        }

        const resp = await fetch('http://10.26.111.227:8888/orders/bookroom', {
            method: 'POST',
            body: JSON.stringify(orderInfo),
            headers: {
                'Content-type': 'application/json'
            }
        })
        let clone = resp.clone()
        console.log(clone)
    }

    return (
        <>

            <ThemeProvider theme={theme}>
            <Dialog open={loadingDialog} maxWidth='lg'  onClose={() => setLoadingDialog(false)} sx={{ zIndex: 100000001 }} >
                <DialogContent>
                    {query === 'success' ? (
                        <Typography>订房成功！</Typography>
                    ) : (<CircularProgress />)}

                </DialogContent>
                {query === 'success' &&
                    <Stack direction='row'>
                        <Button href={'/account-center/account-center'}>用户中心</Button>
                        <Button onClick={() => { setLoadingDialog(false); handleClickQuery() }}>确定</Button>
                    </Stack>}
            </Dialog>

                <NavBar />
                <Box sx={{ mt: '60px', }}>
                    <div style={{
                        backgroundImage: 'url("https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                        backgroundSize: 'cover',
                        height: '25vh',
                        display: 'flex',

                        alignItems: 'flex-end'
                    }}>

                        <IconButton href={`/hotels/${hotelName}`} sx={{ backgroundColor: 'white', margin: 2, padding: 1 }}>
                            <ChevronLeftOutlined fontSize="large"></ChevronLeftOutlined>
                        </IconButton>
                        <Typography variant="h2" sx={{ paddingBottom: 2, color: 'white' }}>{hotelName}</Typography>
                    </div>
                    <Stepper activeStep={activeStep} sx={{ padding: 2, paddingX: { xs: 1, sm: 4 } }}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>

                    {activeStep === 0 && (
                        <div>
                            <Stack gap={5} sx={{
                                paddingX: '10px',
                                paddingY: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                        <Stack mt={3} gap={0} alignItems='center' width={{xs:'90vw', md:'50vw'}}>
                            <Typography gutterBottom textAlign='start' variant='h6'>{`￥${bookingInfo.roomPrice}/晚`}</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={zhCN} >
                                <Stack mt={2} marginBottom={0} direction='row' gap={0} justifyContent='center' >
                                    <DatePicker
                                        label='入住日期'
                                        minDate={dayjs().startOf("day")}
                                        maxDate={dayjs().startOf('day').add(29,'days')}
                                        inputFormat="YYYY/MM/DD"
                                        value={bookingInfo.startDate}
                                        renderDay={startDateRenderer}
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
                                        maxDate={dayjs().startOf('day').add(30,'days')}
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

                                <Select placeholder="入住人数" sx={{ width: {xs:'90vw', md:'41.5vw'}, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 0, borderTopRightRadius: 0 }} value={bookingInfo.guestNum} onChange={(e) => setBookingInfo({ ...bookingInfo, guestNum: e.target.value })}>
                                    <MenuItem value={1}>1位</MenuItem>
                                    <MenuItem value={2}>2位</MenuItem>
                                    <MenuItem value={3}>3位</MenuItem>
                                    <MenuItem value={4}>4位</MenuItem>
                                    <MenuItem value={5}>5位</MenuItem>
                                </Select>
                            </FormControl>
                            {/* <Button onClick={()=>{
                                if( handleInvalidDate()==false){
                                    return
                                }
                                setConfirmDialog(true)
                                
                            }} color="secondary" fullWidth sx={{ borderRadius: 3, height: '50px', fontSize: '1.2rem', mt: 2, width: '25vw', backgroundImage: 'linear-gradient(90deg, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100% )', }}>立即预定</Button> */}
                            {<Typography variant="h6" sx={{ mt: 2,pb:2 }}>{`您选择了${roomNumber}号房间`}</Typography>}
                            {/* <Typography variant="h6" sx={{ mt: 2,pb:2 }}>{`合计 ￥${bookingCost}`}</Typography> */}

                        </Stack>

                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack direction='row' gap={2}>

                                        <DatePicker
                                            label="入住日期"
                                            minDate={dayjs().startOf("day")}
                                            inputFormat="YYYY/MM/DD"
                                            value={bookingInfo.startDate}
                                            onChange={(newDate) => {
                                                setBookingInfo({ ...bookingInfo, startDate: newDate })
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}

                                                    required
                                                    // inputProps={{readOnly:true}}
                                                    onKeyDown={(e) => e.preventDefault()}
                                                />
                                            )}
                                        >
                                        </DatePicker>
                                        <ChevronRightRounded fontSize='large' />
                                        <DatePicker
                                            label="离开日期"
                                            value={bookingInfo.endDate}
                                            minDate={bookingInfo.startDate.add(1, 'day')}
                                            inputFormat="YYYY/MM/DD"
                                            onChange={(newDate) => {
                                                setBookingInfo({ ...bookingInfo, endDate: newDate })
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    required
                                                    // inputProps={{readOnly:true}}
                                                    onKeyDown={(e) => e.preventDefault()}
                                                />
                                            )}>

                                        </DatePicker>
                                    </Stack>
                                </LocalizationProvider> */}

                            </Stack>

                            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end', padding: 4 }}>
                                <Button sx={{ width: '15vh', marginRight: 4 }} onClick={() => {
                                    setActiveStep(activeStep - 1)
                                }}>上一步</Button>
                                <Button sx={{ width: '15vh', marginRight: 4 }} variant="outlined" onClick={() => {
                                    setActiveStep(activeStep + 1); calculateCost()
                                }}>下一步</Button>
                            </div>
                        </div>
                    )}
                    {activeStep === 1 && (
                        <form onSubmit={handleOrder} >
                            <Grid container columns={6} spacing={2} padding={6}>
                                <Grid item xs={3} sm={2}>
                                    <Card sx={{ flexDirection: 'row' }}>
                                        <CardHeader title="入住酒店"></CardHeader>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {hotelName}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Card sx={{ flexDirection: 'row' }}>
                                        <CardHeader title="房间"></CardHeader>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {bookingInfo.roomName}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Card sx={{ flexDirection: 'row' }}>
                                        <CardHeader title="总费用"></CardHeader>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {bookingCost}
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Card sx={{ flexDirection: 'row' }}>
                                        <CardHeader title="入住时间"></CardHeader>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {bookingInfo.startDate.format('YYYY/MM/DD')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Card sx={{ flexDirection: 'row' }}>
                                        <CardHeader title="离店时间"></CardHeader>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {bookingInfo.endDate.format('YYYY/MM/DD')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                <Card sx={{ flexDirection: 'row' }}>
                                        <CardHeader title="房间号"></CardHeader>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {roomNumber}
                                            </Typography>
                                        </CardContent>
                                    </Card>
 
                                    {/* <Button type="submit" variant="contained" sx={{ width: '100%', height: '100%', fontSize: '2rem' }}>提交订单</Button> */}
                                </Grid>
                            </Grid>
                            <div style={{ display: 'flex', padding: 4, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" sx={{ width: '20vh', marginRight: 5, marginBottom: 4 }} onClick={() => {
                                    setActiveStep(activeStep - 1)
                                }}>上一步</Button>
                                <Button onClick={()=>{setLoadingDialog(true); handleOrder(); handleClickQuery()}} variant="contained" sx={{bgcolor:'linear-gradient(90deg, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100% )', width: '20vh', marginRight: 5, marginBottom: 4 }}>提交订单</Button>

                            </div>
                        </form>
                    )}
                </Box>
            </ThemeProvider>
        </>

    )
}