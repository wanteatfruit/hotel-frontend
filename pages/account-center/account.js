import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {Card, Divider} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

function getUserInfo() {
    let name = "wc";
    let id = 1;
    let balance = 500;
    let telephone = 100;
    let points = 1000;
    return {name, id, balance, telephone, points};
}

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

export default function Account() {
    const gapHeight = 4;
    let userInfo = getUserInfo();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
                    <List>
                        <ListItem>
                            <Grid container>
                                {getListItemContent("姓名", userInfo.name)}
                            </Grid>
                        </ListItem>
                        <Divider sx={{my: gapHeight}}/>
                        <ListItem>
                            <Grid container>
                                {getListItemContent("ID", userInfo.id)}
                            </Grid>
                        </ListItem>
                        <Divider sx={{my: gapHeight}}/>
                        <ListItem>
                            <Grid container>
                                {getListItemContent("余额", userInfo.balance)}
                                <Grid xs={2}>
                                    <Link
                                        href={{
                                            pathname: "/account-center/top-up",
                                        }}
                                    >
                                        <Typography sx={{textDecoration: 'underline'}}>充值</Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider sx={{my: gapHeight}}/>
                        <ListItem>
                            <Grid container>
                                {getListItemContent("电话", userInfo.telephone)}
                            </Grid>
                        </ListItem>
                        <Divider sx={{my: gapHeight}}/>
                        <ListItem>
                            <Grid container>
                                {getListItemContent("积分", userInfo.points)}
                            </Grid>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>ATET</Grid>
            </Grid>
        </>
    )
}