import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Layout from "../../components/Layout";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import {useRouter} from "next/router";
import axios from "axios";
import {createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider} from "@mui/material";
import Link from "next/link";


const tiers = [
    {
        title: '优惠活动1',
        price: '1000',
        amount: '1000',
        description: [
            "额外赠送100元，马上充值到钱包"
        ],
        buttonText: '购买',
        buttonVariant: 'contained',
    },
    {
        title: '优惠活动2',
        subheader: '最受欢迎的充值方案',
        price: '7000',
        amount: 7000,
        description: [
            '额外赠送900元',
            '赠送2000点积分，可用于换购礼品',
        ],
        buttonText: '购买',
        buttonVariant: 'contained',
    },
    {
        title: '优惠活动3',
        price: '20000',
        amount: 20000,
        description: [
            '额外赠送2500元',
            '赠送7000点积分，可用于换购礼品',
        ],
        buttonText: '购买',
        buttonVariant: 'contained',
    },
];

export default function TopUp() {
    const router = useRouter();
    const userID = router.query['userID'];
    const [validInput, setValidInput] = useState(true);
    const [response, setResponse] = useState("")
    const [responseDialogOpen, setResponseDialogOpen] = useState(false)
    const validInputRegex = new RegExp(
        "^\\d+$"
    );

    async function specialOfferOnClick(amount) {
        let credits = 0
        switch (amount) {
            case 1000:
                credits = 100
                break;
            case 7000:
                credits = 2000
                break;
            case 20000:
                credits = 7000
                break
        }
        let body = {
            "id": userID,
            "money": amount.toString()
        }
        let res = false
        await axios.post('http://120.25.216.186:8888/customer/money', body, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(response => res = response.data);
        if (res) {
            body = {
                "id": userID,
                "credits": credits.toString()
            }
            await axios.post('http://120.25.216.186:8888/customer/credits', body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => res = response.data);
        }
        if (res) {
            setResponse("您已成功充值！充值金额，赠送金额与积分均已到账")
        } else {
            setResponse("充值失败！请重试")
        }
        setResponseDialogOpen(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const amount = data.get('amount').toString();
        if (validInputRegex.test(amount)) {
            setValidInput(true);
            const body = {
                "id": userID,
                "money": amount
            }
            let res = false
            await axios.post('http://120.25.216.186:8888/customer/money', body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => res = response.data);
            if (res) {
                setResponse("您已成功充值！充值金额已到账")
            } else {
                setResponse("充值失败！请重试")
            }
            setResponseDialogOpen(true)
        } else {
            setValidInput(false);
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
                        充值结果
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

    function getTextField() {
        if (validInput) {
            return (
                <>
                    <TextField id="amount" required name="amount" variant="outlined"/>
                </>
            )
        } else {
            return (
                <>
                    <TextField
                        error
                        required
                        id="amount"
                        name="amount"
                        label="Error"
                        helperText="请输入数字"
                        variant="filled"
                    />
                </>
            )
        }
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
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            {/* Hero unit */}
            {ResponseDialog()}
            <Grid sx={{marginLeft: "4em", marginTop: "1em"}}>
                <Link
                    href={{
                        pathname: "/account-center/account-center",
                        query: {
                            "userID": userID,
                        }
                    }}>
                    <Button variant={"outlined"}>返回</Button>
                </Link>
            </Grid>
            <Container disableGutters maxWidth="sm" component="main" sx={{pt: 8, pb: 6}}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    充值活动
                </Typography>
            </Container>
            {/* End hero unit */
            }
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{align: 'center'}}
                                    action={tier.title === 'Pro' ? <StarIcon/> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            ￥{tier.price}
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant}
                                            onClick={() => specialOfferOnClick(tier.amount)}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container maxWidth="md" component="main" sx={{pt: 20, pb: 6}}>
                <Grid component="form" onSubmit={handleSubmit} justifyContent="flex-end">
                    <Grid xs={2} sm={2} md={4}>
                        <Typography sx={{fontWeight: 'bold', fontSize: 30}}>普通充值</Typography>
                    </Grid>
                    <br/>
                    <Grid xs={5} sm={5} md={4}>
                        {getTextField()}
                    </Grid>
                    <br/>
                    <Grid xs={2} sm={2} md={2}>
                        <Button type="submit" variant="contained"><Typography>确认</Typography></Button>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
        ;
}