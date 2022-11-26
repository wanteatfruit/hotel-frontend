import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Avatar, Card, CardContent, CardHeader, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import axios from "axios"
import {useEffect, useState} from "react";
import { AccountCircleOutlined, Phone } from '@mui/icons-material';

const drawerWidth = 240;
styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
createTheme();
export default function Account({id}) {

    const [userInfo, setUserInfo] = useState({})

    async function getData() {
        await axios.get("http://120.25.216.186:8888/customer/getbyid", {params: {"id": id}}).then((response) => {
            setUserInfo(response.data);
        }).catch((error) => {
            console.log("userID: ", id)
        });
    }

    useEffect(() => {
        getData()
    }, [id]);


    function infoList() {
        return (
            <>
                <List disablePadding>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                            <AccountCircleOutlined />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={userInfo.name} secondary='姓名'></ListItemText>
                            {/* {getListItemContent("姓名", userInfo.name)} */}

                    </ListItem>
                    <Divider />
                    <ListItem>
                    <ListItemAvatar>
                            <Avatar>
                               <Phone ></Phone>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={userInfo.telephone} secondary='电话'></ListItemText>
                    </ListItem>
                </List>
            </>
        )
    }

    function Deposits() {
        function preventDefault(event) {
            event.preventDefault();
        }


        return (
            <React.Fragment>
                <Typography gutterBottom component="p" variant="h4">
                    ￥{userInfo.money}
                </Typography>
                    <Link
                        href={{
                            pathname: "/account-center/top-up",
                            query: {"userID": id}
                        }}
                        passHref
                    >
                        <Button variant="contained" color="secondary">充值</Button>
                    </Link>
            </React.Fragment>
        );
    }

    function Credits() {
        function preventDefault(event) {
            event.preventDefault();
        }

        return (
            <React.Fragment>
                <Typography gutterBottom component="p" variant="h4">
                    {userInfo.credits}
                </Typography>
                <div>
                    <Link
                        href={{
                            pathname: "/account-center/store",
                            query: {
                                "userID": id
                            }
                        }}
                        passHref
                    >
                        <Button variant="contained" color="secondary">积分商城</Button>
                    </Link>
                </div>
            </React.Fragment>
        );
    }

    function DashboardContent() {
        const [open, setOpen] = React.useState(true);
        // const [msg, setMsg]
        const toggleDrawer = () => {
            setOpen(!open);
        };

        return (
            <Container maxWidth="lg" sx={{mt: 8}}>
                <Grid container spacing={3}>
                    {/* Basic Info */}
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader  title='个人信息'></CardHeader>
                            <CardContent sx={{pt:0}}>
                                {infoList()}
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Deposits */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Card>
                            <CardHeader title='余额'></CardHeader>
                            <CardContent>
                                {Deposits()}
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Credits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Card>
                            <CardHeader title='积分' />
                            <CardContent>
                                {Credits()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }


    return <DashboardContent/>;
}