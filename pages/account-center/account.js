import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ListItem} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import axios from "axios"
import {useEffect, useState} from "react";

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

    function getListItemContent(name, value) {
        return (
            <>
                <Grid xs={3}>
                    <Typography sx={{color: "#696969"}}> {name} </Typography>
                </Grid>
                <Grid xs={7}>
                    <Typography sx={{fontWeight: 'bold', fontStyle: 'italic', fontSize: 30}}>{value}</Typography>
                </Grid>
            </>
        )
    }

    function infoList() {
        const gapHeight = 4;
        return (
            <>
                <List>
                    <ListItem>
                        <Grid container>
                            {getListItemContent("姓名", userInfo.name)}
                        </Grid>
                    </ListItem>
                    <Divider sx={{my: gapHeight}}/>
                    <ListItem>
                        <Grid container>
                            {getListItemContent("电话", userInfo.telephone)}
                        </Grid>
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
                <h1>余额</h1>
                <Typography component="p" variant="h4">
                    ￥{userInfo.money}
                </Typography>
                <Typography color="text.secondary" sx={{flex: 1}}>
                    on 15 March, 2019
                </Typography>
                <div>
                    <Link
                        href={{
                            pathname: "/account-center/top-up",
                            query: {"userID": id}
                        }}
                        passHref
                    >
                        <Button variant="contained" color="secondary">充值</Button>
                    </Link>
                </div>
            </React.Fragment>
        );
    }

    function Credits() {
        function preventDefault(event) {
            event.preventDefault();
        }

        return (
            <React.Fragment>
                <h1>积分</h1>
                <Typography component="p" variant="h4">
                    {userInfo.credits}
                </Typography>
                <br/>
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
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    {/* Basic Info */}
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            {infoList()}
                        </Paper>
                    </Grid>
                    {/* Deposits */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            {Deposits()}
                        </Paper>
                    </Grid>
                    {/* Credits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            {Credits()}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }


    return <DashboardContent/>;
}