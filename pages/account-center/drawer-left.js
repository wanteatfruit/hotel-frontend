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
import {Drawer} from "@mui/material";

const drawerWidth = 240;

function drawerItemChoose(index, text, setDrawerContent) {
    return (
        <>
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setDrawerContent(index)}>
                    <ListItemIcon>
                        {getIcon(index)}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItemButton>
            </ListItem>
        </>
    )
}

function getIcon(index) {
    switch (index) {
        case 0:
            return <AccountBalanceWalletIcon/>;
        case 1:
            // setDrawerItem(index);
            return <ChairIcon/>;
        case 2:
            // setDrawerItem(index);
            return <BookmarksIcon/>;
        case 3:
            // setDrawerItem(index);
            return <LocalGroceryStoreIcon/>;
    }
}


export default function DrawerLeft({setDrawerItem}) {
    return (
        <>
            <Box sx={{ display: "flex", position: "relative"}}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    sx={{
                        position: "relative",
                        width: drawerWidth,
                        flexShrink: 0,
                        alignItems: "center",
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: "auto", position: "relative" }}>
                        <List>
                            {["账户", "订单", "收藏", "积分商城"].map((text, index) =>
                                drawerItemChoose(index, text, setDrawerItem)
                            )}
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </>
    );
}