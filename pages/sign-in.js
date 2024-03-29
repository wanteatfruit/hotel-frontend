import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/wanteatfruit/hotel-frontend">
                SUSTech-Hotel
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const router = useRouter();
    const href = router.query['href'];
    const [adminLogin, setAdminLogin] = useState(false)
    const [responseDialogOpen, setResponseDialogOpen] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userInfo = {
            "name": data.get("username"),
            "loginpassword": data.get("password"),
        }
        const options = {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json"
            }
        }
        let answer = {}
        if (adminLogin) {
            await fetch("http://10.26.111.227:8888/login/manager", options)
                .then((response) => response.json()).then(data => answer = data)
            console.log("answer: ", answer)
            if (answer.id === 0) {
                setResponseDialogOpen(true)
            } else {
                localStorage.setItem("username", data.get("username").toString())
                // localStorage.setItem("userID", answer.id)
                localStorage.setItem("sessionKey", answer.token)
                localStorage.setItem("isLoggedIn", "false")
                localStorage.setItem("adminLoggedIn", "true")
                localStorage.setItem("adminID", answer.id)
                console.log(localStorage.getItem("adminID"))
                if (href !== undefined) {
                    router.push({
                        pathname: href
                    }, href)
                } else {
                    router.push({
                        pathname: "/"
                    }, href)
                }
            }
        } else {
            await fetch("http://10.26.111.227:8888/login", options)
                .then((response) => response.json()).then(data => answer = data)
            if (answer.id === 0) {
                setResponseDialogOpen(true)
            } else {
                localStorage.setItem("username", data.get("username").toString())
                localStorage.setItem("userID", answer.id)
                localStorage.setItem("sessionKey", answer.token)
                localStorage.setItem("isLoggedIn", "true")
                localStorage.setItem("adminLoggedIn", "false")
                console.log("length: ", href !== undefined && href.length > 0)
                if (href !== undefined && href.length > 0) {
                    router.push({
                        pathname: href
                    }, href)
                } else {
                    router.push({
                        pathname: "/"
                    }, href)
                }
            }
        }
    };

    function ResponseDialog() {
        return (
            <>
                <Dialog
                    open={responseDialogOpen}
                    onClose={() => setResponseDialogOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        登陆失败
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            用户名与密码错误，请重试
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setResponseDialogOpen(false)} autoFocus>
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                {ResponseDialog()}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/images/sign-in.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            登录
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="用户名"
                                name="username"
                                autoComplete="用户名"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="密码"
                                type="password"
                                id="password"
                                autoComplete="密码"
                            />
                            <Grid sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>
                                <Typography>管理员</Typography>
                                <Checkbox id="admin" checked={adminLogin} onChange={(event) => {
                                    setAdminLogin(event.target.checked)
                                }}/>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                登录
                            </Button>
                            <Grid container sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start"
                            }}>
                                <Grid sx={{width: "91%", justifyContent: "flex-start"}}>
                                    <Link variant="body2" href={{
                                        pathname: "/sign-up",
                                        query: {href: '/sign-in', original_href: href}
                                    }}>{"注册新账号"}</Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}