// import * as React from 'react';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import BookmarksIcon from '@mui/icons-material/Bookmarks';
// import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
// import ChairIcon from '@mui/icons-material/Chair';
// import {Drawer} from "@mui/material";
//
// const drawerWidth = 240;
//
// export default function DrawerLeft() {
//     return (
//         <Box sx={{display: 'flex'}}>
//             <CssBaseline/>
//             <Drawer
//                 variant="permanent"
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'}
//                 }}
//             >
//                 <Toolbar/>
//                 <Box sx={{overflow: 'auto'}}>
//                     <List>
//                         <ListItem key={"Account"} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     <AccountBalanceWalletIcon/>;
//                                 </ListItemIcon>
//                                 <ListItemText primary={"Account"}/>
//                             </ListItemButton>
//                         </ListItem>
//                         <ListItem key={"Orders"} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     <ChairIcon/>
//                                 </ListItemIcon>
//                                 <ListItemText primary={"Order"}/>
//                             </ListItemButton>
//                         </ListItem>
//                         <ListItem key={"Marks"} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     <BookmarksIcon/>
//                                 </ListItemIcon>
//                                 <ListItemText primary={"Marks"}/>
//                             </ListItemButton>
//                         </ListItem>
//                         <ListItem key={"Store"} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     <LocalGroceryStoreIcon/>
//                                 </ListItemIcon>
//                                 <ListItemText primary={"Store"}/>
//                             </ListItemButton>
//                         </ListItem>
//                     </List>
//                 </Box>
//             </Drawer>
//         </Box>
//     );
// }
