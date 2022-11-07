import Layout from "../../components/Layout";
import { ChevronLeftOutlined, ChevronRightRounded, IcecreamOutlined } from "@mui/icons-material";
import { Drawer, Box, Stack, TextField, Tabs, Button, Tab, Typography, List, ListItem, ListItemButton, ListItemText, IconButton, Slider, createTheme, ThemeProvider, Autocomplete, Stepper, Step, StepLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export async function getStaticProps() {
    const hotel_response = await axios.get('http://10.26.133.163:8888/hotel/getAll');
    const hotel_list = hotel_response.data
    const room_respose = await axios.get('http://10.26.133.163:8888/roomtype/getAll');
    const room_list = room_respose.data
    return {
        props: {
            hotel_list, room_list
        },
        revalidate: 10
    }
}

const steps = ['选择房间', '入住信息', '确认订单'];

export default function BookingPage({ hotel_list, room_list }) {
    const [bookingCity, setBookingCity] = React.useState(0);
    console.log(hotel_list)

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


    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <List>
                            {hotel_list !== undefined &&
                                (hotel_list.filter((item) => {
                                    return (item.cityname === city_list[index])
                                }).map((item) => (
                                    <ListItem key={item.id} disablePadding>
                                        <ListItemButton href={`/book/${item.hotelname}`}>
                                            <ListItemText>
                                                {item.hotelname}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>)
                                ))}
                        </List>
                    </Box>
                )}
            </div>
        );
    }

    function allyProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

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
            <Box sx={{}}>
                <Stack>
                    <div style={{ backgroundImage:'url("https://images.pexels.com/photos/887723/pexels-photo-887723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', height: '20vh', display: 'flex', alignItems: 'flex-end' }}>

                    </div>
                    <Tabs value={bookingCity} onChange={(event, newValue) => setBookingCity(newValue)}>
                        <Tab label="深圳"{...allyProps(0)} ></Tab>
                        <Tab label="广州"{...allyProps(1)}></Tab>
                        <Tab label="上海"{...allyProps(2)}></Tab>
                        <Tab label="重庆"{...allyProps(3)}></Tab>

                    </Tabs>
                    <TabPanel value={bookingCity} index={0}>
                        深圳
                    </TabPanel>
                    <TabPanel value={bookingCity} index={1}>
                        广州
                    </TabPanel>
                    <TabPanel value={bookingCity} index={2}>
                        上海
                    </TabPanel>
                    <TabPanel value={bookingCity} index={3}>
                        重庆
                    </TabPanel>
                </Stack>
            </Box>


        </Layout>
    )
}