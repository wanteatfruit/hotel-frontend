import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import {useRouter} from "next/router";
import {Alert} from "@mui/lab";
import {useState} from "react";

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

export default function SignUp() {
    const [alertShown, setAlertShown] = useState(false)

    const router = useRouter();
    const query = router.query;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userInfo = {
            "name": data.get("username"),
            "loginpassword": data.get("password"),
            "telephone": data.get("telephone"),
        }
        const options = {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json"
            }
        };
        let response = ''
        await fetch("http://120.25.216.186:8888/customer/createcustomer", options)
            .then((response) => response.text()).then(data => response = data)
        if (response === "true") {
            await router.push({
                pathname: query['href'],
                query: {href: query['original_href']}
            })
        } else {
            setAlertShown(true)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/images/sign-up.jpg)',
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
                            注册新账号
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="姓名"
                                        name="username"
                                        required
                                        fullWidth
                                        id="username"
                                        label="用户名"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="telephone"
                                        label="电话"
                                        name="telephone"
                                        autoComplete="电话"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="密码"
                                        type="password"
                                        id="password"
                                        autoComplete="密码"
                                    />
                                </Grid>
                            </Grid>
                            {alertShown && <Grid sx={{marginTop: "1em"}}>
                                <Alert variant="outlined" severity="error">
                                    注册新账户失败，用户名和电话已被使用
                                </Alert>
                            </Grid>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                注册
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href={{
                                        pathname: query['href'],
                                        query: {href: query['original_href']}
                                    }} variant="body2">
                                        已有账号
                                    </Link>
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