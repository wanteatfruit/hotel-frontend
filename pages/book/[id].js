import Layout from "../../components/Layout";
import {CheckBox, ChevronLeftOutlined, ChevronRightRounded, IcecreamOutlined} from "@mui/icons-material";
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
    createTheme,
    ThemeProvider,
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
    Rating
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useRouter} from "next/router";
import {fontSize} from "@mui/system";
import handleIntroduction from "../../utils/utils";
import FloorPlan from "../hotels/floor-plan-a";
import FloorPlanA from "../hotels/floor-plan-a";
import FloorPlanB from "../hotels/floor-plan-b";
import FloorPlanC from "../hotels/floor-plan-c";


const steps = ['选择房间', '入住信息', '确认订单'];

export default function BookingPage({}) {
    const router = useRouter()
    const hotelName = router.query.id
    const [roomList, setRoomList] = React.useState(null)
    const [roomIntro, setRoomIntro] = React.useState([false, false, false])

    const [roomTypeName, setRoomTypeName] = React.useState(null)
    //get roomtype by hotel
    React.useEffect(() => {
        axios.get("http://120.25.216.186:8888/roomtype/getAll").then((resp) => {
            setRoomList(resp.data)
        })

    }, [])


    const [selectedRoom, setSelectedRoom] = React.useState()
    const [bookingInfo, setBookingInfo] = React.useState({
        startDate: dayjs().startOf("day"),
        endDate: dayjs().startOf("day").add(7, 'day'),
        roomType: 0,
        hotelName: hotelName == null ? '' : hotelName.toString(),
        guestsNumber: 2,
        cost: 0
    })
    console.log(bookingInfo)


    console.log(roomList)

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


    const city_list = ['深圳', '广州', '上海', '重庆'];


    const guestsNumberMarks = [
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
        {value: 4, label: '4'},
        {value: 5, label: '5'},

    ]

    const [activeStep, setActiveStep] = React.useState(0);

    const calculateCost = () => {
        const days = bookingInfo.endDate.diff(bookingInfo.startDate, 'day')
        console.log(days)
        const pricePerDay = roomList[bookingInfo.roomType].price
        return days * pricePerDay
    }

    return (

        <Layout>
            <ThemeProvider theme={theme}>
                <Box>
                    <div style={{
                        backgroundImage: 'url("https://images.pexels.com/photos/1833306/pexels-photo-1833306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                        backgroundSize: 'cover',
                        height: '30vh',
                        display: 'flex',
                        alignItems: 'flex-end'
                    }}>

                        <IconButton href="/hotels" sx={{backgroundColor: 'white', margin: 2, padding: 1}}>
                            <ChevronLeftOutlined fontSize="large"></ChevronLeftOutlined>
                        </IconButton>
                        <Typography variant="h2" sx={{paddingBottom: 2, color: 'white'}}>{hotelName}</Typography>
                    </div>
                    <Stepper activeStep={activeStep} sx={{padding: 2, paddingX: 8}}>
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
                            <List sx={{paddingLeft: 4}}>
                                {roomList !== null && roomList.map((item, index) => (
                                    <ListItem key={item.roomtypeid}>
                                        <ListItemButton disabled={item.remain <= 0} selected={selectedRoom === index}
                                                        onClick={() => {
                                                            setSelectedRoom(index);
                                                            setBookingInfo({
                                                                ...bookingInfo,
                                                                roomType: item.roomtypeid,
                                                                hotelName: hotelName
                                                            });
                                                        }}>
                                            <Card variant="outlined" sx={{display: 'flex', width: '100%'}}>
                                                {/* <CardHeader title={item.roomname} /> */}
                                                <CardContent>
                                                    <Typography variant="h4">{item.roomname}</Typography>
                                                    <Typography>{`每晚 ${item.price}RMB`}</Typography>
                                                </CardContent>
                                                <CardContent>
                                                    <FormGroup sx={{display: 'flex', flexDirection: 'row'}}>
                                                        <FormControlLabel control={<Checkbox readOnly
                                                                                             checked={handleIntroduction(item, 0)}></Checkbox>}
                                                                          label="窗户"/>
                                                        <FormControlLabel control={<Checkbox readOnly
                                                                                             checked={handleIntroduction(item, 1)}></Checkbox>}
                                                                          label="阳台"/>
                                                        <FormControlLabel control={<Checkbox readOnly
                                                                                             checked={handleIntroduction(item, 2)}></Checkbox>}
                                                                          label="洗衣房"/>
                                                    </FormGroup>
                                                    <Rating value={5} readOnly></Rating>
                                                </CardContent>
                                            </Card>
                                            {/* <ListItemText>
                                                {item.roomname}
                                                <br></br>
                                                {item.price}RMB
                                                <br></br>
                                                {item.remain}
                                            </ListItemText> */}
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <div style={{display: 'flex', justifyContent: 'center', padding: 4, marginTop: "3em"}}>
                                <FloorPlanA href1={"https://wcvanvan.github.io"}
                                           href2={"https://jessean-j35ux8sgw-wanteatfruit.vercel.app/"}/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', padding: 4, marginTop: "3em"}}>
                                <FloorPlanB href1={"https://wcvanvan.github.io"}
                                            href2={"https://jessean-j35ux8sgw-wanteatfruit.vercel.app/"}/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', padding: 4, marginTop: "3em"}}>
                                <FloorPlanC href1={"https://wcvanvan.github.io"}
                                            href2={"https://jessean-j35ux8sgw-wanteatfruit.vercel.app/"}/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-end', padding: 4}}>
                                <Button size="large" style={{marginRight: 2}} href="/hotels">返回主页</Button>
                                <Button variant="contained" onClick={() => {
                                    setActiveStep(activeStep + 1)
                                }}>下一步</Button>
                            </div>
                        </div>

                    )}
                    {activeStep === 1 && (
                        <div>
                            <Stack gap={5} sx={{
                                paddingX: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack direction='row' gap={5}>

                                        <DatePicker
                                            label="入住日期"
                                            minDate={dayjs().startOf("day")}
                                            inputFormat="YYYY/MM/DD"
                                            value={bookingInfo.startDate}
                                            onChange={(newDate) => {
                                                setBookingInfo({...bookingInfo, startDate: newDate})
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
                                        <ChevronRightRounded fontSize='large'/>
                                        <DatePicker
                                            label="离开日期"
                                            value={bookingInfo.endDate}
                                            minDate={bookingInfo.startDate.add(1, 'day')}
                                            inputFormat="YYYY/MM/DD"
                                            onChange={(newDate) => {
                                                setBookingInfo({...bookingInfo, endDate: newDate})
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
                                <Stack sx={{width: '50%'}}>
                                    <Typography gutterBottom>入住人数</Typography>
                                    <Slider sx={{}} value={bookingInfo.guestsNumber}
                                            onChange={(event, newNumber) => setBookingInfo({
                                                ...bookingInfo,
                                                guestsNumber: newNumber
                                            })} valueLabelDisplay='auto' step={1} marks={guestsNumberMarks} min={1}
                                            max={5}/>
                                </Stack>


                            </Stack>

                            <div style={{display: 'flex', justifyContent: 'flex-end', padding: 4}}>
                                <Button style={{marginRight: 2}} onClick={() => {
                                    setActiveStep(activeStep - 1)
                                }}>上一步</Button>
                                <Button variant="contained" onClick={() => {
                                    setActiveStep(activeStep + 1)
                                }}>下一步</Button>
                            </div>
                        </div>
                    )}
                    {activeStep === 2 && (
                        <div>
                            <Grid container>
                                <Grid item>
                                    <Card sx={{flexDirection: 'row'}}>
                                        <CardHeader title="入住酒店"></CardHeader>
                                        <CardContent>{bookingInfo.hotelName}</CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card sx={{flexDirection: 'row'}}>
                                        <CardHeader title="房间"></CardHeader>
                                        <CardContent>{roomList[bookingInfo.roomType].roomname}</CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card sx={{flexDirection: 'row'}}>
                                        <CardHeader title="入住时间"></CardHeader>
                                        <CardContent>{bookingInfo.startDate.format('YYYY/MM/DD')}</CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card sx={{flexDirection: 'row'}}>
                                        <CardHeader title="离店时间"></CardHeader>
                                        <CardContent>{bookingInfo.endDate.format('YYYY/MM/DD')}</CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card sx={{flexDirection: 'row'}}>
                                        <CardHeader title="总费用"></CardHeader>
                                        <CardContent>{calculateCost()}</CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <div style={{display: 'flex', justifyContent: 'flex-end', padding: 4}}>
                                <Button style={{marginRight: 2}} onClick={() => {
                                    setActiveStep(activeStep - 1)
                                }}>上一步</Button>
                                <Button variant="contained" onClick={() => {
                                }}>提交订单</Button>
                            </div>
                        </div>
                    )}
                </Box>
            </ThemeProvider>
        </Layout>

    )
}