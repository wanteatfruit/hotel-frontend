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
import {useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Link from "next/link";


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getgiftInfo() {
    let gift_list = [];
    let gift_a = ['大床房一晚', '免费住一晚！', '2000'];
    let gift_b = ['喜来登大白兔', '我们的酒店公仔！', '500'];
    gift_list.push(gift_a);
    gift_list.push(gift_b);
    return gift_list;
}


export default function Store({userID}) {
    const [giftList, setGiftList] = useState([])
    const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
    const [giftOnDialog, setGiftOnDialog] = useState("")
    const [userCredits, setUserCredits] = useState(0)
    const [response, setResponse] = useState("")
    const [responseDialogOpen, setResponseDialogOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [telephone, setTelephone] = useState("")
    const [address, setAddress] = useState("")


    useEffect(() => {
        axios.get("http://120.25.216.186:8888/gift/findAll").then((response) => {
            setGiftList(response.data)
        });
        // axios.get("http://120.25.216.186:8888/customer/getbyid", {params: {"id": userID}}).then((response) => {
        //     setUserCredits(response.data.credits);
        // });
        setUserCredits(1000);
    }, []);

    const purchaseOnClick = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userName = data.get("username")
        const address = data.get("address");
        const telephone = data.get('telephone');
        // const amount = data.get("amount")
        const amount = 1;
        const body = {
            "id": userID,
            "credits": amount * giftOnDialog
        }
        let paySucceed = false
        // axios.post('http://120.25.216.186:8888/customer/credits', body)
        //     .then(response => paySucceed = response);
        if (paySucceed) {
            setResponse("您已成功兑换！敬请期待礼品抵达")
        } else {
            setResponse("您的积分不足够兑换，请尝试兑换其他物品")
        }
        setResponseDialogOpen(true)
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

    function purchaseDialog() {
        return (
            <>
                <Dialog open={purchaseDialogOpen} onClose={() => setPurchaseDialogOpen(false)}
                        PaperProps={{
                            sx: {
                                position: "fixed",
                                width: "100%",
                                height: "100%",
                                maxWidth: "sm",
                                maxHeight: "sm"
                            }
                        }}>
                    <DialogContent>
                        <Grid container component="main" sx={{height: '100%', width: '100%'}}>
                            <CssBaseline/>
                            <Grid
                                item
                                width={"100%"}
                                height={"100%"}
                                // marginBottom={"10px"}
                                sx={{
                                    backgroundImage: 'url(/images/sign-in.jpg)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <Grid width={"100%"} component={Paper} elevation={6} square>
                                <Box container width={"100%"} justifyContent={"center"} my={8}>
                                    <Box sx={{display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
                                        <typography>您拥有{userCredits}积分</typography>
                                    </Box>
                                    <Box sx={{display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
                                        <typography>本次兑换消耗{giftOnDialog.credits}积分</typography>
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
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant=" contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            兑换
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    return (
        <main>
            {ResponseDialog()}
            {purchaseDialog()}
            <Grid sx={{marginLeft: "4em", marginTop: "1em"}}>
                <Link href={"/account-center/account-center"}>
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
                                    image="https://source.unsplash.com/random"
                                    alt="random"
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
        </main>
    );
}