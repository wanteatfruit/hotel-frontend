import { Drawer, Box, Stack, TextField, Tabs, Button, Tab, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { branchHotels } from "../data";
export default function BookingDrawer({ open, close }) {


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
                            {branchHotels.map((item) => (
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => setBookingOpen(open)}>
                                        <ListItemText>
                                            {item.name}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
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

    const [bookingOpen, setBookingOpen] = React.useState(false);
    const [bookingCity, setBookingCity] = React.useState(0);

    return (
        <React.Fragment>
            <Drawer id="select_city" anchor="right" open={open} sx={{ position: 'absolute', width: '70vw' }}>
                {/* <Button onClick={()=>open=false}>asdad</Button> */}
                <Box sx={{ width: '70vw' }}>
                    <Stack>
                        <div style={{ backgroundColor: 'chocolate', height: '20vh', display: 'flex', alignItems: 'flex-end' }}>
                            <TextField variant="standard" label="搜索目的地" sx={{ marginX: '100px', paddingBottom: '10px', width: '100%' }}></TextField>
                        </div>
                        <Tabs value={bookingCity} onChange={(event, newValue) => setBookingCity(newValue)}>
                            <Tab label="深圳"{...allyProps(0)} ></Tab>
                            <Tab label="广州"{...allyProps(1)}></Tab>
                        </Tabs>
                        <TabPanel value={bookingCity} index={0}>
                            深圳
                        </TabPanel>
                        <TabPanel value={bookingCity} index={1}>
                            广州
                        </TabPanel>

                    </Stack>
                </Box>
            </Drawer>
            <Drawer id="select_date" anchor="right" open={bookingOpen} sx={{ position: 'absolute', width: '70vw' }}>
                {/* <Button onClick={()=>open=false}>asdad</Button> */}
                <Box sx={{ width: '70vw' }}>
                    <Stack>
                        <div style={{ backgroundColor: 'darkgray', height: '20vh', display: 'flex', alignItems: 'flex-end' }}>

                        </div>
                    </Stack>
                </Box>
            </Drawer>
        </React.Fragment>

    )
}