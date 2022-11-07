import { ChevronLeftOutlined, ChevronRightRounded, IcecreamOutlined } from "@mui/icons-material";
import { Drawer, Box, Stack, TextField, Tabs, Button, Tab, Typography, List, ListItem, ListItemButton, ListItemText, IconButton, Slider, createTheme, ThemeProvider, Autocomplete } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { branchHotels, roomTypes } from "../data";
export default function BookingDrawer({ open, hotel_list, room_list, children }) {
    const [selectDateOpen, setSelectDateOpen] = React.useState(false);
    const [bookingCity, setBookingCity] = React.useState(0);
    console.log(hotel_list)

    const [bookingInfo, setBookingInfo] = React.useState({
        startDate: dayjs().startOf("day"),
        endDate: dayjs().startOf("day").add(7, 'day'),
        roomType: '',
        hotelName: '',
        guestsNumber: 2,
        cost: 0
    })

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2E3B55'
            },
            secondary:{
                main: '#fff'
            }
        }
    })

    const city_list = ['深圳', '广州', '上海', '重庆'];


    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        console.log(hotel_list)
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
                            { hotel_list!==undefined &&
                                (hotel_list.filter((item) => {
                                    console.log(item);
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



    return (
        <ThemeProvider theme={theme}>
            <Drawer id="select_city" anchor="right" open={open} sx={{ position: 'absolute', width: '70vw' }}>
                {/* <Button onClick={()=>open=false}>asdad</Button> */}
                <Box sx={{ width: '70vw' }}>
                    <Stack>
                        <div style={{ backgroundImage:'url("https://images.pexels.com/photos/887723/pexels-photo-887723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',backgroundSize:'cover', height: '40vh', display: 'flex', alignItems: 'flex-end' }}>
                            {children}
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
            </Drawer>
            {/* 订房，选择日期界面 */}
            <Drawer id="select_date" anchor="right" open={selectDateOpen} sx={{ position: 'absolute', width: '70vw' }}>
                <Box sx={{ width: '70vw', }}>
                    <Stack>
                        {/* 这个div里放背景图+酒店信息*/}
                        <div style={{ backgroundColor: 'darkgray', height: '33vh', display: 'flex', alignItems: 'flex-end' }}>
                            <IconButton onClick={() => setSelectDateOpen(false)}>
                                <ChevronLeftOutlined />
                            </IconButton>
                            <Typography variant="h3">{bookingInfo.hotelName}</Typography>

                        </div>
                        <Stack component='form' gap={5} sx={{ paddingX: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack direction='row' gap={5}>

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
                            <Stack sx={{ width: '50%' }}>
                                <Typography gutterBottom>入住人数</Typography>
                                <Slider sx={{}} value={bookingInfo.guestsNumber} onChange={(event, newNumber) => setBookingInfo({ ...bookingInfo, guestsNumber: newNumber })} valueLabelDisplay='auto' step={1} marks={guestsNumberMarks} min={1} max={5} />
                            </Stack>
                            <List>
                                {roomTypes.map((item) => (
                                    <ListItem key={item.id} disablePadding>
                                        <ListItemButton>
                                            <ListItemText>
                                                {item.hotelname}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>



                            <Button type='submit'>确认入住信息</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Drawer>
        </ThemeProvider>

    )
}