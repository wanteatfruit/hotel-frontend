import Layout from "../../components/Layout";
import { CheckBox, ChevronLeftOutlined, ChevronRightRounded, IcecreamOutlined } from "@mui/icons-material";
import {
    Drawer,
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
    CardActionArea
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from "next/router";
import { fontSize } from "@mui/system";
import handleIntroduction from "../../utils/utils";
import NavBar from "../../components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const steps = ['选择房间', '入住信息', '确认订单'];

export default function BookingPage({ }) {
    const router = useRouter()
    const hotelName = router.query.id
    const [roomList, setRoomList] = React.useState(null)
    const [roomIntro, setRoomIntro] = React.useState([false, false, false])
    const [bookingCost, setBookingCost] = React.useState(0);
    const [roomTypeName, setRoomTypeName] = React.useState(null)
    //get roomtype by hotel
    React.useEffect(() => {
        if (router.isReady) {
            axios.get(`http://120.25.216.186:8888/roomtype/hotel?hotelName=${hotelName}`).then((resp) => {
                setRoomList(resp.data)
            })
            console.log(roomList)
            setBookingInfo
        }
    }, [router.isReady])


    const [selectedRoom, setSelectedRoom] = React.useState(0)
    const [bookingInfo, setBookingInfo] = React.useState({
        startDate: dayjs().startOf("day"),
        endDate: dayjs().startOf("day").add(7, 'day'),
        roomName: roomList !== null ? roomList[0].roomname : '',
        roomPrice: 0,
        hotelName: hotelName == null ? '' : hotelName.toString(),
        cost: 0
    })
    console.log(bookingInfo)

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
        <>
            <ThemeProvider theme={theme}>
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
                        <div style={{ paddingBottom: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <List sx={{}}>
                                {roomList !== null && roomList.map((item, index) => (
                                    <ListItem sx={{}} key={item.roomtypeid}>
                                        <ListItemButton selected={selectedRoom === index}
                                            onClick={() => {
                                                setSelectedRoom(index);
                                                setBookingInfo({
                                                    ...bookingInfo,
                                                    hotelName: hotelName,
                                                    roomName: item.roomname,
                                                    roomPrice: item.price
                                                });
                                            }}>
                                            <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '50%', paddingLeft: 0 }}>
                                                {/* <CardHeader title={item.roomname} /> */}
                                                <CardContent>
                                                    <Typography variant="h4">{item.roomname}</Typography>
                                                    {item.discount == 1 && <Typography variant="h6">{`${item.price}元 / 晚`}</Typography>}
                                                    {item.discount != 1 && <Stack direction='row'>
                                                        <Typography variant="h6" sx={{ textDecoration: 'line-through' }}>{`${item.price}元 / 晚`}</Typography>
                                                        <Typography variant="h6" sx={{ ml: 2 }}>{`${item.afterEventPrice}元 / 晚`}</Typography>
                                                    </Stack>}
                                                    {/* <Typography variant="h6">{item.discount==1? `${item.price}元 / 晚`:``}</Typography> */}
                                                </CardContent>
                                                <CardContent sx={{ display: { xs: 'none', sm: 'block' }, justifyContent: 'flex-end' }}>
                                                    <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                                                        <FormControlLabel control={<Checkbox readOnly
                                                            checked={handleIntroduction(item, 0)}></Checkbox>}
                                                            label="窗户" />
                                                        <FormControlLabel control={<Checkbox readOnly
                                                            checked={handleIntroduction(item, 1)}></Checkbox>}
                                                            label="阳台" />
                                                        <FormControlLabel control={<Checkbox readOnly
                                                            checked={handleIntroduction(item, 2)}></Checkbox>}
                                                            label="洗衣房" />
                                                    </FormGroup>
                                                </CardContent>
                                            </Card>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end', padding: 4 }}>
                                <Button sx={{ width: '15vh', marginRight: 4 }} href="/hotels">返回主页</Button>
                                <Button sx={{ width: '15vh', marginRight: 4 }} variant="outlined" disabled={bookingInfo.roomName === ''} onClick={() => {
                                    setActiveStep(activeStep + 1)
                                }}>下一步</Button>
                            </div>
                        </div>

                    )}
                    {activeStep === 1 && (
                        <div>
                            <Stack gap={5} sx={{
                                paddingX: '10px',
                                paddingY: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                </LocalizationProvider>
                                {/* <Stack paddingX={2} sx={{ width: {xs:'100%', sm:'50%'}}}>
                                    <Typography gutterBottom>入住人数</Typography>
                                    <Slider sx={{width:'80%'}} value={bookingInfo.guestsNumber}
                                        onChange={(event, newNumber) => setBookingInfo({
                                            ...bookingInfo,
                                            guestsNumber: newNumber
                                        })} valueLabelDisplay='auto' step={1} marks={guestsNumberMarks} min={1}
                                        max={5} />
                                </Stack> */}


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
                    {activeStep === 2 && (
                        <form onSubmit={handleOrder} >
                            <Grid container columns={6} spacing={2} padding={6}>
                                <Grid item xs={3} sm={2}>
                                    <Card sx={{ flexDirection: 'row' }}>
                                        <CardHeader title="入住酒店"></CardHeader>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {bookingInfo.hotelName}
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
                                    <Button type="submit" variant="contained" sx={{ width: '100%', height: '100%', fontSize: '2rem' }}>提交订单</Button>
                                </Grid>
                            </Grid>
                            <div style={{ display: 'flex', padding: 4, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" sx={{ width: '15vh', marginRight: 5, marginBottom: 4 }} onClick={() => {
                                    setActiveStep(activeStep - 1)
                                }}>上一步</Button>
                            </div>
                        </form>
                    )}
                </Box>
            </ThemeProvider>
        </>

    )
}