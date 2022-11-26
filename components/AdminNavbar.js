import {
    AppBar,
    Box,
    Button,
    createTheme,
    CssBaseline, Dialog, DialogContent,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ThemeProvider,
    Toolbar, Tooltip,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import {useRouter} from "next/router";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {grey, blue} from "@mui/material/colors";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {HotelOutlined} from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import Grid from "@mui/material/Grid";

export default function AdminNavBar({}) {
    const drawerWidth = 210;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [chatDialogOpen, setChatDialogOpen] = useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    function handleJump(index) {
        switch (index) {
            case 0:
                return "/admin/dashboard";
            case 1:
                return "/admin/orders";
            case 2:
                return "/admin/rooms";
        }
    }

    function ChatDialog() {
        return (
            <>
                <Dialog
                    open={chatDialogOpen}
                    onClose={() => {
                        setChatDialogOpen(false)
                    }}
                    PaperProps={{
                        sx: {
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            maxWidth: "md",
                            backgroundColor: "#f1cec2"
                        }
                    }}
                >
                    <DialogContent>
                        <iframe id={"chat-frame"} src={"/admin-chat-app.html"} height="95%" width="100%"
                                frameBorder="0"></iframe>
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    const drawer = (
        <div>
            <Toolbar>
                <Button href="/" fullWidth size="large" variant="outlined" color="secondary"
                        startIcon={<HotelOutlined fontSize="24px"/>}>
                    首页
                </Button>
            </Toolbar>
            <Divider/>
            <List>
                {["数据面板", "订单信息", "房间信息", "促销活动"].map((text, index) => (
                    <ListItem key={text} sx={{}} disablePadding alignItems="center">
                        <ListItemButton href={handleJump(index)}>
                            {index == 0 && <DashboardIcon color="secondary"/>}
                            {index == 1 && <FormatListBulletedIcon color="secondary"/>}
                            {index == 2 && <MeetingRoomIcon color="secondary"/>}
                            {index == 3 && <LocalOfferIcon color="secondary"/>}
                            <ListItemText sx={{paddingLeft: '10px', color: 'whitesmoke'}} primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const theme = createTheme({
        palette: {
            primary: {
                main: blue['A400']
            },
            secondary: {
                main: '#fff'
            }
        },
        typography: {
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 14,
            h2: {
                fontWeight: 500
            }
        },
    })
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <AppBar position="fixed" sx={{}} color='secondary'>
                    <Toolbar sx={{display: "flex", justifyContent: "flex-end"}}>
                        {/*<IconButton color="inherit" onClick={handleDrawerToggle}>*/}
                        {/*    <MenuIcon/>*/}
                        {/*</IconButton>*/}
                        <Tooltip title="Chat Room">
                            <IconButton onClick={() => {
                                setChatDialogOpen(true)
                            }} color="inherit">
                                <ChatIcon/>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                    {/*<Grid sx={{display: "flex", justifyContent: "flex-end"}}>*/}
                    {/*    */}
                    {/*</Grid>*/}
                </AppBar>
                <Box sx={{width: {sm: drawerWidth, flexShrink: {sm: 0}}}}>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{keepMounted: true}}
                        color='primary'
                        sx={{

                            display: {xs: "block", sm: "none"},
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                backgroundColor: '#2E3B55'
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        width={drawerWidth}
                        variant="permanent"
                        open

                        sx={{
                            backgroundColor: 'cyan',
                            display: {xs: "none", sm: "block"},
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                backgroundColor: '#2E3B55'
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <div>{ChatDialog()}</div>
            </Box>
        </ThemeProvider>
    );
}
