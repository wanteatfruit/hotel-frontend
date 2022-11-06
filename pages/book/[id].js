import Layout from "../../components/Layout";
import { ChevronLeftOutlined, ChevronRightRounded, IcecreamOutlined } from "@mui/icons-material";
import { Drawer, Box, Stack, TextField, Tabs, Button, Tab, Typography, List, ListItem, ListItemButton, ListItemText, IconButton, Slider, createTheme, ThemeProvider, Autocomplete, Stepper, Step, StepLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from "next/router";


const steps = ['选择房间', '入住信息', '确认订单'];

export default function BookingPage({ }) {
    const router = useRouter()
    const hotelName = router.query.id
    const [roomList, setRoomList] = React.useState(null)
    //get roomtype by hotel
    React.useEffect(() => {
        axios.get("http://10.26.133.163:8888/roomtype/getAll").then((resp) => {
            setRoomList(resp.data)
        })

    }, [])

    console.log(roomList)


    const [selectedRoom, setSelectedRoom] = React.useState(1)
    const [bookingInfo, setBookingInfo] = React.useState({
        startDate: dayjs().startOf("day"),
        endDate: dayjs().startOf("day").add(7, 'day'),
        roomType: '',
        hotelName: hotelName,
        guestsNumber: 2,
        cost: 0
    })
    // console.log(bookingInfo)

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2E3B55'
            },
            secondary: {
                main: '#fff'
            }
        }
    })

    const city_list = ['深圳', '广州', '上海', '重庆'];



    const guestsNumberMarks = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },

    ]

    const [activeStep, setActiveStep] = React.useState(0);

    return (
        <Layout>
            <Box>
                <div style={{ backgroundColor: '#2E3B55', height: '20vh', display: 'flex', alignItems: 'flex-end' }}>
                    <IconButton href="/book">
                        <ChevronLeftOutlined color="secondary" fontSize="large"></ChevronLeftOutlined>
                    </IconButton>
                </div>
                <Stepper activeStep={activeStep} sx={{ padding: 4 }}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                {activeStep === 0 && (
                    <div>
                        <List sx={{ paddingLeft: 4 }}>
                            {roomList !== null && roomList.map((item, index) => (
                                <ListItem key={item.roomtypeid} disablePadding>
                                    <ListItemButton selected={selectedRoom === index} onClick={() => { setSelectedRoom(index); setBookingInfo({ ...bookingInfo, roomType: item.roomtypeid }); console.log(bookingInfo) }}>
                                        <ListItemText>
                                            {item.roomname}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Button onClick={() => { setActiveStep(activeStep - 1) }} disabled>上一步</Button>
                        <Button onClick={() => { setActiveStep(activeStep + 1) }}>下一步</Button>
                    </div>

                )}
                {activeStep === 1 && (
                    <div>
                        <Button onClick={() => { setActiveStep(activeStep - 1) }}>上一步</Button>
                        <Button onClick={() => { setActiveStep(activeStep + 1) }}>下一步</Button>
                    </div>
                )}
                {activeStep === 2 && (
                    <div>
                        <Button onClick={() => { setActiveStep(activeStep - 1) }}>上一步</Button>
                        <Button onClick={() => { setActiveStep(activeStep + 1) }} disabled>下一步</Button>
                    </div>
                )}

            </Box>

        </Layout>
    )
}