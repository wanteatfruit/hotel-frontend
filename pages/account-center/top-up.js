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


const tiers = [
    {
        title: '',
        price: '1000',
        description: [
            'Extra 100$ as gift',
            'One-on-one support',
        ],
        buttonText: 'Choose',
        buttonVariant: 'outlined',
    },
    {
        title: 'Platinum',
        price: '20000',
        description: [
            'Extra 3000$ as gift',
            '40000 rewards points in total',
            'Enjoy free room for a whole week',
            'Priority one-on-one support',
        ],
        buttonText: 'Choose',
        buttonVariant: 'contained',
    },
    {
        title: 'Golden',
        subheader: 'Most popular',
        price: '7000',
        description: [
            'Extra 900$ as gift',
            '10000 rewards points in total',
            'Enjoy free room for 3 nights',
            'Priority one-on-one support',
        ],
        buttonText: 'Choose',
        buttonVariant: 'contained',
    },
];

export default function TopUp() {
    const router = useRouter();
    const query = router.query;
    const setTopUpAmount = query.setTopUpAmount;
    const [validInput, setValidInput] = useState(true);
    const validInputRegex = new RegExp(
        "^\\d+$"
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const amount = data.get('amount');
        console.log(amount);
        if (validInputRegex.test(amount)) {
            setValidInput(true);
            router.push({
                pathname: "/account-center/confirm-sign-in",
                query: {
                    setTopUpAmount: {setTopUpAmount},
                    amount: amount
                }
            })
        } else {
            setValidInput(false);
        }
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

    return (
        <React.Fragment>
            <Layout>
                <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
                <CssBaseline/>
                {/* Hero unit */}
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
                {/* End hero unit */}
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
                                                ${tier.price}
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
                                        <Button fullWidth variant={tier.buttonVariant}>
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
            </Layout>
        </React.Fragment>
    );
}