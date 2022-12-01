import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Layout from "../../components/Layout";
import {createTheme} from '@mui/material';
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    ThemeProvider,
    useTheme
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import {giftImageUrl, roomImageUrl} from "../../data";

export default function Store() {
    const [giftList, setGiftList] = useState([])
    const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
    const [giftOnDialog, setGiftOnDialog] = useState("")
    const [userCredits, setUserCredits] = useState(0)
    const [response, setResponse] = useState("")
    const [responseDialogOpen, setResponseDialogOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [telephone, setTelephone] = useState("")
    const [address, setAddress] = useState("")
    const [userID, setUserID] = useState(0)
    const [nameValid, setNameValid] = useState(true)
    const [addressValid, setAddressValid] = useState(true)
    const [phoneValid, setPhoneValid] = useState(true)
    const validNameRegex = new RegExp(
        "^[\u4e00-\u9fa5]+$"
    );
    const validPhoneRegex = new RegExp(
        "^[0-9]{11}$"
    );

    async function GetData() {
        await axios.get("http://120.25.216.186:8888/gift/findAll").then((response) => {
            setGiftList(response.data)
        });
        await axios.get("http://120.25.216.186:8888/customer/getbyid", {params: {"id": userID}}).then((response) => {
            setUserCredits(response.data.credits);
        });
    }

    useEffect(() => {
        setUserID(localStorage.getItem("userID"))
        GetData()
    });

    const purchaseOnClick = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userName = data.get("username")
        const address = data.get("address");
        const telephone = data.get('telephone');
        const amount = 1;

        const validName = validNameRegex.test(userName)
        setNameValid(validName)
        const validAddress = true
        const validTelephone = validPhoneRegex.test(telephone)
        setPhoneValid(validTelephone)
        if (validName && validAddress && validTelephone) {
            const body = {
                "userID": userID,
                "telephone": telephone,
                "amount": amount.toString(),
                "address": address,
                "giftName": giftOnDialog.giftname,
                "userName": userName
            }
            console.log("body: ", body)
            let paySucceed = ""
            await axios.post('http://120.25.216.186:8888/giftorder/creategiftorder', body)
                .then(response => paySucceed = response.data);
            console.log("response, ", paySucceed)
            if (paySucceed.toString() === "true") {
                setResponse("您已成功兑换！敬请期待礼品抵达")
            } else {
                setResponse("您的积分不足够兑换，请尝试兑换其他物品")
            }
            setPurchaseDialogOpen(false)
            setResponseDialogOpen(true)
        }
    }

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
                        兑换结果
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {response}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setResponseDialogOpen(false)} autoFocus>
                            好的
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    function PurchaseDialog() {
        const image_url = "url(" + giftImageUrl[giftOnDialog.giftid % (giftImageUrl.length + 1)] + ")"

        function getNameTextField() {
            if (nameValid) {
                return (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="姓名"
                            name="username"
                            autoFocus
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                    </>
                )
            } else {
                return (
                    <>
                        <TextField
                            error
                            required
                            id="username"
                            name="username"
                            label="格式错误"
                            helperText="请输入中文名"
                            variant="filled"
                            autoFocus
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setNameValid(true)
                            }}
                        />
                    </>
                )
            }
        }

        function getPhoneTextField() {
            if (phoneValid) {
                return (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="telephone"
                            label="电话"
                            id="telephone"
                            value={telephone}
                            onChange={(event) => {
                                setTelephone(event.target.value);
                            }}
                        />
                    </>
                )
            } else {
                return (
                    <>
                        <TextField
                            error
                            required
                            id="telephone"
                            name="telephone"
                            label="格式错误"
                            helperText="请输入11位中国电话号码"
                            variant="filled"
                            autoFocus
                            value={telephone}
                            onChange={(event) => {
                                setTelephone(event.target.value);
                                setPhoneValid(true)
                            }}
                        />
                    </>
                )
            }
        }

        return (
            <>
                <Dialog open={purchaseDialogOpen} onClose={() => setPurchaseDialogOpen(false)}
                        PaperProps={{
                            sx: {
                                position: "fixed",
                                width: "100%",
                                maxWidth: "sm",
                                maxHeight: "sm"
                            }
                        }}>
                    <DialogContent>
                        <Grid container component="main" sx={{width: '100%'}}>
                            <CssBaseline/>
                            <Paper width={"100%"} elevation={6} sx={{backgroundImage: image_url}} square>
                                <Box container width={"100%"} justifyContent={"center"} my={8}>
                                    <Box sx={{display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
                                        <Typography>您拥有{userCredits}积分</Typography>
                                    </Box>
                                    <Box sx={{display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
                                        <Typography>兑换 {giftOnDialog.giftname} 将消耗{giftOnDialog.credits}积分</Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box component="form" noValidate onSubmit={purchaseOnClick} sx={{mt: 3}}>
                                        {getNameTextField()}
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="address"
                                            label="地址"
                                            id="address"
                                            value={address}
                                            onChange={(event) => {
                                                setAddress(event.target.value);
                                            }}
                                        />
                                        {getPhoneTextField()}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            兑换
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    const theme = createTheme({
        typography: {
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 15
        },
        palette: {
            secondary: {
                main: '#fff'
            }
        }
    })


    return (
        <ThemeProvider theme={theme}>
            {ResponseDialog()}
            {PurchaseDialog()}
            <Grid sx={{marginLeft: "4em", marginTop: "1em"}}>
                <Link
                    href={{
                        pathname: "/account-center/account-center"
                    }}>
                    <Button variant={"outlined"}>返回</Button>
                </Link>
            </Grid>
            <Box
                sx={{
                    bgcolor: ' background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        商城
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        您可以用积分换购商品
                    </Typography>
                </Container>
            </Box>
            <Container sx={{py: 2}} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {giftList.map((gift) => (
                        <Grid item key={gift[0]} xs={12} sm={6} md={4}>
                            <Card
                                sx={{height: "100%", display: ' flex', flexDirection: ' column'}}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        height: "250px"
                                    }}
                                    image={giftImageUrl[gift.giftid % (giftImageUrl.length + 1)]}
                                    alt="gift image"
                                />
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {gift.giftname}
                                    </Typography>
                                    <Typography>
                                        {gift.description}
                                    </Typography>
                                    <Typography>
                                        {gift.credits}积分
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {
                                        setPurchaseDialogOpen(true);
                                        setGiftOnDialog(gift)
                                    }}>购买</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}