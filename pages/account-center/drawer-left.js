import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ChairIcon from '@mui/icons-material/Chair';
import { Drawer, Button, Divider } from "@mui/material";
import { HotelOutlined } from "@mui/icons-material";

const drawerWidth = 210;

function drawerItemChoose(index, text, setDrawerContent) {
    return (
        <>
            <ListItem key={text} alignItems="center" disablePadding>
                <ListItemButton onClick={() => setDrawerContent(index)}>
                    <ListItemIcon>
                        {getIcon(index)}
                    </ListItemIcon>
                    <ListItemText color='secondary' primary={text} />
                </ListItemButton>
            </ListItem>
        </>
    )
}

function getIcon(index) {
    switch (index) {
        case 0:
            return <AccountBalanceWalletIcon />;
        case 1:
            // setDrawerItem(index);
            return <ChairIcon />;
        case 2:
            // setDrawerItem(index);
            return <BookmarksIcon />;
        case 3:
            // setDrawerItem(index);
            return <LocalGroceryStoreIcon />;
    }
}


export default function DrawerLeft({ setDrawerItem }) {
    const drawer = (
        <>
            <div style={{ }}>
                <List>
                    {["账户", "订单", "收藏"].map((text, index) =>
                        drawerItemChoose(index, text, setDrawerItem)
                    )}
                </List>
            </div>
        </>
    );
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return (
        <>
            <Box sx={{ width: { sm: drawerWidth, flexShrink: { sm: 0 } },  }}>
                {/* <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    color='primary'
                    sx={{

                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: '#2E3B55'
                        },
                    }}
                >
                    {drawer}
                </Drawer> */}
                <Drawer
                    width={drawerWidth}
                    variant="permanent"
                    open

                    sx={{
                        backgroundColor: 'white',
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: 'white',
                            marginTop:'70px',
                            position:'absolute',
                            zIndex:1
                        },
                        // marginTop:10
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            {/* <Box sx={{ display: "flex", position: "relative"}}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    sx={{
                        position: "relative",
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                        zIndex: 0
                    }}
                >
                    <Box sx={{ overflow: "auto", position: "relative",  display: "flex", alignItems: "center", marginTop: "4em"}}>
                        <List>
                            {["账户", "订单", "收藏"].map((text, index) =>
                                drawerItemChoose(index, text, setDrawerItem)
                            )}
                        </List>
                    </Box>
                </Drawer>
            </Box> */}
        </>
    );
}